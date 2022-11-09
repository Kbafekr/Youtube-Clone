from .db import db
from datetime import datetime


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    channel_name = db.Column(db.VARCHAR(30), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    profile_picture = db.Column(db.String, nullable=False)
    banner_picture = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    # relationships backref
    videos = db.relationship("Video", backref='channel', cascade="all, delete-orphan")
    tags = db.relationship("Tag", backref='channel', cascade="all, delete-orphan")
    subscribers = db.relationship("Subscriber", backref='channel', cascade="all, delete-orphan")
    notifications = db.relationship("Notification", backref='channel', cascade="all, delete-orphan")



    def to_dict(self):
        return {
            'id': self.id,
            'channel_name': self.channel_name,
            'user_id': self.user_id,
            'profile_picture': self.profile_picture,
            'banner_picture': self.banner_picture,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'videos': [video.to_dict() for video in self.videos],
            'tags': [tag.to_dict() for tag in self.tags],
            'subscribers': [subscriber.to_dict() for subscriber in self.subscribers],

        }
