from django.urls import path
from . import views

urlpatterns = [
    path("products/add/", views.CartAddView.as_view(), name="CartAddView"),
    path("products/get/", views.CartGetView.as_view(), name="CartGetView"),
    path("products/delete/<int:product_id>", views.CartDeleteItemView.as_view(), name="CartDeleteItemView"),
]
