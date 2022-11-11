from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, WatchLater

watch_later_routes = Blueprint('watchlater', __name__)

# user watch later all
# prefix is watchlater
@watch_later_routes.route('/<int:user_id>/watchlater')
@login_required
def watchLater(user_id):
    watchLater = WatchLater.query.filter_by(user_id=user_id).all()
    if watchLater == None:
        return {
            "Message": "User has no videos in watch later playlist",
            "statusCode": "200"
        }
    return {watchlater.id: watchlater.to_dict() for watchlater in watchLater}

# make new video in watch history, if video exists, delete and make again (rather than find and update).

@watch_later_routes.route('/<int:user_id>/watchlater/<int:video_id>/new', methods=["POST"])
@login_required
def videoHistory(user_id, video_id):

    watchlater = WatchLater.query.filter_by(
        user_id=user_id, video_id=video_id).first()
    if watchlater:
        db.session.delete(watchlater)
        db.session.commit()
        return watchlater.to_dict()
    else:
        new_watchlater = WatchLater(
            user_id=user_id,
            video_id=video_id
        )
    db.session.add(new_watchlater)
    db.session.commit()
    return new_watchlater.to_dict()


# delete video from history

@watch_later_routes.route('/<int:user_id>/watchlater/<int:video_id>/delete', methods=['DELETE'])
@login_required
def delete_history(user_id, video_id):

    watchlater = WatchLater.query.filter_by(
        user_id=user_id, video_id=video_id).first()

    db.session.delete(watchlater)
    db.session.commit()
    return {
        "Message": "Successfully removed video from watch later playlist",
        "statusCode": "200"
    }
