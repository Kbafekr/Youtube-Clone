from app.models import db, Channel


# Adds a demo user, you can add other users here if you want
def seed_channels():
    channel_1 = Channel(
        channel_name='DemoUserGaming', user_id='1',
        profile_picture="https://static.esea.net/global/images/users/1080122.1543427602.jpg",
        banner_picture='https://wallpaperaccess.com/full/1615368.jpg')
    channel_2 = Channel(
        channel_name='DemoUserStreaming', user_id='1',
        profile_picture="https://64.media.tumblr.com/06cb8dbb8be14d91777d2f9e16f6a407/012792e20c1bc675-b2/s500x750/565f42f875a135af7efbebc1f662071b11a64bda.jpg",
        banner_picture='https://img.freepik.com/premium-vector/dark-navy-blue-banner-background-vector-abstract-graphic-design-banner-pattern-background-template_181182-18817.jpg')
    channel_3 = Channel(
        channel_name='DemoUserGaming', user_id='2',
        profile_picture="https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Monkey.png",
        banner_picture='https://i.pinimg.com/736x/f2/40/67/f24067d46bbcf1669bf54900feb40092.jpg')
    channel_4 = Channel(
        channel_name='DemoUserGaming', user_id='3',
        profile_picture="https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Emo.png",
        banner_picture='https://i.ytimg.com/vi/g6klk13VlOI/maxresdefault.jpg')

    channels = [channel_1, channel_2, channel_3, channel_4]
    for channel in channels:
        db.session.add(channel)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
