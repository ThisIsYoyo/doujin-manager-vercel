from django.db import models
from .choices import *


class Circle(models.Model):
    name = models.CharField(max_length=128)


class Author(models.Model):
    name = models.CharField(max_length=128)


class Doujinshi(models.Model):
    name = models.CharField(max_length=256)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    circle = models.ForeignKey(Circle, on_delete=models.CASCADE)
    origin_language = models.CharField(
        max_length=DOUJIN_LANGUAGE_MAX_LEN, default=DOUJIN_LANGUAGE_DEFAULT, choices=DOUJIN_LANGUAGE_CHOICES
    )
    present_language = models.CharField(
        max_length=DOUJIN_LANGUAGE_MAX_LEN, default=DOUJIN_LANGUAGE_DEFAULT, choices=DOUJIN_LANGUAGE_CHOICES
    )

    # accounting related
    buy_way = models.CharField(max_length=64)
    buy_time = models.DateField(null=True)
    price = models.PositiveIntegerField(null=True)
    price_currency = models.CharField(
        max_length=CURRENCY_MAX_LEN, null=True, default=CURRENCY_DEFAULT, choices=CURRENCY_CHOICES
    )

    # system auto
    record_time = models.DateTimeField(auto_now=True)
