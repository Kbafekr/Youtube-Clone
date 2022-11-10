from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import User, db, History
from app.forms import SignUpForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# edit user
@user_routes.route('/<int:id>/edit', methods=["PUT"])
# @login_required
def edit_user(id):
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        old_user = User.query.get(id)
        oldEmail = old_user.email
        # oldPassword = old_user.password
        data = form.data
        old_user.first_name = data["first_name"]
        old_user.last_name = data["last_name"]
        old_user.email = oldEmail
        old_user.active_channel = data["active_channel"]
        # old_user.password = oldPassword
        db.session.commit()
        # return form.data
        return old_user.to_dict()
    # return form.data
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401






# user watch history all

@user_routes.route('/<int:id>/history')
@login_required
def history(id):
    history = History.query.filter_by(user_id=id).all()
    if history == None:
        return {
            "Message": "Users have watched no videos",
            "statusCode": "200"
        }
    return {videoHistory.id: videoHistory.to_dict() for videoHistory in history}

# make new video in watch history, if video exists, delete and make again (rather than find and update).

@user_routes.route('/<int:id>/history/<int:video_id>/new', methods=["POST"])
@login_required
def videoHistory(id, video_id):

    history = History.query.filter_by(
        user_id=id, video_id=video_id).first()
    if history:
        db.session.delete(history)
        db.session.commit()
        new_history = History(
            user_id=id,
            video_id=video_id
        )
        db.session.add(new_history)
        db.session.commit()
        return new_history.to_dict()
    else:
         new_history = History(
            user_id=id,
            video_id=video_id
        )
    db.session.add(new_history)
    db.session.commit()
    return new_history.to_dict()


# delete video from history

@user_routes.route('/<int:id>/history/<int:video_id>/delete', methods=['DELETE'])
@login_required
def delete_history(id, video_id):

    history = History.query.filter_by(
        user_id=id, video_id=video_id).first()

    db.session.delete(history)
    db.session.commit()
    return {
        "Message": "Successfully removed video from history",
        "statusCode": "200"
    }
