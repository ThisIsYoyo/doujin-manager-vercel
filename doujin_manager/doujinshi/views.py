from typing import Union
from django.core.exceptions import ImproperlyConfigured
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
    queryset = None
    sz_class = serializers.ModelSerializer

    def get(self, request: Request, **kwargs):
        id = kwargs.get("id", 0)
        queryset = self.get_queryset()

        if not queryset.filter(id=id).exists():
            return Response(f"{queryset.model.__name__} with id:`{id}` not exist", status=status.HTTP_404_NOT_FOUND)

        model_id = self.queryset.get(id=id)
        sz = self.sz_class(model_id)
        return Response(sz.data, status=status.HTTP_200_OK)

    def patch(self, request: Request, **kwargs):
        id = kwargs.get("id", 0)
        queryset = self.get_queryset()

        if not queryset.filter(id=id).exists():
            return Response(f"{queryset.model.__name__} with id:`{id}` not exist", status=status.HTTP_404_NOT_FOUND)

        model_instance = queryset.get(id=id)
        update_sz = self.sz_class(model_instance, data=request.data, partial=True)
        if update_sz.is_valid():
            update_sz.save()
            return Response(update_sz.data, status=status.HTTP_200_OK)

        return Response(update_sz.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self) -> QuerySet:
        queryset = None
        if self.queryset is not None:
            queryset = (isinstance(self.queryset, models.Manager) and self.queryset.all()) or self.queryset
        else:
            cls_name = self.__class__.__name__
            raise ImproperlyConfigured(f"{cls_name} not set queryset attribute properly")

        return queryset


class CreateDestoryAPIView(APIView):
    sz_class = serializers.ModelSerializer
    queryset = None

    def post(self, request: Request):
        save_data = request.data

        sz = self.sz_class(data=save_data)
        if sz.is_valid():
            sz.save()
            return Response({"save data": sz.data, "save status": "success"}, status=status.HTTP_201_CREATED)
        return Response(sz.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request):
        id_list = request.query_params.getlist("ids", [])
        id_list = [int(id) for id in id_list]

        queryset = self.get_queryset()
        need_del_queryset = queryset.filter(id__in=id_list)
        deleted_id_list = list(need_del_queryset.values_list("id", flat=True))

        del_count, _ = need_del_queryset.delete()
        assert del_count == len(deleted_id_list)

        if del_count:
            return Response({"message": "success", "deleted_id_list": deleted_id_list}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "nothing to delete"}, status=status.HTTP_202_ACCEPTED)

    def get_queryset(self) -> QuerySet:
        queryset = None
        if self.queryset is not None:
            queryset = (isinstance(self.queryset, models.Manager) and self.queryset.all()) or self.queryset
        else:
            cls_name = self.__class__.__name__
            raise ImproperlyConfigured(f"{cls_name} not set queryset attribute properly")

        return queryset


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


class CircleCreateDestoryView(CreateDestoryAPIView):
    queryset = Circle.objects.all()
    sz_class = CircleSerializer


class CircleListView(FilterListAPIView):
    queryset = Circle.objects.all()
    serializer_class = CircleSerializer


# -------------- Author --------------
class AuthorGETView(IDFilterAPIView):
    queryset = Author.objects.all()
    sz_class = AuthorSerializer


class AuthorCreateDestoryView(CreateDestoryAPIView):
    queryset = Author.objects.all()
    sz_class = AuthorSerializer


class AuthorListView(FilterListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


# -------------- Doujinshi --------------
class DoujinshiGETView(IDFilterAPIView):
    queryset = Doujinshi.objects.all()
    sz_class = DoujinshiSerializer


class DoujinshiCreateDestoryView(CreateDestoryAPIView):
    queryset = Doujinshi.objects.all()
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
