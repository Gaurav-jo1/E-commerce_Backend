from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User


class RegisterViewTestCase(APITestCase):

    def setUp(self):
        self.url = reverse('register/')
        self.valid_payload = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'D@nnyp0laaaa',
            'first_name': 'Test'
        }
        # self.invalid_payload = {
        #     'username': '',
        #     'email': 'testuser@example.com',
        #     'password': 'testpassword',
        #     'first_name': 'Test'
        # }

    def test_register_user_with_valid_payload(self):
        response = self.client.post(self.url, data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')

    # def test_register_user_with_invalid_payload(self):
    #     response = self.client.post(self.url, data=self.invalid_payload)
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertEqual(User.objects.count(), 0)
