from django.urls import path
from .views import LoginView, RegisterView, SingleUserView, UserListView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('', UserListView.as_view()),
    path('<int:pk>/', SingleUserView.as_view())
]