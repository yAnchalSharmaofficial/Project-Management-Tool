from rest_framework import serializers
from .models import Project, Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

    def validate_title(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Title cannot be empty")
        return value

    def validate_status(self, value):
        if value not in ['todo', 'in-progress', 'done']:
            raise serializers.ValidationError("Invalid status")
        return value


class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'status','tasks'] 

    def validate_title(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Title cannot be empty")
        return value

    def validate_status(self, value):
        if value not in ['active', 'completed']:
            raise serializers.ValidationError("Invalid status")
        return value