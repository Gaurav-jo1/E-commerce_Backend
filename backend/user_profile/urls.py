from django.urls import path
from . import views

urlpatterns = [
    path("info/", views.UserInfoView.as_view(), name="user_information"),
    path("picture/", views.UserProfileView.as_view(), name="user_profile"),
]
