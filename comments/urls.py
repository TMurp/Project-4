from django.urls import path
from .views import CommentListView, SingleCommentView

urlpatterns = [
    path('', CommentListView.as_view()),
    path('<int:pk>/', SingleCommentView.as_view())
]