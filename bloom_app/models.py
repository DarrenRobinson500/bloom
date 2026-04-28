from django.db import models


class UserProfile(models.Model):
    name = models.CharField(max_length=200)
    status = models.CharField(max_length=100, default='active')
    preferences = models.JSONField(default=dict, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Event(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='events', null=True, blank=True)
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    color = models.CharField(max_length=20, default='#4f46e5')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['start_datetime']

    def __str__(self):
        return self.title


class Todo(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='todos', null=True, blank=True)
    title = models.CharField(max_length=300)
    completed = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['completed', '-created_at']

    def __str__(self):
        return self.title


class ContactSubmission(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    message = models.TextField(blank=True)
    call_notes = models.TextField(blank=True)
    initial_meeting_at = models.DateTimeField(null=True, blank=True)
    farewell_at = models.DateTimeField(null=True, blank=True)
    # Linked calendar events — managed by the view, not written directly by clients
    initial_meeting_event = models.OneToOneField(
        Event, null=True, blank=True, on_delete=models.SET_NULL,
        related_name='initial_meeting_submission',
    )
    farewell_event = models.OneToOneField(
        Event, null=True, blank=True, on_delete=models.SET_NULL,
        related_name='farewell_submission',
    )
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f'{self.name} — {self.submitted_at:%Y-%m-%d %H:%M}'
