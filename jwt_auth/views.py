from time import strftime
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer
from datetime import datetime, timedelta
import jwt
from django.conf import settings

User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        try:
            user_to_create.is_valid()
            user_to_create.save()
            return Response(user_to_create.data, status=status.HTTP_201_CREATED)
        except:
            return Response("Failed to create user", status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):
    def post(self, request):
        #Checks if user exists
        try:
            user_to_login = User.objects.get(email=request.data.get('email'))
        except User.DoesNotExist:
            return PermissionDenied(detail="Unauthorised")
        #checks user password
        if not user_to_login.check_password(request.data.get('password')):
            return PermissionDenied(detail="Unauthorised")
        #get current time and expiry of 7 days
        dt = datetime.now() + timedelta(days=7)
        #create token
        token = jwt.encode({
            'sub': user_to_login.id,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, 'HS256')
        #Send token back to user
        return Response({
            'token': token,
            'message': f"Welcome back {user_to_login.username}"
        }, status.HTTP_202_ACCEPTED)

class UserListView(APIView):
    def get(self, _request):
        users = User.objects.all()
        serialized_users = UserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)

class SingleUserView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    #Find user function
    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            raise NotFound(detail="User not found")

    #Get single user
    def get(self, _request, pk):
        user = self.get_user(pk=pk)
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

    #Edit a user
    def put(self, request, pk):
        user_to_update = self.get_user(pk=pk)
        # user_to_update = user.objects.get(pk=pk)
        serialized_user = UserSerializer(user_to_update, data=request.data)
        try:
            # if user_to_update.owner != request.user:
            #     raise PermissionDenied(detail="Unauthorised")
            serialized_user.is_valid()
            serialized_user.save()
            return Response(serialized_user.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    #Delete a user
    def delete(self, _request, pk):
        try:
            user_to_delete = self.get_user(pk=pk)
            if user_to_delete != user_to_delete:
                raise PermissionDenied(detail="Unauthorised")
            user_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            raise NotFound(detail="User not found")
        except:
            return Response({"detail": "Failed to delete User"}, status=status.HTTP_401_UNAUTHORIZED)