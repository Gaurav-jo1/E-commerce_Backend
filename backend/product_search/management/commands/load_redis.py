from django.core.management.base import BaseCommand
from product_search.views import LoadProducts

class Command(BaseCommand):
    def handle(self, *args, **options):

        LoadProducts().RedisCreateIndex()

        LoadProducts().RedisDataLoad()