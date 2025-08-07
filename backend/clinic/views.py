from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from datetime import date

from .models import Doctor, Appointment
from .serializers import DoctorSerializer, AppointmentSerializer, UserProfileSerializer


# Login View
@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"detail": "Email and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )

    # Authenticate using username (from email)
    user = authenticate(username=user.username, password=password)

    if not user:
        return Response(
            {"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )

    refresh = RefreshToken.for_user(user)
    return Response({"access": str(refresh.access_token), "refresh": str(refresh)})


# User Profile View
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)


# Doctor List View
@api_view(["GET"])
@permission_classes([AllowAny])
def doctor_list(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)


# Appointment Create and List View
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def appointments_view(request):
    if request.method == "GET":
        # List all appointments of the current user
        appointments = Appointment.objects.filter(user=request.user)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        data = request.data.copy()
        data["user"] = request.user.id

        # Validate appointment_date
        if "appointment_date" in data:
            try:
                appt_date = date.fromisoformat(data["appointment_date"])
                if appt_date < date.today():
                    return Response(
                        {
                            "appointment_date": [
                                "Appointment date cannot be in the past."
                            ]
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            except ValueError:
                return Response(
                    {"appointment_date": ["Invalid date format. Use YYYY-MM-DD."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        serializer = AppointmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
