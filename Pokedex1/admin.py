from django.contrib import admin
from .models import Entrenadores, Pokemones, Mispokemones
# Register your models here.
admin.site.register(Entrenadores),
admin.site.register( Pokemones),
admin.site.register( Mispokemones)