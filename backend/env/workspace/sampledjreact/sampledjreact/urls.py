from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

# from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


router = DefaultRouter()

# router.register('userapi', views.UserProfileList, basename='studentm')
router.register('user', views.UserList, basename='studentm')


urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('auth/register/', views.UserRegister.as_view(), name="register"),
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('profile/update/<int:pk>/', views.UserProfileUpdate.as_view(), name='user_update'),
    path('profile/<int:pk>/', views.UserProfileList.as_view(), name='userprofile_listing'),
    # path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('auth/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # path('gettoken/', obtain_auth_token),

    # path('userapi', views.UserProfileList.as_view()),
]
