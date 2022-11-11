from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired


class PlaylistVideoForm(FlaskForm):
    playlist_id = IntegerField('playlist_id', validators=[DataRequired()])
    video_id = IntegerField('video_id', validators=[DataRequired()])
    submit = SubmitField("Submit")
