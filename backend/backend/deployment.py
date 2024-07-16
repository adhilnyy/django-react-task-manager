import os
from .settings import *
from .settings import BASE_DIR

ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']]
CSRF_TRUSTED_ORIGINS = ['https://'+os.environ['WEBSITE_HOSTNAME']]
DEBUG = False
SECRET_KEY = os.environ['MY_SECRET_KEY']

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhitenoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

# CORS_ORIGIN_WHITELIST = [
# ]

STORAGES = {
    {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}
}

CONNNECTION = os.environ['AZURE_POSTGRESQL_CONNECTIONSTRING']
CONNNECTION_STR = {pair.split('=')[0]:pair.split('=')[1] for pair in CONNNECTION.split(' ')}

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": CONNNECTION_STR['dbname'],
        "HOST": CONNNECTION_STR['host'],
        "USER": CONNNECTION_STR['user'],
        "PASSWORD": CONNNECTION_STR['password'],
    }
}

STATIC_ROOT = BASE_DIR/'staticfiles'