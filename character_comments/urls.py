from django.urls import path
from .views import CharacterCommentListView, SingleCharacterCommentView

urlpatterns = [
    path('', CharacterCommentListView.as_view()),
    path('<int:pk>/', SingleCharacterCommentView.as_view())
]