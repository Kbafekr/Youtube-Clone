from .db import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.VARCHAR(25), nullable=False)
    last_name = db.Column(db.VARCHAR(25), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    active_channel = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    hashed_password = db.Column(db.String(255), nullable=False)

    # relationships backref
    channels = db.relationship("Channel", backref='user', cascade="all, delete-orphan")
    likes = db.relationship("Like", backref='user', cascade="all, delete-orphan")
    dislikes = db.relationship("Dislike", backref='user', cascade="all, delete-orphan")
    subscribers = db.relationship("Subscriber", backref='user', cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'active_channel': self.active_channel,
            'created_at': self.created_at,
            # channels
            'channels': [channel.to_dict() for channel in self.channels],
            'subscriptions': [subscription.to_dict() for subscription in self.subscribers],
            # videos
            # comments
            # likes
            # tags
            # subscribers
            # playlists
        }
