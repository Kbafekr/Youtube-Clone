from datetime import datetime
from .db import db


class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.VARCHAR(50), nullable=False)

    playlist_video = db.relationship("PlaylistVideos", backref='playlists', cascade="all, delete-orphan")



    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'playlist_videos': [videos.to_dict() for videos in self.playlist_video],

            # timestamps
            'created_at': self.created_at,
            'updated_at': self.updated_at,

        }
