from django.urls import path, re_path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    re_path(r"^circle/(?P<id>\d+)/", view=views.CircleGETView.as_view(), name="circle get by id"),
    re_path(r"^circle/", view=views.CircleCreateView.as_view(), name="circle create"),
    re_path(r"^author/(?P<id>\d+)/", view=views.AuthorGETView.as_view(), name="author get by id"),
    re_path(r"^author/", view=views.AuthorCreateView.as_view(), name="author create"),
    re_path(r"^doujinshi/(?P<id>\d+)/", view=views.DoujinshiGETView.as_view(), name="doujinshi get by id"),
    re_path(r"^doujinshi/", view=views.DoujinshiCreateView.as_view(), name="doujinshi create"),
]
