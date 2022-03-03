from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=50, default=None)
    game_image = models.CharField(max_length=500, default=None)
    # status = models.BooleanField
    stats = models.CharField(max_length=300, default=None)
    description = models.CharField(max_length=500, default=None)
    # members = 
    # characters =

    def __str__(self):
        return f"{self.name}"

