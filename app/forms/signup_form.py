from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

# def valid_image(form, field):
#     profile_picture = field.data
#     if profile_picture == None or not profile_picture.startswith("https://") or not profile_picture.startswith("http://"):
#         field.data = "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55737/grinning-face-with-big-eyes-emoji-clipart-xl.png"

class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    # profile_picture = StringField('profile_picture', validators=[valid_image])
    password = StringField('password', validators=[DataRequired()])
