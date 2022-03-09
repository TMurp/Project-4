from django.urls import path
from .views import CharacterListView, SingleCharacterView

urlpatterns = [
    path('', CharacterListView.as_view()),
    path('<int:pk>/', SingleCharacterView.as_view())
]