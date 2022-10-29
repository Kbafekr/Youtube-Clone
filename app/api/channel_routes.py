from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Channel, db
from app.forms.channel_form import ChannelForm


channel_routes = Blueprint('channels', __name__)

# Get All Channels
@channel_routes.route('/all')
@login_required
def all_Channels():
    all_channels = Channel.query.all()
    if all_channels == None:
        return "there are no channels"
    channels = {"channels": [channels.to_dict() for channels in all_channels]}
    return channels


# get channel by id
@channel_routes.route('/<int:id>')
@login_required
def get_channel(id):
     channel = Channel.query.get(id)
     if channel == None:
        return "channel is not available"
     return channel.to_dict()


# create new channel
@channel_routes.route("/new", methods=["POST"])
# @login_required
def create_channel():
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_channel = Channel(
            channel_name=data['channel_name'],
            user_id=data["user_id"],
            profile_picture=data["profile_picture"],
            banner_picture=data["banner_picture"]
        )
        db.session.add(new_channel)
        db.session.commit()
        return new_channel.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# edit channel
@channel_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_channel(id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        old_channel = Channel.query.get(id)
        data = form.data
        old_channel.channel_name = data["channel_name"]
        old_channel.user_id = data["user_id"]
        old_channel.profile_picture = data["profile_picture"]
        old_channel.banner_picture = data["banner_picture"]

        db.session.commit()

        return old_channel.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# delete channel
@channel_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_image(id):
    channel = Channel.query.get(id)
    db.session.delete(channel)
    db.session.commit()
    return {
    "Message": "Channel successfully deleted",
    "statusCode": "200"
    }
