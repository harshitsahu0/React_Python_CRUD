from rest_framework import serializers
from myapp.models import *
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'  # You can specify specific fields if needed
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'  # You can specify specific fields if needed
