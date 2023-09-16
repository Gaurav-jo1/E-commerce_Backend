# myapp/management/commands/wait_for_db.py

import time
from django.core.management.base import BaseCommand
from django.db import connections
from django.db.utils import OperationalError

class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write('Waiting for database...')
        db_conn = None
        max_attempts = 60  # Adjust the number of attempts as needed
        attempts = 0

        while not db_conn and attempts < max_attempts:
            try:
                db_conn = connections['default']
            except OperationalError:
                self.stdout.write('Database unavailable, waiting 1 second...')
                time.sleep(1)
                attempts += 1

        if db_conn:
            self.stdout.write(self.style.SUCCESS('Database available!'))
        else:
            self.stdout.write(self.style.ERROR('Unable to connect to the database.'))
            raise SystemExit(1)
