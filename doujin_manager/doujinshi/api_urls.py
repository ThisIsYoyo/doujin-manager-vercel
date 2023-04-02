from django.urls import path, re_path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    # list
    re_path(r"^circle/list/", view=views.CircleListView.as_view(), name="circle list"),
    re_path(r"^author/list/", view=views.AuthorListView.as_view(), name="author list"),
    re_path(r"^doujinshi/list/", view=views.DoujinshiListView.as_view(), name="doujinshi list"),
    # get/modify single data
    re_path(r"^circle/(?P<id>\d+)/", view=views.CircleGETView.as_view(), name="circle get by id"),
    re_path(r"^author/(?P<id>\d+)/", view=views.AuthorGETView.as_view(), name="author get by id"),
    re_path(r"^doujinshi/(?P<id>\d+)/", view=views.DoujinshiGETView.as_view(), name="doujinshi get by id"),
    # create data
    re_path(r"^circle/", view=views.CircleCreateDestoryView.as_view(), name="circle create/delete"),
    re_path(r"^author/", view=views.AuthorCreateDestoryView.as_view(), name="author create/delete"),
    re_path(r"^doujinshi/", view=views.DoujinshiCreateDestoryView.as_view(), name="doujinshi create/delete"),
    # choices
    re_path(r"choices/", view=views.choice_view, name="all choices"),
]
