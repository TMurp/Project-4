from django.db import models

class Comment(models.Model):
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    game = models.ForeignKey(
        "game.Game",
        related_name = "comments",
        on_delete = models.CASCADE,
    )
    # character = models.ForeignKey(
    #     "characters.Character",
    #     related_name = "comments",
    #     on_delete = models.CASCADE,
    #     default=""
    # )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name = "comments",
        on_delete = models.CASCADE,
    )
