import csv

from rest_framework.decorators import api_view
from rest_framework.response import Response

from emissions.models import (
    Organization,
    DataSource,
    RawRecord,
    EmissionRecord
)


@api_view(['POST'])
def upload_sap(request):

    file = request.FILES['file']

    decoded_file = file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)

    organization, _ = Organization.objects.get_or_create(
        name="Demo Company"
    )

    datasource = DataSource.objects.create(
        organization=organization,
        source_type="SAP"
    )

    for row in reader:

        RawRecord.objects.create(
            datasource=datasource,
            raw_payload=row,
            ingestion_status="SUCCESS"
        )

        quantity = float(row['quantity'])

        status = "PENDING"

        if quantity < 0:
            status = "FLAGGED"

        emission = quantity * 0.82

        EmissionRecord.objects.create(
            organization=organization,
            category=row['fuel_type'],
            quantity=quantity,
            unit=row['unit'],
            emission=emission,
            status=status
        )

    return Response({"message": "SAP data uploaded"})


@api_view(['GET'])
def get_records(request):

    records = EmissionRecord.objects.all().values()

    return Response(records)
@api_view(['POST'])
def approve_record(request, record_id):

    record = EmissionRecord.objects.get(id=record_id)

    record.status = "APPROVED"
    record.save()

    return Response({"message": "Record approved"})