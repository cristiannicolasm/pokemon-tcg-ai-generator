# Dockerfile

# Usar una imagen base de Python oficial. Recomiendo una versión específica y ligera.
FROM python:3.10-slim-buster

# Establecer la variable de entorno para evitar que Python escriba archivos .pyc en el contenedor
ENV PYTHONDONTWRITEBYTECODE 1
# Establecer la variable de entorno para que Python imprima la salida directamente en la consola (útil para logs)
ENV PYTHONUNBUFFERED 1

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo requirements.txt al directorio de trabajo
COPY requirements.txt /app/

# Instalar las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el script de espera
COPY wait-for-db.sh /usr/local/bin/
# ¡Esta línea es crucial y ya debería estar en tu Dockerfile!
RUN chmod +x /usr/local/bin/wait-for-db.sh 

# Copiar todo el código de tu proyecto al directorio de trabajo
# NOTA: Asegúrate de que tu .dockerignore esté bien configurado para no copiar archivos innecesarios
COPY . /app/

# Establecer el punto de entrada para la aplicación Django
# Esto es lo que se ejecuta cuando el contenedor se inicia
ENTRYPOINT ["python", "manage.py"]

# Exponer el puerto en el que Django correrá (por defecto 8000)
EXPOSE 8000