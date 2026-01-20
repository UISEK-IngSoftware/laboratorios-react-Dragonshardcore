from django import forms
from .models import Pokemones


class CrearPokemon(forms.ModelForm):
    class Meta:
        model = Pokemones
        fields = "__all__"
        labels = {
            'nombre': 'Nombre del Pokémon',
            'tipo': 'Tipo',
            'nivel': 'Nivel',
            'altura': 'Altura',
            'peso': 'Peso',
            'imagen': 'URL de imagen',
            'image': 'Imagen',
        }
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'tipo': forms.TextInput(attrs={'class': 'form-control'}),
            'nivel': forms.NumberInput(attrs={'class': 'form-control'}),
            'altura': forms.NumberInput(attrs={'class': 'form-control'}),
            'peso': forms.NumberInput(attrs={'class': 'form-control'}),
        }
