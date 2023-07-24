from django.urls import path
from . import views

urlpatterns = [
    path("products/", views.CartAddView.as_view(), name="CartAddView"),
]
