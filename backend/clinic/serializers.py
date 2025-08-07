from rest_framework import serializers
from .models import Doctor, Appointment
from django.contrib.auth.models import User
from datetime import date

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(),
        source='doctor',
        write_only=True
    )
    class Meta:
        model = Appointment
        fields = ['id', 'patient_name', 'age', 'appointment_date','doctor' ,'doctor_id', 'user']
        read_only_fields = ['user']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
