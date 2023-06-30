from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('google_login/', include('google_login.urls')),
    path('user_login/', include('user_login.urls')),
    path('user_profile/', include('user_profile.urls')),
]
