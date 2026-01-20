from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Entrenadores, Mispokemones, Pokemones
from django.shortcuts import render, redirect
from .CrearPokemonforms import CrearPokemon
from .CrearEntrenadoresforms import CrearEntrenadores
from .Mispokemonesforms import CrearMisPokemones1
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required


def pokemones(request):
    pokemones_lista = list(Pokemones.objects.all())
    return render(request, "Pokemones.html", {"pokemon": pokemones_lista})


def entrenadores(request):
    entrenadores_lista = list(Entrenadores.objects.all())
    return render(request, "Entrenadores.html", {"entrenador": entrenadores_lista})


def detalle_entrenadores(request, id):
    entrenador_detalle = Entrenadores.objects.get(id=id)
    pokemones = Mispokemones.objects.filter(entrenador_id=id)
    context = {"e": entrenador_detalle, "p": pokemones}
    return render(request, "Detallese.html", context)


def detalle_pokemones(request, id):
    pokemon_detalle = Pokemones.objects.get(id=id)
    return render(request, "Detallesp.html", {"p": pokemon_detalle})


@login_required
def crearp(request):
    if request.method == "POST":
        form = CrearPokemon(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("/")
    else:
        form = CrearPokemon()
    return render(request, "CrearPokemones.html", {"form": form})


@login_required
def creare(request):
    if request.method == "POST":
        form = CrearEntrenadores(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("/")
    else:
        form = CrearEntrenadores()

    return render(request, "CrearEntrenadores.html", {"form": form})


@login_required
def eliminar_pokemon(request, id):
    pokemon = Pokemones.objects.get(id=id)
    pokemon.delete()
    return redirect("/")


@login_required
def eliminar_entrenador(request, id):
    entrenador = Entrenadores.objects.get(id=id)
    entrenador.delete()
    return redirect("/")

@login_required
def editar_pokemon(request, id):
    pokemon_detalle = Pokemones.objects.get(id=id)

    if request.method == "POST":
        form = CrearPokemon(request.POST, request.FILES, instance=pokemon_detalle)
        if form.is_valid():
            form.save()
            return redirect("/")
    else:
        form = CrearPokemon(instance=pokemon_detalle)

    return render(request, "Editarp.html", { "form": form})

@login_required
def editar_entrenador(request, id):
    detalle_entrenador= Entrenadores.objects.get(id=id)
    
    if request.method == 'POST':
        form=CrearEntrenadores( request.POST, request.Files, instance=detalle_entrenador)
        if form.is_valid():
            form.save()
            return redirect("detalle_pokemones", id=id)
    else:
        form= CrearEntrenadores(instance=detalle_entrenador)  
        
    return render(request, 'Editare.html',{'form': form})  

class CustomerLoginView(LoginView):
    template_name = "login.html"

@login_required
def Mispokemones2(request):
    if request.method == 'POST':
        form = CrearMisPokemones1(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("entrenadores")
    else:
        form= CrearMisPokemones1()
    
    return render(request, "Mispokemones.html", {'form': form})

    

#def Mostrar(request):
    #form = CrearMisPokemones()
    #return render(request, "Mispokemones.html", {'form':form})
    
       