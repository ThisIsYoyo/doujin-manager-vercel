from django.urls import path, re_path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    # list
    re_path(r"^circle/list/", view=views.CircleListView.as_view(), name="circle list"),
    re_path(r"^author/list/", view=views.AuthorListView.as_view(), name="author list"),
    re_path(r"^doujinshi/list/", view=views.DoujinshiListView.as_view(), name="doujinshi list"),
    # get/modify single data
    re_path(r"^api/circle/(?P<id>\d+)/", view=views.CircleGETView.as_view(), name="circle get by id"),
    re_path(r"^api/author/(?P<id>\d+)/", view=views.AuthorGETView.as_view(), name="author get by id"),
    re_path(r"^api/doujinshi/(?P<id>\d+)/", view=views.DoujinshiGETView.as_view(), name="doujinshi get by id"),
    # create data
    re_path(r"^api/circle/", view=views.CircleCreateView.as_view(), name="circle create"),
    re_path(r"^api/author/", view=views.AuthorCreateView.as_view(), name="author create"),
    re_path(r"^api/doujinshi/", view=views.DoujinshiCreateView.as_view(), name="doujinshi create"),
]
