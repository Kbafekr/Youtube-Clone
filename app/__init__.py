import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User, Channel
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.channel_routes import channel_routes
from .api.video_routes import video_routes
from .api.comment_routes import comment_routes
from .api.tags_routes import Tags_routes
from .api.likes_routes import Likes_routes
from .api.subscribers_routes import subscriber_routes
from .api.notification_routes import notification_routes
from .api.playlist_routes import playlist_routes
from .api.watch_history import watch_history_routes
from .api.watch_later import watch_later_routes
from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(channel_routes, url_prefix='/api/channels')
app.register_blueprint(video_routes, url_prefix='/api/videos')
app.register_blueprint(comment_routes, url_prefix='/api/comments')
app.register_blueprint(Tags_routes, url_prefix='/api/tags')
app.register_blueprint(Likes_routes, url_prefix='/api/likes')
app.register_blueprint(subscriber_routes, url_prefix='/api/subscribers')
app.register_blueprint(notification_routes, url_prefix='/api/notifications')
app.register_blueprint(playlist_routes, url_prefix='/api/playlists')
app.register_blueprint(watch_history_routes, url_prefix='/api/watchhistory')
app.register_blueprint(watch_later_routes, url_prefix='/api/watchlater')

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
