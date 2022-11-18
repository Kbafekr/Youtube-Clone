from datetime import datetime
from .db import db


class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    title = db.Column(db.VARCHAR(200), nullable=False)
    artist = db.Column(db.VARCHAR(200), nullable=False)
    song_url = db.Column(db.String, nullable=False)

    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'channel_id': self.channel_id,
            'title': self.title,
            'artist': self.artist,
            'song_url': self.song_url,
            # timestamps
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
