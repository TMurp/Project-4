# Generated by Django 4.0.3 on 2022-03-07 14:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('game', '0003_alter_game_character_alter_game_members'),
        ('characters', '0008_alter_character_character_image_and_more'),
        ('comments', '0003_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='character',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='characters.character'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='game',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='game.game'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='owner',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL),
        ),
    ]