from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status


# Create your views here.
class ShopCategoryView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, category, format=None):
        try:
            if (
                category == "new & featured"
                or category == "men"
                or category == "women"
                or category == "kids"
                or category == "sale"
            ):
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

        