from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class TagForm(FlaskForm):
    channel_id = IntegerField("channel_id", validators=[DataRequired()])
    video_id = IntegerField("video_id", validators=[DataRequired()])
    body = StringField("body", validators=[DataRequired()])
    submit = SubmitField("Submit")
