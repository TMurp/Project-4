from .common import GameSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from characters.serializers.common import CharacterSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedGameSerializer(GameSerializer):
    comments = PopulatedCommentSerializer(many=True)
    character = CharacterSerializer(many=True)
    owner = UserSerializer()