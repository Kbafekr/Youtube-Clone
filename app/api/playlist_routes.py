from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Playlist, db, PlaylistVideos
from app.forms.playlist_form import PlaylistForm
from app.forms.playlistvideo_form import PlaylistVideoForm


playlist_routes = Blueprint('playlists', __name__)

# Get All playlists


# prefix is playlists
@playlist_routes.route('/all')
def all_playlist():
    all_playlist = Playlist.query.all()
    if all_playlist == None:
        return "there are no playlists"
    playlists = {"playlists": [playlist.to_dict()
                               for playlist in all_playlist]}
    return playlists


# get playlist by id
@playlist_routes.route('/<int:id>')
# @login_required
def get_playlist(id):
    playlist = Playlist.query.get(id)
    if playlist == None:
        return "playlist is not available"
    return playlist.to_dict()


# create new playlist
@playlist_routes.route("/new", methods=["POST"])
@login_required
def create_playlist():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_playlist = Playlist(
            user_id=data["user_id"],
            title=data['title'],
        )
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# edit playlist


@playlist_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_playlist(id):
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        old_playlist = Playlist.query.get(id)
        data = form.data
        old_playlist.user_id = data["user_id"]
        old_playlist.title = data["title"]

        db.session.commit()

        return old_playlist.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# delete playlist


@playlist_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_image(id):
    playlist = Playlist.query.get(id)
    db.session.delete(playlist)
    db.session.commit()
    return {
        "Message": "Playlist successfully deleted",
        "statusCode": "200"
    }

# add video to playlist

@playlist_routes.route('/<int:id>/<int:video_id>/new', methods=['GET', "POST"])
@login_required
def add_video_to_playlist(id, video_id):
    form = PlaylistVideoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_playlistVideo = PlaylistVideos(
            # playlist_id=data["playlist_id"],
            # video_id=data["video_id"],
            playlist_id=id,
            video_id=video_id,
        )
        db.session.add(new_playlistVideo)
        db.session.commit()
        return new_playlistVideo.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# remove video from playlist

@playlist_routes.route('/<int:id>/<int:playlistvideo_id>/delete', methods=['DELETE'])
@login_required
def delete_video_from_playlist(id, playlistvideo_id):
    playlistvideo = PlaylistVideos.query.get(playlistvideo_id)
    db.session.delete(playlistvideo)
    db.session.commit()
    return {
        "Message": "video successfully removed from playlist",
        "statusCode": "200"
    }
