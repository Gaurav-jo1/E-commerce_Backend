from django.urls import path
from . import views

urlpatterns = [
    path("add/", views.CartAddView.as_view(), name="CartAddView"),
    path("get/", views.CartGetView.as_view(), name="CartGetView"),
]
