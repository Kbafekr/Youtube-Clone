from app.models import db, Comment
from app.models.db import environment, SCHEMA
# Adds a demo user, you can add other users here if you want
def seed_comments():

    comment_1 = Comment(user_id=1, video_id=1, body="Wow so cool",)
    comment_2 = Comment(user_id=2, video_id=1, body="no its really not", is_reply=True, commentReply_id=1)
    comment_3 = Comment(user_id=2, video_id=1, body="Can't wait",)
    comment_4 = Comment(user_id=3, video_id=1, body="looks like trash", is_reply=True, commentReply_id=3)
    comment_5 = Comment(user_id=3, video_id=1, body="Kang > Thanos",)
    comment_6 = Comment(user_id=3, video_id=1, body="^^^this", is_reply=True, commentReply_id=5)
    comment_7 = Comment(user_id=3, video_id=1, body='''Problem: the paragraph has no topic sentence
Imagine each paragraph as a sandwich. The real content of the sandwich—the …
Problem: the paragraph has more than one controlling idea''',)
    # comment_2 = Comment(userId=2, imageId=1, body="I am the master of my universe")
    # comment_3 = Comment(userId=1, imageId=1, body="Making this my wallpaper now")
    # comment_4 = Comment(userId=3, imageId=1, body="Amazing Photo")
    # comment_5 = Comment(userId=4, imageId=2, body="Taking this for my own")
    # comment_6 = Comment(userId=2, imageId=2, body="This photo inspired me")
    # comment_7 = Comment(userId=1, imageId=2, body="Where has this been all my life")
    # comment_8 = Comment(userId=2, imageId=2, body="Woah~~~~~")
    # comment_9 = Comment(userId=3, imageId=3, body="Insane picture! ")
    # comment_10 = Comment(userId=4, imageId=3, body="Making this my wallpaper now")
    # comment_11 = Comment(userId=2, imageId=3, body="Hello World")
    # comment_12 = Comment(userId=1, imageId=4, body="WOWOWOWOWOWOW")
    # comment_13 = Comment(userId=3, imageId=5, body="Cant believe i found this again!")
    # comment_14 = Comment(userId=4, imageId=5, body="This was a horrible pic!")
    # comment_15 = Comment(userId=3, imageId=6, body="This made me so depressed")
    # comment_16 = Comment(userId=2, imageId=7, body="This made me so happy")
    # comment_17 = Comment(userId=1, imageId=5, body="I started rethinking about my marriage")
    # comment_18 = Comment(userId=4, imageId=4, body="What about that! ")
    # comment_19 = Comment(userId=2, imageId=8, body="I'm a bot")
    # comment_20 = Comment(userId=1, imageId=2, body="Win Free Money Click Here Now!!!")
    # comment_21 = Comment(userId=6, imageId=3, body="Awesome Photo")
    # comment_22 = Comment(userId=7, imageId=3, body="Where?")
    # comment_23 = Comment(userId=8, imageId=4, body="Anya")
    # comment_24 = Comment(userId=9, imageId=5, body="fake?")
    # comment_25 = Comment(userId=10, imageId=5, body="bark")
    # comment_26 = Comment(userId=11, imageId=6, body="Zzzzzzzzz")
    # comment_27 = Comment(userId=12, imageId=7, body="boring")
    # comment_28 = Comment(userId=13, imageId=5, body="coooool")
    # comment_29 = Comment(userId=14, imageId=4, body="impressive")
    # comment_30 = Comment(userId=13, imageId=8, body="I'm a bot")

    comments = [comment_1, comment_2, comment_3, comment_4, comment_5, comment_6, comment_7]
    # comments = [comment_1, comment_2, comment_3, comment_4,comment_5,comment_6,comment_7,comment_8,comment_9,comment_10,comment_11,comment_12,comment_13,comment_14,comment_15,comment_16,comment_17,comment_18,comment_19,comment_20, comment_21, comment_22, comment_23, comment_24,comment_25,comment_26,comment_27,comment_28,comment_29,comment_30]

    for comment in comments:
        db.session.add(comment)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
