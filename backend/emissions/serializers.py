from rest_framework import serializers
from .models import EmissionRecord, ReviewAction


class EmissionRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmissionRecord
        fields = '__all__'


class ReviewActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewAction
        fields = '__all__'