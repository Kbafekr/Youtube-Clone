from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, BooleanField
from wtforms.validators import DataRequired

def is_readBoolean(form, field):
    is_read = field.data
    if is_read == None:
        field.data = False

class NotificationForm(FlaskForm):
    channel_id = IntegerField("channel_id", validators=[DataRequired()])
    # video_id = IntegerField("video_id", validators=[DataRequired()])
    video_id = IntegerField("video_id")
    user_id = IntegerField("user_id", validators=[DataRequired()])
    is_read = BooleanField('is_read',  validators=[is_readBoolean])
    submit = SubmitField("Submit")
