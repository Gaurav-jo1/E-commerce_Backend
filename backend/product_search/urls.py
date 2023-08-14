from django.urls import path
from . import views

urlpatterns = [
    path("search/", views.ProductSearch.as_view(), name="ProductSearch"),
]
