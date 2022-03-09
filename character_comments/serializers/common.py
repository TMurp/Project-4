from rest_framework import serializers
from ..models import CharacterComment

class CharacterCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharacterComment
        fields = '__all__'