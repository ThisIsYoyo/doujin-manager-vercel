from typing import Union
from django.db import models
from .choices import *


class IdMixin:
    @classmethod
    def get_by_id(cls, id: int) -> Union[models.QuerySet, None]:
        if cls.objects.filter(id=id).exists():
            return cls.objects.get(id=id)
        return None
    
    @classmethod
    def filter_by_id_list(cls, id_list: list[int]) -> models.QuerySet:
        return cls.objects.filter(id__in=id_list)


class Circle(models.Model, IdMixin):
    name = models.CharField(max_length=128)


class Author(models.Model, IdMixin):
    name = models.CharField(max_length=128)


class Doujinshi(models.Model, IdMixin):
    name = models.CharField(max_length=256)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    circle = models.ForeignKey(Circle, on_delete=models.CASCADE)
    origin_language = models.CharField(
        null=True, max_length=DOUJIN_LANGUAGE_MAX_LEN, default=DOUJIN_LANGUAGE_DEFAULT, choices=DOUJIN_LANGUAGE_CHOICES
    )
    present_language = models.CharField(
        null=True, max_length=DOUJIN_LANGUAGE_MAX_LEN, default=DOUJIN_LANGUAGE_DEFAULT, choices=DOUJIN_LANGUAGE_CHOICES
    )

    # accounting related
    buy_way = models.CharField(null=True, max_length=64)
    buy_time = models.DateField(null=True)
    price = models.PositiveIntegerField(null=True)
    price_currency = models.CharField(
        null=True, max_length=CURRENCY_MAX_LEN, default=CURRENCY_DEFAULT, choices=CURRENCY_CHOICES
    )

    # system auto
    record_time = models.DateTimeField(auto_now=True)


# util for model
FOREIGN_PK_FIELD_SUFFIX = "_id"


def get_foreign_pk_field_list(model: models.Model) -> list:
    foreign_list = []
    for f in model._meta.fields:
        if f.__class__ == models.ForeignKey:
            foreign_list.append(f.name + FOREIGN_PK_FIELD_SUFFIX)

    return foreign_list
