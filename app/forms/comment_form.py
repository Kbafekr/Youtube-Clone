from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, BooleanField
from wtforms.validators import DataRequired

def is_replyBoolean(form, field):
    replyMessage = field.data
    if replyMessage == None:
        field.data = False


class CommentForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    video_id = IntegerField("video_id", validators=[DataRequired()])
    body = StringField("body", validators=[DataRequired()])
    is_reply = BooleanField('is_reply',  validators=[is_replyBoolean])
    commentReply_id = IntegerField('commentReply_id')
    submit = SubmitField("Submit")
