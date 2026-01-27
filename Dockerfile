FROM python:3.11-slim
# Evita archivos .pyc y buffers raros
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Directorio de trabajo dentro del contenedor
WORKDIR /app
# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
# Copiar dependencias
COPY requirements.txt .
# Instalar dependencias Python
RUN pip install --no-cache-dir -r requirements.txt
# Copiar todo el proyecto
COPY . .
# Puerto que expone Django
EXPOSE 8000
# Comando por defecto
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
