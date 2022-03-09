from .common import GameSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from characters.serializers.common import CharacterSerializer

class PopulatedGameSerializer(GameSerializer):
    comments = PopulatedCommentSerializer(many=True)
    character = CharacterSerializer(many=True)