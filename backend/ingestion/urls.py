from django.urls import path
from .views import (
    upload_sap,
    get_records,
    approve_record
)

urlpatterns = [
    path('sap/upload/', upload_sap),
    path('records/', get_records),
    path('approve/<int:record_id>/', approve_record),
]