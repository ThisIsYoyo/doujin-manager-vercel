from typing import Union
from django.db import transaction, models
from django.http import HttpResponse
from django.db.models import QuerySet
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView, status

from doujinshi.choices import CURRENCY_CHOICES, DOUJIN_LANGUAGE_CHOICES
from doujinshi.models import FOREIGN_PK_FIELD_SUFFIX, Author, Circle, Doujinshi, get_foreign_pk_field_list
from doujinshi.serializers import AuthorSerializer, CircleSerializer, DoujinshiSerializer


def index(request):
    return HttpResponse("This is doujinshi index")


class IDFilterAPIView(APIView):
    queryset = QuerySet()
    sz_class = serializers.ModelSerializer

    def get(self, request: Request, **kwargs):
        id = kwargs.get("id", 0)

        if not self.queryset.filter(id=id).exists():
            return Response(
                f"{self.queryset.model.__name__} with id:`{id}` not exist", status=status.HTTP_404_NOT_FOUND
            )

        model_id = self.queryset.get(id=id)
        sz = self.sz_class(model_id)
        return Response(sz.data, status=status.HTTP_200_OK)

    def patch(self, request: Request, **kwargs):
        id = kwargs.get("id", 0)

        if not self.queryset.filter(id=id).exists():
            return Response(
                f"{self.queryset.model.__name__} with id:`{id}` not exist", status=status.HTTP_404_NOT_FOUND
            )

        save_response = self._save(request=request, id=id)
        if isinstance(save_response, Response):
            return save_response

        if isinstance(save_response, models.Model):
            return Response(self.sz_class(save_response).data, status=status.HTTP_200_OK)

    @transaction.atomic
    def _save(self, request: Request, id: int) -> Union[models.Model, Response]:
        model_id = self.queryset.get(id=id)
        model_cls = model_id.__class__
        model_field_name_list = [f.name for f in model_cls._meta.fields]
        model_foreign_field_pk_field_list = get_foreign_pk_field_list(model_cls)
        modified_data = request.data

        for modified_f, v in modified_data.items():
            if modified_f in model_foreign_field_pk_field_list:
                modified_foreign_f = modified_f.replace(FOREIGN_PK_FIELD_SUFFIX, "")
                print("modified_foreign_f", modified_foreign_f)
                foreign_model = getattr(model_id, modified_foreign_f).__class__
                print("foreign_model", foreign_model)
                if not foreign_model.objects.filter(id=v).exists():
                    return Response(
                        f"There no {modified_f} which id == `{v}` ",
                        status=status.HTTP_403_FORBIDDEN,
                    )

                foreign_model_instance = foreign_model.objects.get(id=v)
                setattr(model_id, modified_foreign_f, foreign_model_instance)
                continue

            if modified_f not in model_field_name_list:
                return Response(
                    f"{model_cls.__name__} not contain `{modified_f}` field",
                    status=status.HTTP_403_FORBIDDEN,
                )

            setattr(model_id, modified_f, v)
        model_id.save()
        return model_id


class CreateAPIView(APIView):
    sz_class = serializers.ModelSerializer

    def post(self, request: Request):
        save_data = request.data

        sz = self.sz_class(data=save_data)
        if sz.is_valid():
            sz.save()
            return Response({"save data": sz.data, "save status": "success"}, status=status.HTTP_201_CREATED)
        return Response(sz.errors, status=status.HTTP_400_BAD_REQUEST)


class ListPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 50


class FilterListAPIView(ListAPIView):
    paginator_class = ListPagination
    queryset = QuerySet()
    serializer_class = serializers.ModelSerializer


# -------------- Circle --------------
class CircleGETView(IDFilterAPIView):
    queryset = Circle.objects.all()
    sz_class = CircleSerializer


class CircleCreateView(CreateAPIView):
    sz_class = CircleSerializer


class CircleListView(FilterListAPIView):
    queryset = Circle.objects.all()
    serializer_class = CircleSerializer


# -------------- Author --------------
class AuthorGETView(IDFilterAPIView):
    queryset = Author.objects.all()
    sz_class = AuthorSerializer


class AuthorCreateView(CreateAPIView):
    sz_class = AuthorSerializer


class AuthorListView(FilterListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


# -------------- Doujinshi --------------
class DoujinshiGETView(IDFilterAPIView):
    queryset = Doujinshi.objects.all()
    sz_class = DoujinshiSerializer


class DoujinshiCreateView(CreateAPIView):
    sz_class = DoujinshiSerializer


class DoujinshiListView(FilterListAPIView):
    queryset = Doujinshi.objects.all()
    serializer_class = DoujinshiSerializer


# -------------- Choices --------------
def choices_to_list(choices: tuple) -> list[dict]:
    return [{"name": name, "value": value} for value, name in choices]


@api_view(["GET"])
def choice_view(request: Request):
    return Response(
        {
            "DOUJIN_LANGUAGE_CHOICES": choices_to_list(DOUJIN_LANGUAGE_CHOICES),
            "CURRENCY_CHOICES": choices_to_list(CURRENCY_CHOICES),
        },
        status=status.HTTP_200_OK,
    )
