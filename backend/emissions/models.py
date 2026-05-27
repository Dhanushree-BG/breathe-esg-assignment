from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class DataSource(models.Model):
    SOURCE_TYPES = [
        ("SAP", "SAP"),
        ("UTILITY", "UTILITY"),
        ("TRAVEL", "TRAVEL"),
    ]

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    source_type = models.CharField(max_length=20, choices=SOURCE_TYPES)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.source_type


class RawRecord(models.Model):
    datasource = models.ForeignKey(DataSource, on_delete=models.CASCADE)
    raw_payload = models.JSONField()
    ingestion_status = models.CharField(max_length=20)
    error_message = models.TextField(blank=True, null=True)


class EmissionRecord(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "PENDING"),
        ("FLAGGED", "FLAGGED"),
        ("APPROVED", "APPROVED"),
        ("REJECTED", "REJECTED"),
        ("LOCKED", "LOCKED"),
    ]

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    category = models.CharField(max_length=100)
    quantity = models.FloatField()
    unit = models.CharField(max_length=50)
    emission = models.FloatField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return self.category


class ReviewAction(models.Model):
    emission_record = models.ForeignKey(EmissionRecord, on_delete=models.CASCADE)
    action = models.CharField(max_length=50)
    notes = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)