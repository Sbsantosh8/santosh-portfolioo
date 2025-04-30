import imaplib
import email
import os
import sys
from email.header import decode_header
from pathlib import Path
import logging
import socket
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Create a logger instance
logger = logging.getLogger(__name__)

# First check if environment variables are already set in the system
email_from_env = os.environ.get('EMAIL_ADDRESS')
password_from_env = os.environ.get('EMAIL_PASSWORD')

# Only try to load from dotenv if necessary variables aren't in environment
if not (email_from_env and password_from_env):
    try:
        from dotenv import load_dotenv
        
        # Try to find the .env file at different possible locations
        env_paths = [
            os.path.join(os.path.dirname(__file__), '.env'),  # Same directory as this file
            os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'),  # Parent directory
            os.path.join(Path.home(), '.env'),  # User's home directory
        ]
        
        dotenv_loaded = False
        for env_path in env_paths:
            logger.info(f"Checking for .env file at: {env_path}")
            if os.path.exists(env_path):
                load_dotenv(env_path)
                logger.info(f"Loaded environment variables from {env_path}")
                dotenv_loaded = True
                break
        
        if not dotenv_loaded:
            logger.warning("No .env file found in the checked paths. Using system environment variables only.")
    except ImportError:
        logger.error("python-dotenv package is not installed. Install it using 'pip install python-dotenv'.")
    except Exception as e:
        logger.error(f"An unexpected error occurred while loading .env file: {str(e)}")

class EmailReceiver:
    def __init__(self):
        """Initialize email receiver with environment variables"""
        self.email_address = os.getenv('EMAIL_ADDRESS', 'santoshmudhiraj81@gmail.com')
        self.password = os.getenv('EMAIL_PASSWORD')
        self.imap_server = os.getenv('IMAP_SERVER', 'imap.gmail.com')
        self.imap_port = int(os.getenv('IMAP_PORT', 993))
        
        if not self.password:
            logger.error("Email password not found in environment variables")
            raise ValueError("EMAIL_PASSWORD environment variable is required")
            
    def connect(self):
        """Connect to the IMAP server"""
        try:
            logger.info(f"IMAP Server: {self.imap_server}, Port: {self.imap_port}")
            self.mail = imaplib.IMAP4_SSL(self.imap_server, self.imap_port)
            self.mail.login(self.email_address, self.password)
            logger.info(f"Successfully connected to {self.imap_server}")
            return True
        except Exception as e:
            logger.error(f"Failed to connect to email server: {str(e)}")
            return False
    
    def get_inbox_messages(self, limit=10):
        """Fetch messages from inbox"""
        if not hasattr(self, 'mail'):
            logger.error("IMAP connection not established. Call connect() first.")
            return []
        try:
            self.mail.select('INBOX')
            status, data = self.mail.search(None, 'ALL')
            mail_ids = data[0].split()

            # Get the latest emails (up to the limit)
            mail_ids = mail_ids[-limit:] if limit < len(mail_ids) else mail_ids

            messages = []
            for mail_id in mail_ids:
                status, data = self.mail.fetch(mail_id, '(RFC822)')
                raw_email = data[0][1]
                msg = email.message_from_bytes(raw_email)

                # Decode subject
                subject = decode_header(msg["Subject"])[0][0]
                if isinstance(subject, bytes):
                    subject = subject.decode()

                # Get sender
                sender = msg.get("From")
                logger.info(f"Extracted sender: {sender}")

                # Get date
                date = msg.get("Date")

                # Get body
                body = ""
                if msg.is_multipart():
                    for part in msg.walk():
                        content_type = part.get_content_type()
                        content_disposition = str(part.get("Content-Disposition"))

                        if "attachment" not in content_disposition and content_type in ["text/plain", "text/html"]:
                            try:
                                body = part.get_payload(decode=True).decode()
                            except:
                                pass
                else:
                    body = msg.get_payload(decode=True).decode()

                messages.append({
                    "id": mail_id.decode(),
                    "subject": subject,
                    "from": sender,
                    "date": date,
                    "body": body[:200] + "..." if len(body) > 200 else body  # Truncate long messages
                })

            return messages

        except Exception as e:
            logger.error(f"Error fetching emails: {str(e)}")
            return []
    
    def disconnect(self):
        """Close the connection to the IMAP server"""
        if not hasattr(self, 'mail'):
            logger.error("IMAP connection not established. Call connect() first.")
            return
        try:
            self.mail.close()
            self.mail.logout()
            logger.info("Disconnected from email server")
        except Exception as e:
            logger.error(f"Error disconnecting: {str(e)}")
    
    def __enter__(self):
        """Context manager entry"""
        self.connect()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit"""
        self.disconnect()

class EmailSender:
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', 587))
        self.email_address = os.getenv('EMAIL_ADDRESS', 'santoshmudhiraj81@gmail.com')
        self.password = os.getenv('EMAIL_PASSWORD')

        if not self.password:
            logger.error("Email password not found in environment variables")
            raise ValueError("EMAIL_PASSWORD environment variable is required")

    def send_email(self, to_email, subject, body):
        try:
            # Create the email
            msg = MIMEMultipart()
            msg['From'] = self.email_address
            msg['To'] = to_email
            msg['Subject'] = subject

            # Attach the email body
            msg.attach(MIMEText(body, 'plain'))

            # Connect to the SMTP server and send the email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.email_address, self.password)
                server.send_message(msg)

            logger.info(f"Email sent successfully to {to_email}")
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")


if __name__ == "__main__":
    try:
        # Example usage
        with EmailReceiver() as receiver:
            messages = receiver.get_inbox_messages(5)
            print(f"Retrieved {len(messages)} messages")
            for msg in messages:
                print(f"Subject: {msg['subject']}")
                print(f"From: {msg['from']}")
                print(f"Date: {msg['date']}")
                print("Preview: " + msg['body'][:100] + "...")
                print("-" * 50)
    except Exception as e:
        print(f"Error: {e}")
