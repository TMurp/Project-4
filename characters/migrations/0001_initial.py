# Generated by Django 4.0.3 on 2022-03-07 12:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=500)),
                ('stats', models.CharField(default=None, max_length=300)),
                ('description', models.CharField(default=None, max_length=500)),
                ('character_image', models.CharField(default=None, max_length=500)),
            ],
        ),
    ]