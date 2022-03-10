# Generated by Django 4.0.3 on 2022-03-10 19:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('characters', '0001_initial'),
        ('character_comments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='charactercomment',
            name='character',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='character_comments', to='characters.character'),
        ),
    ]
