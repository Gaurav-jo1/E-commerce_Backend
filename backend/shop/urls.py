from django.urls import path
from . import views

urlpatterns = [
    path("<str:category>/", views.ShopCategoryView.as_view(), name="ShopCategoryView"),
]
