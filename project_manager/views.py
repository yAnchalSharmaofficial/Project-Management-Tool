from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "message": "Project Manager API running",
        "routes": {
            "login": "/api/login/",
            "register": "/api/register/",
            "projects": "/api/projects/"
        }
    })