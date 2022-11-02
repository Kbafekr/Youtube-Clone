import json
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Like, db

Likes_routes = Blueprint('likes', __name__)

# Get total Likes
@Likes_routes.route('/')
# @login_required
def allImageLikes():
    all_likes = Like.query.all()
    if all_likes == None:
        return "there are no likes"
    likes = {"likes": [like.to_dict() for like in all_likes]}
    return likes


# Get All Likes by image id (move to images routes)
# image/comments/imageid
@Likes_routes.route('/<int:id>/likes')
@login_required
def imageLikes(id):
    all_likes = Like.query.filter_by(imageId=id).all()
    if all_likes == None:
        return "image has no likes"
    likes = {like.id: like.to_dict() for like in all_likes}
    return likes



    # get all likes total
@Likes_routes.route('/likes/all')
# @login_required
def allLikes():
    all_likes = Like.query.all()
    likes = {like.id: like.to_dict() for like in all_likes}
    # likes = {"likes":  [like.to_dict() for like in all_likes]}

    return likes


# Make a new Like

@Likes_routes.route('/<int:id>/likes', methods=["POST"])
@login_required
def postLike(id):
    newLike = Like(
    userId=current_user.id,
    imageId=id,
    )
    db.session.add(newLike)
    db.session.commit()
    return newLike.to_dict()

# current user = user id

    # if current_user:
    #     newLike = Like(
    #     userId=current_user.id,
    #     imageId=id,
    #     )
    # db.session.add(newLike)
    # db.commit()
    # return like.to_dict()

#Delete a comment
# images/imageid/delete
@Likes_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_likes(id):
    likes = Like.query.get(id)
    db.session.delete(likes)
    db.session.commit()
    return {
    "Message": "like successfully deleted",
    "statusCode": "200"
    }
