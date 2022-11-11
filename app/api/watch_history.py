from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, History

watch_history_routes = Blueprint('history', __name__)


# user watch history all
# prefix is watchhistory
@watch_history_routes.route('/<int:user_id>/history')
@login_required
def history(user_id):
    history = History.query.filter_by(user_id=user_id).all()
    if history == None:
        return {
            "Message": "User has watched no videos",
            "statusCode": "200"
        }
    return {videoHistory.id: videoHistory.to_dict() for videoHistory in history}

# make new video in watch history, if video exists, delete and make again (rather than find and update).


@watch_history_routes.route('/<int:user_id>/history/<int:video_id>/new', methods=["POST"])
@login_required
def videoHistory(user_id, video_id):

    history = History.query.filter_by(
        user_id=user_id, video_id=video_id).first()
    if history:
        db.session.delete(history)
        db.session.commit()
        new_history = History(
            user_id=user_id,
            video_id=video_id
        )
        db.session.add(new_history)
        db.session.commit()
        return new_history.to_dict()
    else:
        new_history = History(
            user_id=user_id,
            video_id=video_id
        )
    db.session.add(new_history)
    db.session.commit()
    return new_history.to_dict()


# delete video from history

@watch_history_routes.route('/<int:user_id>/history/<int:video_id>/delete', methods=['DELETE'])
@login_required
def delete_history(user_id, video_id):

    history = History.query.filter_by(
        user_id=user_id, video_id=video_id).first()

    db.session.delete(history)
    db.session.commit()
    return {
        "Message": "Successfully removed video from history",
        "statusCode": "200"
    }
