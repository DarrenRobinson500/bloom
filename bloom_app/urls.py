from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, EventViewSet, TodoViewSet, ContactSubmissionViewSet

router = DefaultRouter()
router.register(r'users', UserProfileViewSet)
router.register(r'events', EventViewSet)
router.register(r'todos', TodoViewSet)
router.register(r'contact-submissions', ContactSubmissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
