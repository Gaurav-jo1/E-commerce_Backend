import redis
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create Redis index"

    def handle(self, *args, **options):
        # Establish a connection to the Redis server
        r = redis.Redis(host="redis", port=6379, db=0, decode_responses=True)

        # Define the FT.CREATE command
        command = "FT.CREATE idx:name ON hash PREFIX 1 'product:' SCHEMA name TEXT SORTABLE price NUMERIC SORTABLE image TEXT NOSTEM"

        # Execute the command
        response = r.execute_command(command)

        # Print the response
        print("Command: ", response)