from datetime import timedelta
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import UserProfile, Event, Todo, ContactSubmission
from .serializers import UserProfileSerializer, EventSerializer, TodoSerializer, ContactSubmissionSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        start = self.request.query_params.get('start')
        end = self.request.query_params.get('end')
        if start:
            qs = qs.filter(start_datetime__gte=start)
        if end:
            qs = qs.filter(start_datetime__lte=end)
        return qs


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class ContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    http_method_names = ['get', 'post', 'patch', 'head', 'options']

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_update(self, serializer):
        instance = serializer.instance
        old_initial_event_id = instance.initial_meeting_event_id
        old_farewell_event_id = instance.farewell_event_id

        updated = serializer.save()

        phone_line = f"{updated.name}'s mobile: {updated.phone}" if updated.phone else ''

        self._sync_event(
            submission=updated,
            date_value=updated.initial_meeting_at,
            event_field='initial_meeting_event',
            old_event_id=old_initial_event_id,
            title=f'{updated.name} — Initial Meeting',
            description=phone_line,
            color='#7A9E7E',
        )
        self._sync_event(
            submission=updated,
            date_value=updated.farewell_at,
            event_field='farewell_event',
            old_event_id=old_farewell_event_id,
            title=f'{updated.name} — Farewell',
            description=phone_line,
            color='#C4714F',
        )

    def _sync_event(self, submission, date_value, event_field, old_event_id, title, description, color):
        if date_value:
            end_dt = date_value + timedelta(hours=1)
            if old_event_id:
                Event.objects.filter(pk=old_event_id).update(
                    title=title,
                    description=description,
                    start_datetime=date_value,
                    end_datetime=end_dt,
                    color=color,
                )
            else:
                event = Event.objects.create(
                    title=title,
                    description=description,
                    start_datetime=date_value,
                    end_datetime=end_dt,
                    color=color,
                )
                setattr(submission, event_field, event)
                submission.save(update_fields=[event_field])
        elif old_event_id:
            Event.objects.filter(pk=old_event_id).delete()
