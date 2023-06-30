from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("api/token/", views.UserLoginView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("reset_password/", views.ResetPassword.as_view(), name="reset_password"),
    path("reset_code/", views.ResetcodeCheck.as_view(), name="reset_code"),
    path("change_password/", views.UserNewPassword.as_view(), name="reset_code"),
]
