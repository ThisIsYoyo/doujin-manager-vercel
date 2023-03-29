from rest_framework import serializers

from doujinshi.models import Author, Circle, Doujinshi


class CircleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Circle
        fields = ["id", "name"]


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ["id", "name"]


class DoujinshiSerializer(serializers.ModelSerializer):
    circle_id = serializers.PrimaryKeyRelatedField(source="circle", queryset=Circle.objects.all())
    author_id = serializers.PrimaryKeyRelatedField(source="author", queryset=Author.objects.all())

    circle = CircleSerializer(read_only=True)
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Doujinshi
        fields = [
            "id",
            "name",
            "author_id",
            "circle_id",
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
