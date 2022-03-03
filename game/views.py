from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.db import IntegrityError
from .models import Game
from .serializers.common import GameSerializer

class GameListView(APIView):
    #Get all games
    def get(self, _request):
        games = Game.objects.all()
        serialized_games = GameSerializer(games, many=True)
        return Response(serialized_games.data, status=status.HTTP_200_OK)

    #Post a game
    def post(self, request):
        serialized_data = GameSerializer(data=request.data)
        print(serialized_data)
        try:
            serialized_data.is_valid()
            serialized_data.save()
            return Response(serialized_data.data, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({ "detail": "Unprocessable Entity" }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class SingleGameView(APIView):
    #Find game function
    def get_game(self, pk):
        try:
            return Game.objects.get(pk=pk)
        except:
            raise NotFound(detail="Game not found")

    #Get single game
    def get(self, _request, pk):
        game = self.get_game(pk=pk)
        serialized_game = GameSerializer(game)
        return Response(serialized_game.data, status=status.HTTP_200_OK)

    #Edit a game
    def put(self, request, pk):
        game_to_update = self.get_game(pk=pk)
        serialized_game = GameSerializer(game_to_update, data=request.data)
        try:
            serialized_game.is_valid()
            serialized_game.save()
            return Response(serialized_game.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    #Delete a game
    def delete(self, _request, pk):
        game = self.get_game(pk=pk)
        game.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)