from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('importar/', importar_patrimonios_view),
    path('patrimonios/', PatrimoniosView.as_view()),
    path('upload-xlsx/', UploadXLSXView.as_view(), name='upload-xlsx'),
    path('search/', PatrimoniosView.as_view()),
]
