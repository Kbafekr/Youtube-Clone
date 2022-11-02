from datetime import datetime
from .db import db


class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    title = db.Column(db.VARCHAR(200), nullable=False)
    description = db.Column(db.VARCHAR(1000))
    video_url = db.Column(db.String, nullable=False)

    comments = db.relationship("Comment", backref='video', cascade="all, delete-orphan")
    likes = db.relationship("Like", backref='video', cascade="all, delete-orphan")
    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'channel_id': self.channel_id,
            'title': self.title,
            'description': self.description,
            'video_url': self.video_url,
            # timestamps
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'comments': [comment.to_dict() for comment in self.comments],
            'likes': [like.to_dict() for like in self.likes],

        }
