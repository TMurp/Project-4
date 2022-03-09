from .common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
    games_joined = UserSerializer()
    games_owned = UserSerializer()