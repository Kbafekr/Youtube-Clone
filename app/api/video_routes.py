from flask import Blueprint, jsonify, redirect, render_template, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages


from app.forms.video_form import VideoForm
from app.forms.comment_form import CommentForm
from app.forms.tag_form import TagForm
from app.models import Comment, Video, db, Tag, Like, Dislike

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
@login_required
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
        "Message": "comment successfully deleted",
        "statusCode": "200"
    }


# likes


# Get All Likes by video id (move to images routes)
# video/comments/videoId
@video_routes.route('/<int:videoId>/likes')
@login_required
def videoLikes(videoId):
    all_likes = Like.query.filter_by(video_id=videoId).all()
    if all_likes == None:
        return {
            "Message": "Video has no likes",
            "statusCode": "200"
        }
    likes = {like.id: like.to_dict() for like in all_likes}
    return likes

# Make a new Like


@video_routes.route('/<int:videoId>/likes/new', methods=["POST"])
@login_required
def postLike(videoId):

    like = Like.query.filter_by(
        video_id=videoId, user_id=current_user.id).first()
    if like:
        db.session.delete(like)
        db.session.commit()
        return like.to_dict()
    else:
        new_like = Like(
            user_id=current_user.id,
            video_id=videoId
        )
    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()

# Delete a like


@video_routes.route('/<int:videoId>/likes/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_likes(videoId, id):
    likes = Like.query.get(id)

    # likes = Like.query.get(id)
    db.session.delete(likes)
    db.session.commit()
    return {
        "Message": "Successfully removed like",
        "statusCode": "200"
    }


# dislikes


# Get All dislikes
# video/comments/videoId
@video_routes.route('/dislikes/all')
@login_required
def allDislikes():
    all_dislikes = Dislike.query.all()
    if all_dislikes == None:
        return {
            "Message": "No dislikes",
            "statusCode": "200"
        }
    dislikes = {"dislikes": [dislike.to_dict() for dislike in all_dislikes]}
    return dislikes

# Get All dislikes by video id (move to images routes)
# video/comments/videoId


@video_routes.route('/<int:videoId>/dislikes')
@login_required
def videoDislikes(videoId):
    all_dislikes = Dislike.query.filter_by(video_id=videoId).all()
    if all_dislikes == None:
        return {
            "Message": "Video has no dislikes",
            "statusCode": "200"
        }
    dislikes = {dislike.id: dislike.to_dict() for dislike in all_dislikes}
    return dislikes

# Make a new disLike


@video_routes.route('/<int:videoId>/dislikes/new', methods=["POST"])
@login_required
def postDislike(videoId):

    dislike = Dislike.query.filter_by(
        video_id=videoId, user_id=current_user.id).first()
    if dislike:
        db.session.delete(dislike)
        db.session.commit()
        return dislike.to_dict()
    else:
        new_dislike = Dislike(
            user_id=current_user.id,
            video_id=videoId
        )
    db.session.add(new_dislike)
    db.session.commit()
    return new_dislike.to_dict()

# Delete a dislike


@video_routes.route('/<int:videoId>/dislikes/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_dislikes(videoId, id):
    dislikes = Dislike.query.get(id)

    # likes = Like.query.get(id)
    db.session.delete(dislikes)
    db.session.commit()
    return {
        "Message": "Successfully removed dislike",
        "statusCode": "200"
    }


# tags


# all tags by videoId
@video_routes.route('/<int:videoId>/tag', methods=["GET"])
@login_required
def get_tagsbyVideo(videoId):
    tags = Tag.query.filter_by(video_id=videoId).all()
    if tags == None:
        return {
            "Message": "Video has no tags",
            "statusCode": "200"
        }
    return {tag.id: tag.to_dict() for tag in tags}

# Post a tag


@video_routes.route('/<int:videoId>/tag/new', methods=['POST'])
@login_required
def new_Tag(videoId):
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_tag = Tag(
            channel_id=data['channel_id'],
            video_id=data['video_id'],
            body=data['body'],
        )
        db.session.add(new_tag)
        db.session.commit()
        return new_tag.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Edit a tag


@video_routes.route('/<int:videoId>/tag/<int:id>/edit', methods=['GET', 'PUT'])
@login_required
def edit_Tag(videoId, id):
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedTag = Tag.query.get(id)
        data = form.data
        editedTag.channel_id = data['channel_id']
        editedTag.video_id = data['video_id']
        editedTag.body = data['body']
        db.session.commit()
        return editedTag.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Delete a tag


@video_routes.route('/<int:videoId>/tag/<int:id>/delete', methods=['GET', 'DELETE'])
@login_required
def delete_Tag(videoId, id):
    tag = Tag.query.get(id)
    db.session.delete(tag)
    db.session.commit()
    return {
        "Message": "Tag successfully deleted",
        "statusCode": "200"
    }
