from django.urls import path 
from .views import GameListView, SingleGameView

urlpatterns = [
    path('', GameListView.as_view()),
    path('<int:pk>/', SingleGameView.as_view())
]