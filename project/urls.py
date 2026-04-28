import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse, FileResponse, Http404
from django.conf import settings


def health(request):
    import os
    return JsonResponse({
        'status': 'ok',
        'BASE_DIR': str(settings.BASE_DIR),
        'STATIC_ROOT': str(settings.STATIC_ROOT),
        'WHITENOISE_ROOT': str(settings.WHITENOISE_ROOT),
        'cwd': os.getcwd(),
        'static_root_exists': settings.STATIC_ROOT.exists(),
        'whitenoise_root_exists': settings.WHITENOISE_ROOT.exists(),
    })


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
