# Generated by Django 4.0.3 on 2022-03-03 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('game_image', models.CharField(max_length=500)),
                ('stats', models.CharField(max_length=300)),
                ('description', models.CharField(max_length=500)),
            ],
        ),
    ]
