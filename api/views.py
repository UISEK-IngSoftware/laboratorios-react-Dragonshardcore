from django.shortcuts import render
from rest_framework import viewsets
from .serializer import PokemonesSerializer, EntrenadoresSerializer, MispokemonesSerializer
from Pokedex1.models import Mispokemones, Pokemones, Entrenadores
from oauth2_provider.contrib.rest_framework import TokenHasScope, OAuth2Authentication
from rest_framework.permissions import IsAuthenticated, AllowAny

class PokemonesViewSet(viewsets.ModelViewSet):
    queryset = Pokemones.objects.all()
    serializer_class = PokemonesSerializer
    # Obligatorio para que reconozca el Token
    authentication_classes = [OAuth2Authentication]
    required_scopes = ['write']

    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            return [TokenHasScope(), IsAuthenticated()]
        return [AllowAny()]

class EntrenadoresViewSet(viewsets.ModelViewSet):
    queryset = Entrenadores.objects.all()
    serializer_class = EntrenadoresSerializer
    authentication_classes = [OAuth2Authentication]
    required_scopes = ['write']

    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            return [TokenHasScope(), IsAuthenticated()]
        return [AllowAny()]

class MispokemonViewSet(viewsets.ModelViewSet):
    queryset = Mispokemones.objects.all()
    serializer_class = MispokemonesSerializer
    authentication_classes = [OAuth2Authentication]
    required_scopes = ['write']

    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            return [TokenHasScope(), IsAuthenticated()]
        return [AllowAny()]