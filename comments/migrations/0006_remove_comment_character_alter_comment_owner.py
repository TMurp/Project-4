# Generated by Django 4.0.3 on 2022-03-07 16:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('comments', '0005_alter_comment_character_alter_comment_game'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='character',
        ),
        migrations.AlterField(
            model_name='comment',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL),
        ),
    ]