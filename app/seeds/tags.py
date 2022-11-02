from app.models import db, Tag

# Adds a demo user, you can add other users here if you want
def seed_tags():

    tag_1 = Tag(channel_id=1, video_id=1, body="Marvel")
    tag_2 = Tag(channel_id=1, video_id=1, body="SuperHero")
    tag_3 = Tag(channel_id=1, video_id=1, body="Ant-man")
    tag_4 = Tag(channel_id=1, video_id=1, body="Heist")

    tags = [tag_1, tag_2, tag_3, tag_4]

    for tag in tags:
        db.session.add(tag)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tags():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
