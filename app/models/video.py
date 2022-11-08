from datetime import datetime
from .db import db


class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    title = db.Column(db.VARCHAR(200), nullable=False)
    description = db.Column(db.VARCHAR(1000))
    video_url = db.Column(db.String, nullable=False)
    # video views
    video_views = db.Column(db.String, default="0")

    comments = db.relationship("Comment", backref='video', cascade="all, delete-orphan")
    tags = db.relationship("Tag", backref='video', cascade="all, delete-orphan")
    likes = db.relationship("Like", backref='video', cascade="all, delete-orphan")
    dislikes = db.relationship("Dislike", backref='video', cascade="all, delete-orphan")

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
            "video_views": self.video_views,
            # timestamps
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'comments': [comment.to_dict() for comment in self.comments],
            'tags': [tag.to_dict() for tag in self.tags],
            'likes': [like.to_dict() for like in self.likes],
            'dislikes': [dislike.to_dict() for dislike in self.dislikes]
        }
