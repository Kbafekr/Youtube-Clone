from app.models import db, Like

def seed_likes():
    like_1 = Like(user_id=1, video_id=1)
    like_2 = Like(user_id=1, video_id=2)
    like_3 = Like(user_id=1, video_id=3)
    like_4 = Like(user_id=2, video_id=1)
    like_5 = Like(user_id=2, video_id=2)
    like_6 = Like(user_id=3, video_id=1)




    likes = [like_1, like_2, like_3, like_4,like_5,like_6]

    for like in likes:
        db.session.add(like)
        db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
