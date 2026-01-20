from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('entrenadores/', views.entrenadores, name="entrenadores"),
    path('', views.pokemones),
    path('detalle_pokemones/<int:id>/', views.detalle_pokemones,name="detalle_pokemones"),
    path('detalle_entrenadores/<int:id>/', views.detalle_entrenadores,name="detalle_entrenadores"),
    path('agregarp/', views.crearp, name="crearp"),
    path('agregare/', views.creare, name="creare"),
    path("accounts/login/", views.CustomerLoginView.as_view(), name="login"),
    path("accounts/logout/", LogoutView.as_view(), name="logout"),
    path("eliminar_pokemon/<int:id>/", views.eliminar_pokemon, name="eliminar_pokemon"),
    path("editar_pokemon/<int:id>/", views.editar_pokemon, name="editar_pokemon"),
    path("eliminar_entrenador/<int:id>/", views.eliminar_entrenador, name="eliminar_entrenador"),
    path("editar_entrenador/<int:id>/", views.editar_entrenador, name="editar_entrenador"),
    path("Mispokemones/", views.Mispokemones2, name="Mispokemones"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
