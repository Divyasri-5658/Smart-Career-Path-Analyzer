from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from openai import OpenAI
from dotenv import load_dotenv
import os
from django.http import JsonResponse
from clerk_backend_api import Clerk
from django.views.decorators.csrf import csrf_exempt
import json
# Load .env file
load_dotenv()

# ✅ Create OpenAI client using your API key from .env
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")

@csrf_exempt
@api_view(['POST'])
def recommend(request):
    skills = request.data.get('skills', '')
    interests = request.data.get('interests', '')

    try:
        prompt = f"""
        The user has skills: {skills}
        and is interested in: {interests}.
        Suggest:
        1. 3 suitable job roles
        2. 3 recommended online courses
        3. 3 trending skills they should learn
        """

        # ✅ Correct syntax for version 2.x
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a career recommendation assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        result = completion.choices[0].message.content
        return Response({"recommendations": result})

    except Exception as e:
        print("Error:", e)
        return Response({"error": str(e)}, status=500)
@csrf_exempt
def save_user(request):
    return JsonResponse("hello",safe=False)