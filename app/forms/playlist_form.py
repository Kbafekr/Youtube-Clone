from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired


class PlaylistForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    submit = SubmitField("Submit")
