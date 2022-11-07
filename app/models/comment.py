from datetime import datetime

from app.models import user
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("videos.id")), nullable=False)
    body = db.Column(db.VARCHAR(500))
    is_reply = db.Column(db.Boolean, unique=False, default=False)
    commentReply_id = db.Column(db.Integer, nullable=True)

    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.user_id,
            'body': self.body,
            'is_reply': self.is_reply,
            'commentReply_id': self.commentReply_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
