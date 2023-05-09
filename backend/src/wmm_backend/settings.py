from environs import Env

env = Env()
env.read_env()

FRONTEND_URL = env.str("FRONTEND_URL", "http://localhost:3000")
CORS_ALLOWED_ORIGINS = [FRONTEND_URL]
