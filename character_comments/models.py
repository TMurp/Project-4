from django.db import models

class CharacterComment(models.Model):
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    character = models.ForeignKey(
        "characters.Character",
        related_name = "character_comments",
        on_delete = models.CASCADE,
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name = "character_comments",
        on_delete = models.CASCADE,
    )
