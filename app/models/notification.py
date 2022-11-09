from .db import db

class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    is_read = db.Column(db.Boolean, unique=False, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'channel_id': self.channel_id,
            'video_id': self.video_id,
            'user_id': self.user_id,
            'is_read': self.is_read
        }
