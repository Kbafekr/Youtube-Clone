import json
from app.seeds import tags
from flask import Blueprint, jsonify, render_template, request
from flask_login import login_required, current_user
from app.models import Tag, db
from app.forms.tag_form import TagForm
from app.api.auth_routes import validation_errors_to_error_messages
Tags_routes = Blueprint('tags', __name__)

@Tags_routes.route('/all')
@login_required
def tagsRoute():
    all_tags = Tag.query.all()
    tags = {tag.id: tag.to_dict() for tag in all_tags}
    return tags

# specific comment by id
@Tags_routes.route('/<int:id>')
@login_required
def get_tag(id):
    tags = Tag.query.get(id)
    if tags == None:
        return "No tags found"
    return tags.to_dict()


