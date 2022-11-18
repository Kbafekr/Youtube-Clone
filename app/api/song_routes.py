from flask import Blueprint, jsonify, redirect, render_template, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

from app.models import db, Song

song_routes = Blueprint('songs', __name__)

# form['csrf_token'].data = request.cookies['csrf_token']

# prefix = songs
@song_routes.route('/all')
# @login_required
def AllVids():
    all_songs = Song.query.all()
    songs = {"songs": [song.to_dict() for song in all_songs]}
    return songs


@song_routes.route('/<int:id>')
# @login_required
def get_video(id):
    song = Song.query.get(id)
    if song == None:
        return "Video is not available"
    return song.to_dict()
