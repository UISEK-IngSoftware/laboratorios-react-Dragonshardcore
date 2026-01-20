from django import forms
from .models import Entrenadores

class CrearEntrenadores(forms.ModelForm):
    class Meta:
        model = Entrenadores
        fields = '__all__'
        labels = {
            'nombre': 'Nombre',
            'apellido': 'Apellido',
            'edad': 'Edad',
            'nivel': 'Nivel',
            'fecha_de_nacimiento': 'Fecha de nacimiento',
            'imagen': 'URL de imagen',
            'image': 'Imagen',
            'descripciones': 'Descripción',
        }
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'apellido': forms.TextInput(attrs={'class': 'form-control'}),
            'edad': forms.NumberInput(attrs={'class': 'form-control'}),
            'nivel': forms.NumberInput(attrs={'class': 'form-control'}),
            'fecha_de_nacimiento': forms.DateInput(
                attrs={'class': 'form-control', 'type': 'date'}
            ),
            'descripciones': forms.Textarea(attrs={'class': 'form-control'}),
        }

    