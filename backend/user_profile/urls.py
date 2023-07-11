from django.urls import path
from . import views

urlpatterns = [
    path("info/", views.UserProfileView.as_view(), name="user_information"),
]
