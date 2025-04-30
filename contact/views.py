from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from src.utils.email_receiver import EmailSender

# Create your views here.

@csrf_exempt
def submit_form(request):
    if request.method == 'POST':
        try:
            # Parse the JSON data from the request
            data = json.loads(request.body)
            sender_email = data.get('email')
            sender_name = data.get('name')
            message = data.get('message')

            if not sender_email or not sender_name or not message:
                return JsonResponse({"error": "All fields are required."}, status=400)

            # Use EmailSender to send the email
            email_sender = EmailSender()
            subject = f"New Message from {sender_name}"
            body = f"You have received a new message from {sender_name} ({sender_email}):\n\n{message}"
            email_sender.send_email(to_email='santoshmudhiraj81@gmail.com', subject=subject, body=body)

            return JsonResponse({"message": "Form submitted successfully and email sent."}, status=200)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)
