FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PORT=8080

RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# Build frontend (output lands at /app/backend/staticfiles/frontend via vite outDir)
COPY frontend/package*.json /app/frontend/
RUN cd /app/frontend && npm install

COPY frontend/ /app/frontend/
RUN cd /app/frontend && npm run build

# Install Python dependencies
COPY backend/requirements.txt /app/backend/
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy backend source
COPY backend/ /app/backend/

# Collect Django static files (admin CSS/JS etc.)
WORKDIR /app/backend
RUN python manage.py collectstatic --noinput

EXPOSE 8080
CMD ["sh", "-c", "python manage.py migrate && gunicorn project.wsgi --bind 0.0.0.0:$PORT"]
