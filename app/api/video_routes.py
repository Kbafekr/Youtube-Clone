from flask import Blueprint, jsonify, redirect, render_template, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages


from app.forms.video_form import VideoForm
from app.forms.comment_form import CommentForm
from app.models import Comment, Video, db

from app.api.aws_routes import (
    upload_file_to_s3, allowed_file, get_unique_filename)

video_routes = Blueprint('videos', __name__)

# form['csrf_token'].data = request.cookies['csrf_token']


@video_routes.route('/all')
# @login_required
def AllVids():
    all_videos = Video.query.all()
    videos = {"videos": [video.to_dict() for video in all_videos]}
    return videos


@video_routes.route('/<int:id>')
# @login_required
def get_video(id):
    video = Video.query.get(id)
    if video == None:
        return "Video is not available"
    return video.to_dict()


# using aws
@video_routes.route("/upload", methods=["POST"])
@login_required
def create_data():

    if "video_url" not in request.files:
        return {"errors": "video_url required"}, 400

    video_url = request.files["video_url"]

    if not allowed_file(video_url.filename):
        return {"errors": "file type not permitted"}, 400

    video_url.filename = get_unique_filename(video_url.filename)
    # match frontend name
    upload = upload_file_to_s3(video_url)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    aws_video_url = upload["url"]
    # flask_login allows us to get the current user from the request
    form = VideoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_video = Video(
            channel_id=data["channel_id"],
            title=data["title"],
            description=data["description"],
            video_url=aws_video_url
        )
        db.session.add(new_video)
        db.session.commit()
        return new_video.to_dict()
    if form.errors:
        # return form.data
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@video_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_Video(id):
    form = VideoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        old_video = Video.query.get(id)
        data = form.data
        old_video.channel_id = data["channel_id"]
        old_video.title = data["title"]
        old_video.description = data["description"]
        old_video.video_url = data["video_url"]

        db.session.commit()

        return old_video.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@video_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_video(id):
    video = Video.query.get(id)
    db.session.delete(video)
    db.session.commit()
    return {
        "Message": "Video successfully deleted",
        "statusCode": "200"
    }


# comments


# all Comments by videoId
@video_routes.route('/<int:videoId>/comments', methods=["GET"])
# @login_required
def get_comment_by_video(videoId):
    comments = Comment.query.filter_by(video_id=videoId).all()
    if comments == None:
        return {
        "Message": "Video has no comments",
        "statusCode": "200"
    }
    return {comment.id: comment.to_dict() for comment in comments}

# Post a comment


@video_routes.route('/<int:videoId>/comment/new', methods=['POST'])
# @login_required
def new_Comment(videoId):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_comment = Comment(
            user_id=data['user_id'],
            video_id=data['video_id'],
            body=data['body'],
            is_reply=data['is_reply'],
            commentReply_id=data['commentReply_id'],
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Edit a comment
@video_routes.route('/<int:videoId>/comment/<int:id>/edit', methods=['GET', 'PUT'])
@login_required
def edit_Comment(videoId, id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedComment = Comment.query.get(id)
        data = form.data
        editedComment.user_id = data['user_id']
        editedComment.video_id = data['video_id']
        editedComment.body = data['body']
        editedComment.is_reply = data['is_reply'],
        editedComment.commentReply_id = data['commentReply_id'],
        db.session.commit()
        return editedComment.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Delete a comment


@video_routes.route('/<int:videoId>/comment/<int:id>/delete', methods=['GET', 'DELETE'])
@login_required
def delete_comment(videoId, id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {
        "Message": "like successfully deleted",
        "statusCode": "200"
    }
