from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Tag(db.Model):
    __tablename__ = 'tags'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("channels.id")), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("videos.id")), nullable=False)
    body = db.Column(db.VARCHAR(100))
    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'channel_id': self.channel_id,
            'video_id': self.video_id,
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
