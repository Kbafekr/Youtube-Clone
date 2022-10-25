from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from random import random

profile_picture_list=['https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Monkey.png', 'https://static.esea.net/global/images/users/1080122.1543427602.jpg',
'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Pandemic.jpg', 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Emo.png',
'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Anime.png', 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Waves.png',
'https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png', 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Pirate.png',
'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Blue-Face-Man.png', 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Dragon.jpg',
'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Football.png', 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Dog.jpg']

banner_picture_list=['https://i.pinimg.com/736x/f2/40/67/f24067d46bbcf1669bf54900feb40092.jpg', 'https://i.ytimg.com/vi/g6klk13VlOI/maxresdefault.jpg',
'https://img.freepik.com/premium-vector/dark-navy-blue-banner-background-vector-abstract-graphic-design-banner-pattern-background-template_181182-18817.jpg',
'https://wallpaperaccess.com/full/1615368.jpg', 'https://images.wallpapersden.com/image/download/showtime-retro_a2pma2aUmZqaraWkpJRnamtlrWZpaWU.jpg',
'https://i.pinimg.com/originals/e6/2a/f8/e62af892f9bfca7b5f272755344d7200.jpg', 'https://i.pinimg.com/originals/92/65/f5/9265f589431af2690cf412e525b7cae4.jpg',
'https://ak6.picdn.net/shutterstock/videos/4477016/thumb/1.jpg' ]

def valid_profile_picture(form, field):
    profile_picture = field.data
    if profile_picture == None or not profile_picture.startswith("https://") or not profile_picture.startswith("http://"):
        field.data = random.choice(profile_picture_list)
def valid_banner_picture(form, field):
    banner_picture = field.data
    if banner_picture == None or not banner_picture.startswith("https://") or not banner_picture.startswith("http://"):
        field.data = random.choice(profile_picture_list)

class ChannelForm(FlaskForm):
    channel_name = StringField(
        'channel_name', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    profile_picture = StringField('profile_picture', validators=[valid_profile_picture])
    banner_picture = StringField('banner_picture', validators=[valid_banner_picture])
    submit = SubmitField('Submit')
