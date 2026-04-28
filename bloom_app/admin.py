from django.contrib import admin
from .models import UserProfile, Event, Todo

admin.site.register(UserProfile)
admin.site.register(Event)
admin.site.register(Todo)
