import redis
from django.core.management.base import BaseCommand
from redis.exceptions import ResponseError


class Command(BaseCommand):
    help = "Create Redis index"

    def handle(self, *args, **options):
        # Establish a connection to the Redis server
        r = redis.Redis(host="redis", port=6379, db=0, decode_responses=True)

        # Index name
        index_name = "idx:product"

        try:
            index_exists = r.execute_command("FT.INFO idx:product")

            if index_exists:
                self.stdout.write(self.style.SUCCESS(f"Index '{index_name}' exists"))
            else:
                self.stdout.write(
                    self.style.SUCCESS(f"Index '{index_name}' does not exist")
                )
        except ResponseError as e:
            if "Unknown Index name" in str(e):
                self.stderr.write(
                    self.style.ERROR(f"Index '{index_name}' does not exist")
                )
                command = "FT.CREATE idx:product ON hash PREFIX 1 'product:' SCHEMA name TEXT SORTABLE price NUMERIC SORTABLE image TEXT NOSTEM"
                response = r.execute_command(command)
                return print("RedisCreateIndex: ", response)

            else:
                self.stderr.write(self.style.ERROR(f"Redis error: {str(e)}"))
