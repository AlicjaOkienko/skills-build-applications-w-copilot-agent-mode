from django.test import TestCase
from .models import Team, Activity, Workout, Leaderboard
from django.contrib.auth.models import User

class ModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='password')
        self.team = Team.objects.create(name='Test Team')

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Test Team')

    def test_activity_creation(self):
        activity = Activity.objects.create(user=self.user, type='run', duration=30, distance=5)
        self.assertEqual(activity.type, 'run')

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Test Workout', description='A test workout', duration=45)
        self.assertEqual(workout.name, 'Test Workout')

    def test_leaderboard_creation(self):
        lb = Leaderboard.objects.create(user=self.user, points=100)
        self.assertEqual(lb.points, 100)