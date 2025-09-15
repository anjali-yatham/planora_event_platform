FROM python:3.11-slim-bookworm

WORKDIR /app

# Upgrade pip for latest features and compatibility
RUN pip install --upgrade pip

# Copy only requirements first to leverage Docker cache
COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ ./backend/

EXPOSE 8000

CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000} --app-dir /app"]
