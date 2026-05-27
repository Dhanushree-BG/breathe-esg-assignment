from django.contrib import admin
from .models import (
    Organization,
    DataSource,
    RawRecord,
    EmissionRecord,
    ReviewAction
)

admin.site.register(Organization)
admin.site.register(DataSource)
admin.site.register(RawRecord)
admin.site.register(EmissionRecord)
admin.site.register(ReviewAction)