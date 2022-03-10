from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/games/', include('game.urls')),
    path('api/comments/', include('comments.urls')),
    path('api/character_comments/', include('character_comments.urls')),
    path('api/characters/', include('characters.urls')),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/users/', include('jwt_auth.urls'))
]
