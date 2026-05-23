from django.urls import path

from .api_views import TaskListCreateAPIView

urlpatterns = [
    path("", TaskListCreateAPIView.as_view(), name="task-list-create"),
]

