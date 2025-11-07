import requests
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
from .models import User

class ClerkAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            request.clerk_user = None
            return None  # Allow public routes if needed

        token = auth_header.split(' ')[1]
        verify_url = "https://api.clerk.dev/v1/tokens/verify"
        headers = {"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"}
        data = {"token": token}

        res = requests.post(verify_url, headers=headers, data=data)
        if res.status_code != 200:
            request.clerk_user = None
            return None

        clerk_user_id = res.json().get('user_id')
        if not clerk_user_id:
            request.clerk_user = None
            return None

        # Fetch full user data from Clerk
        user_res = requests.get(
            f"https://api.clerk.dev/v1/users/{clerk_user_id}",
            headers=headers
        )

        if user_res.status_code != 200:
            request.clerk_user = None
            return None

        user_info = user_res.json()
        email = user_info["email_addresses"][0]["email_address"]

        # Create or get user in Django DB
        user, created = User.objects.get_or_create(
            clerk_id=user_info["id"],
            defaults={
                "email": email,
                "first_name": user_info.get("first_name", ""),
                "last_name": user_info.get("last_name", "")
            }
        )

        request.clerk_user = user
        return None
