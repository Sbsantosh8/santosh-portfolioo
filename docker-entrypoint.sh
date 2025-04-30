#!/bin/bash
set -e

# Load environment variables from .env file if it exists
if [ -f /app/.env ]; then
  while IFS= read -r line; do
    # Skip empty lines and lines starting with #
    if [[ -n "$line" && ! "$line" =~ ^# ]]; then
      export "$line" || echo "Warning: Skipping invalid line in .env: $line"
    fi
  done < /app/.env
fi

# Check for required environment variables
if [[ "$1" != "/bin/bash" && -z "${EMAIL_PASSWORD}" ]]; then
  echo "ERROR: Required environment variable EMAIL_PASSWORD is not set"
  echo ""
  echo "Please run the container with:"
  echo "docker run -e EMAIL_PASSWORD=your_password portfolio"
  echo ""
  echo "Other optional environment variables:"
  echo "  EMAIL_USER - Email username/address"
  echo "  EMAIL_SERVER - SMTP server address"
  echo "  EMAIL_PORT - SMTP server port"
  exit 1
fi

# Check if we're starting with bash command
if [ "$1" = "/bin/bash" ]; then
  exec "$@"
elif [ "$1" = "python3" ] || [ "$1" = "python" ]; then
  # If just the interpreter is specified without a script
  if [ "$#" -eq 1 ]; then
    exec "$@" -i
  else
    exec "$@"
  fi
else
  # Otherwise run the command as is
  exec "$@"
fi
