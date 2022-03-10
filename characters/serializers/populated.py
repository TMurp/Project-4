from .common import CharacterSerializer
from game.serializers.common import GameSerializer
from character_comments.serializers.populated import PopulatedCharacterCommentSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedCharacterSerializer(CharacterSerializer):
    # game = GameSerializer(many=True)
    # character_comments = PopulatedCharacterCommentSerializer(many=True)
    owner = UserSerializer()