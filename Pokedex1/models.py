from django.db import models

# Create your models here.


class Entrenadores(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    edad = models.IntegerField()
    nivel = models.IntegerField(default=1)
    fecha_de_nacimiento = models.DateField(null=True, blank=True)
    descripciones = models.TextField()
    # RUTA_FINAL = MEDIA_ROOT + upload_to + nombre_archivo
    imagen = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="pokemons/", null=True, blank=True)

    def __str__(self):
        return self.nombre


class Pokemones(models.Model):
    nombre = models.CharField(max_length=100, null=False)
    tipo = models.CharField(max_length=40, null=False)
    peso = models.IntegerField(null=False)
    altura = models.IntegerField(null=False)
    # RUTA_FINAL = MEDIA_ROOT + upload_to + nombre_archivo
    imagen = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="pokemons/", null=True, blank=True)

    def __str__(self):
        return self.nombre


class Mispokemones(models.Model):
    nombre = models.CharField(max_length=100, null=False)
    tipo = models.CharField(max_length=40, null=False)
    peso = models.IntegerField(null=False)
    altura = models.IntegerField(null=False)
    entrenador = models.ForeignKey(Entrenadores, on_delete=models.CASCADE)
    # RUTA_FINAL = MEDIA_ROOT + upload_to + nombre_archivo
    imagen = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="pokemons/", null=True, blank=True)

    def __str__(self):
        return self.nombre + "-" + self.entrenador.nombre
