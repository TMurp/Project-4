from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=30, default=None)
    username = models.CharField(max_length=20, unique=True, default="")
    profile_image = models.CharField(max_length=500, default="")
    stats = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=500, default="")
