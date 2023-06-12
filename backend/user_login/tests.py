from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User

class RegisterViewTestCase(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')

    def test_register_user(self):
        # Ensure we can register a new user
        
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'first_name': 'Test',
            'password': 'testpassword',
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('refresh', response.data)
        self.assertIn('access', response.data)

        user = User.objects.get(email='test@example.com')
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.first_name, 'Test')

    def test_register_user_already_exists(self):

        # Ensure we cannot register a user that already exists

        # Create a user with the email address we want to use for testing
        User.objects.create_user(username='existinguser', email='test@example.com', first_name='Existing', password='testpassword')
        # Attempt to register a new user with the same email address
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'first_name': 'Test',
            'password': 'testpassword',
        }
        response = self.client.post(self.register_url, data, format='json')

        # Ensure that the response status code is 400 (Bad Request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Ensure that the response contains an error message indicating that the user already exists
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'A user with this credential already exists')
