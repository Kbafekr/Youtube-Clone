from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired


class VideoForm(FlaskForm):
    channel_id = IntegerField("channel_id", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    description=TextAreaField("description", validators=[DataRequired()])
    video_url = StringField("video_url", validators=[DataRequired()])
    submit = SubmitField("Submit")
