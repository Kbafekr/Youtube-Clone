import json
import json
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Subscriber, db

subscriber_routes = Blueprint('subscribers', __name__)

# Get total Subscribers
@subscriber_routes.route('/all')
# @login_required
def allSubscribers():
    all_subscribers = Subscriber.query.all()
    if all_subscribers == None:
        return "there are no subscribers"
    subscribers = {"subscribers": [subscribers.to_dict() for subscribers in all_subscribers]}
    return subscribers



# Get All subscribers by channel id
# video/comments/videoId
@subscriber_routes.route('/<int:channel_id>/all')
# @login_required
def channelSubscribers(channel_id):
    channel_subscribers = Subscriber.query.filter_by(channel_id=channel_id).all()
    if channel_subscribers == None:
        return {
            "Message": "Channel has no subscribers",
            "statusCode": "200"
        }
    allSubscribers = {subscribers.id: subscribers.to_dict() for subscribers in channel_subscribers}
    return allSubscribers



# Make a new subscriber

@subscriber_routes.route('/<int:channel_id>/new', methods=["POST"])
@login_required
def postSubscriber(channel_id):

    subscriberNew = Subscriber.query.filter_by(
        channel_id=channel_id, user_id=current_user.id).first()
    if subscriberNew:
        db.session.delete(subscriberNew)
        db.session.commit()
        return subscriberNew.to_dict()
    else:
        new_subscriber = Subscriber(
            channel_id=channel_id,
            user_id=current_user.id
        )
    db.session.add(new_subscriber)
    db.session.commit()
    return new_subscriber.to_dict()



# Delete a subscriber


@subscriber_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_likes(id):
    subscriber = Subscriber.query.get(id)
    db.session.delete(subscriber)
    db.session.commit()
    return {
        "Message": "Successfully removed subscriber",
        "statusCode": "200"
    }
