import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse, FileResponse, Http404
from django.conf import settings


def health(request):
    return JsonResponse({'status': 'ok'})


def serve_spa(request):
    index_path = settings.WHITENOISE_ROOT / 'index.html'
    if index_path.exists():
        return FileResponse(open(index_path, 'rb'), content_type='text/html')
    raise Http404


from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', health),
    path('api/auth/login/', obtain_auth_token),
    path('api/', include('bloom_app.urls')),
    re_path(r'^.*$', serve_spa),
]
