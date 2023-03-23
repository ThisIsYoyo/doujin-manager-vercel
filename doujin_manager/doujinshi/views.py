from django.http import HttpResponse
from django.shortcuts import render
from django.db.models import QuerySet
from rest_framework.views import APIView, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import serializers

from doujinshi.models import Author, Circle, Doujinshi
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

        model_queryset = self.queryset.get(id=id)
        sz = self.sz_class(model_queryset)
        return Response(sz.data, status=status.HTTP_200_OK)


class CreateAPIView(APIView):
    sz_class = serializers.ModelSerializer

    def post(self, request: Request):
        save_data = request.data.get("data", {})

        sz = self.sz_class(data=save_data)
        if sz.is_valid():
            sz.save()
            return Response({"save data": sz.data, "save status": "success"}, status=status.HTTP_201_CREATED)
        return Response(sz.errors, status=status.HTTP_400_BAD_REQUEST)


class CircleGETView(IDFilterAPIView):
    queryset = Circle.objects.all()
    sz_class = CircleSerializer


class CircleCreateView(CreateAPIView):
    sz_class = CircleSerializer


class AuthorGETView(IDFilterAPIView):
    queryset = Author.objects.all()
    sz_class = AuthorSerializer


class AuthorCreateView(CreateAPIView):
    sz_class = AuthorSerializer


class DoujinshiGETView(IDFilterAPIView):
    queryset = Doujinshi.objects.all()
    sz_class = DoujinshiSerializer


class DoujinshiCreateView(CreateAPIView):
    sz_class = DoujinshiSerializer
