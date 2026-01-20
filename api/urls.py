from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()
router.register(r'Pokemones', views.PokemonesViewSet,)
router.register(r'Entrenadores', views.EntrenadoresViewSet,)
router.register(r'Mispokemones', views.MispokemonViewSet,)

urlpatterns = [
    path('', include(router.urls)),
]
