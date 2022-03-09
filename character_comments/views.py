from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.common import CharacterCommentSerializer
from .models import CharacterComment

# Comment View
class CharacterCommentListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # Get all comments ?

    #Add a comment
    def post(self, request):
        request.data["owner"] = request.user.id
        print(request.user.id)
        serialized_comment = CharacterCommentSerializer(data=request.data)
        try:
            serialized_comment.is_valid()
            serialized_comment.save()
            return Response(serialized_comment.data, status=status.HTTP_201_CREATED)
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({"detail": "Hello, Unprocessable Entity"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# Single Comment View
class SingleCharacterCommentView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # Get single comment ?

    # Edit comment ?

    # Delete comment
    def delete(self, request, pk):
        try:
            comment_to_delete = CharacterComment.objects.get(pk=pk)
            if comment_to_delete.owner != request.user:
                raise PermissionDenied(detail="Unauthorised")
            comment_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CharacterComment.DoesNotExist:
            raise NotFound(detail="Comment not found")
        except:
            return Response({"detail": "Failed to delete Comment"}, status=status.HTTP_401_UNAUTHORIZED)
