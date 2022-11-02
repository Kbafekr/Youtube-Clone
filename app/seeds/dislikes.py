from app.models import db, Dislike

def seed_dislikes():
    dislike_1 = Dislike(user_id=1, video_id=4)
    dislike_2 = Dislike(user_id=1, video_id=5)
    dislike_3 = Dislike(user_id=1, video_id=6)
    dislike_4 = Dislike(user_id=2, video_id=4)
    dislike_5 = Dislike(user_id=2, video_id=5)
    dislike_6 = Dislike(user_id=3, video_id=4)




    dislikes = [dislike_1, dislike_2, dislike_3, dislike_4,dislike_5,dislike_6]

    for dislike in dislikes:
        db.session.add(dislike)
        db.session.commit()


def undo_dislikes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
