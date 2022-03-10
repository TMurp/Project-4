from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=50, default="")
    game_image = models.CharField(max_length=500, default="")
    stats = models.CharField(max_length=300, default="")
    description = models.CharField(max_length=500, default="")
    members = models.ManyToManyField(
        "jwt_auth.User",
        related_name="games_joined",
        default=""
    )
    character = models.ManyToManyField(
        "characters.Character",
        related_name = "game",
        default=""
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name = "games",
        on_delete = models.CASCADE,
        default=None
    )

    def __str__(self):
        return f"{self.name}"

