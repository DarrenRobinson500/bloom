import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse, FileResponse, Http404
from django.conf import settings


def health(request):
    import os
    from pathlib import Path
    app = Path('/app')
    return JsonResponse({
        'status': 'ok',
        'BASE_DIR': str(settings.BASE_DIR),
        'cwd': os.getcwd(),
        'app_ls': sorted(p.name + ('/' if p.is_dir() else '') for p in app.iterdir()),
        'backend_exists': (app / 'backend').exists(),
        'project_at_app': (app / 'project').exists(),
        'manage_at_app': (app / 'manage.py').exists(),
        'manage_at_app_backend': (app / 'backend' / 'manage.py').exists(),
        'staticfiles_at_app': (app / 'staticfiles').exists(),
        'staticfiles_at_app_backend': (app / 'backend' / 'staticfiles').exists(),
        'PYTHONPATH': os.environ.get('PYTHONPATH', '(not set)'),
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
