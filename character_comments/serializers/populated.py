from .common import CharacterCommentSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedCharacterCommentSerializer(CharacterCommentSerializer):
    owner = UserSerializer()