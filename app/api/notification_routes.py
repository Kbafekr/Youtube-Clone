from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Notification, db
from app.forms.notification_form import NotificationForm


notification_routes = Blueprint('channels', __name__)

# Get All notification
@notification_routes.route('/all')
def all_notifications():
    all_notifications = Notification.query.all()
    if all_notifications == None:
        return "there are no notifications"
    notifications = {"notifications": [notification.to_dict() for notification in all_notifications]}
    return notifications


# get notification by id
@notification_routes.route('/<int:id>')
# @login_required
def get_notification(id):
     notification = Notification.query.get(id)
     if notification == None:
        return "notification is not available"
     return notification.to_dict()


#get notifications by userId
@notification_routes.route('/users/<int:user_id>/all')
# @login_required
def userNotifications(user_id):
    user_notifications = Notification.query.filter_by(user_id=user_id).all()
    if user_notifications == None:
        return {
            "Message": "user has no notifications",
            "statusCode": "200"
        }
    all_notifications = {notification.id: notification.to_dict() for notification in user_notifications}
    return all_notifications



# create new notification
@notification_routes.route("/new", methods=["POST"])
@login_required
def create_notification():
    form = NotificationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_notification = Notification(
            channel_id=data['channel_id'],
            video_id=data["video_id"],
            user_id=data["user_id"],
            is_read=data["is_read"]
        )
        db.session.add(new_notification)
        db.session.commit()
        return new_notification.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# edit notification
@notification_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_notification(id):
    form = NotificationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        old_notification = Notification.query.get(id)
        data = form.data
        old_notification.channel_id = data["channel_id"]
        old_notification.video_id = data["video_id"]
        old_notification.user_id = data["user_id"]
        old_notification.is_read = data["is_read"]

        db.session.commit()

        return old_notification.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# delete notification
@notification_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_notification(id):
    notification = Notification.query.get(id)
    db.session.delete(notification)
    db.session.commit()
    return {
    "Message": "notification successfully deleted",
    "statusCode": "200"
    }
