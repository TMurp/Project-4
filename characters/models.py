from django.db import models

class Character(models.Model):
    name = models.CharField(max_length=500, default="")
    stats = models.CharField(max_length=300, default="")
    description = models.CharField(max_length=500, default="")
    character_image = models.CharField(max_length=500, default="")
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name = "characters",
        on_delete = models.CASCADE,
        default=None
    )

