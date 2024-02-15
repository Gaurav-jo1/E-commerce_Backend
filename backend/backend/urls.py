from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('google_login/', include('google_login.urls')),
    path('user_login/', include('user_login.urls')),
    path('user_profile/', include('user_profile.urls')),
    path('product_search/', include('product_search.urls')),
    path('shop/', include('shop.urls')),
    path('cart/', include('cart.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
