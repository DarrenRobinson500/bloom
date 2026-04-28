from django.core.management.base import BaseCommand
from django.utils import timezone
from bloom_app.models import UserProfile, Event, Todo


class Command(BaseCommand):
    help = 'Seed the database with sample data'

    def handle(self, *args, **options):
        user, _ = UserProfile.objects.get_or_create(
            name='Alice',
            defaults={
                'status': 'active',
                'preferences': {'theme': 'light', 'view': 'month'},
                'notes': 'Default seed user',
            },
        )

        now = timezone.now().replace(minute=0, second=0, microsecond=0)

        events = [
            {'title': 'Team standup', 'start_datetime': now.replace(hour=9), 'end_datetime': now.replace(hour=9, minute=30), 'color': '#4f46e5'},
            {'title': 'Lunch', 'start_datetime': now.replace(hour=12), 'end_datetime': now.replace(hour=13), 'color': '#10b981'},
            {'title': 'Sprint review', 'start_datetime': now.replace(hour=15), 'end_datetime': now.replace(hour=16), 'color': '#f59e0b'},
        ]
        for data in events:
            Event.objects.get_or_create(title=data['title'], user=user, defaults=data)

        todos = [
            {'title': 'Review pull requests'},
            {'title': 'Update documentation'},
            {'title': 'Write unit tests'},
        ]
        for data in todos:
            Todo.objects.get_or_create(title=data['title'], user=user, defaults=data)

        self.stdout.write(self.style.SUCCESS('Database seeded successfully'))
