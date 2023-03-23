from rest_framework import serializers

from doujinshi.models import Author, Circle, Doujinshi


class CircleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Circle
        fields = ["name"]


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ["name"]


class DoujinshiSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.name")
    circle = serializers.CharField(source="circle.name")

    class Meta:
        model = Doujinshi
        fields = [
            "name",
            "author",
            "circle",
            "origin_language",
            "present_language",
            "buy_way",
            "buy_time",
            "price",
            "price_currency",
            "record_time",
        ]
