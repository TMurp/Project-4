from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=50)
    game_image = models.CharField(max_length=500)
    status = models.BooleanField
    stats = models.CharField(max_length=300)
    description = models.CharField(max_length=500)
    # members = 
    # characters =

    def __str__(self):
        return f"{self.name}"

