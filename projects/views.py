from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, filters
from rest_framework.pagination import PageNumberPagination
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer


class ProjectPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 20


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "description"]

    pagination_class = ProjectPagination

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.filter(project__user=self.request.user)

        project_id = self.request.query_params.get('project_id')
        if project_id:
            queryset = queryset.filter(project_id=project_id)

        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        return queryset