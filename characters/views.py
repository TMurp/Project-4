from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db import IntegrityError
from .models import Character
from .serializers.common import CharacterSerializer
from .serializers.populated import PopulatedCharacterSerializer

# All characters View
class CharacterListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # Get all characters
    def get(self, _request):
        characters = Character.objects.all()
        serialized_characters = PopulatedCharacterSerializer(characters, many=True)
        return Response(serialized_characters.data, status=status.HTTP_200_OK)

    # Post a character
    def post(self, request):
        request.data["owner"] = request.user.id
        serialized_data = CharacterSerializer(data=request.data)
        try:
            serialized_data.is_valid()
            serialized_data.save()
            return Response(serialized_data.data, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            print(serialized_data)
            return Response({ "detail": "Unprocessable Entity" }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# Single Character View
class SingleCharacterView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # Get character function
    def get_character(self, pk):
        try:
            return Character.objects.get(pk=pk)
        except Character.DoesNotExist:
            raise NotFound(detail="Character not found")

    # Get single character
    def get(self, _request, pk):
        character = self.get_character(pk=pk)
        serialized_character = PopulatedCharacterSerializer(character)
        return Response(serialized_character.data, status=status.HTTP_200_OK)

    # Edit character
    def put(self, request, pk):
        character_to_update = self.get_character(pk=pk)
        serialized_character = CharacterSerializer(character_to_update, data=request.data)
        try:
            serialized_character.is_valid()
            serialized_character.save()
            return Response(serialized_character.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({ "detail": "Unprocessable Entity" }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # Delete character
    def delete(self, request, pk):
        try:
            character_to_delete = Character.objects.get(pk=pk)
            if character_to_delete.owner != request.user:
                raise PermissionDenied(detail="Unauthorised")
            character_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Character.DoesNotExist:
            raise NotFound(detail="Comment not found")
        except:
            return Response({"detail": "Failed to delete Comment"}, status=status.HTTP_401_UNAUTHORIZED)

