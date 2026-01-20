from rest_framework import serializers
from Pokedex1.models import Mispokemones, Pokemones, Entrenadores

class MispokemonesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mispokemones
        fields = '__all__'

class PokemonesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemones
        fields= '__all__'

class EntrenadoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrenadores
        fields= '__all__'
        
