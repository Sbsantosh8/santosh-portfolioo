FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY src/ ./src/

# Set environment variables
ENV PYTHONPATH=/app \
    PYTHONUNBUFFERED=1
# Required environment variables that must be passed at runtime:
# EMAIL_PASSWORD - Password for email account
# Optionally, other email-related variables may be required:
# EMAIL_USER - Email username/address
# EMAIL_SERVER - SMTP server address
# EMAIL_PORT - SMTP server port

# Expose port for React application (uncomment when needed)
EXPOSE 3000

# Add healthcheck to ensure container is running properly
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:3000')" || exit 1

# Create an entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

# Default command - can be overridden at runtime with docker run
CMD ["python", "src/utils/email_receiver.py"]
