from app.models import db, Like

def seed_likes():
    like_1 = Like(user_id=1, video_id=1)
    like_2 = Like(user_id=1, video_id=2)
    like_3 = Like(user_id=1, video_id=3)
    like_4 = Like(user_id=2, video_id=1)
    like_5 = Like(user_id=2, video_id=2)
    like_6 = Like(user_id=3, video_id=1)
    like_7 = Like(user_id=3, video_id=4)
    like_8 = Like(user_id=3, video_id=5)
    like_9 = Like(user_id=3, video_id=6)
    like_10 = Like(user_id=3, video_id=7)
    like_11 = Like(user_id=3, video_id=8)
    like_12 = Like(user_id=3, video_id=9)
    like_13 = Like(user_id=3, video_id=10)
    like_14 = Like(user_id=3, video_id=11)
    like_15 = Like(user_id=3, video_id=12)
    like_16 = Like(user_id=3, video_id=13)
    like_17 = Like(user_id=3, video_id=14)
    like_18 = Like(user_id=3, video_id=15)
    like_19 = Like(user_id=3, video_id=16)
    like_20 = Like(user_id=3, video_id=17)
    like_21 = Like(user_id=3, video_id=18)
    like_22 = Like(user_id=3, video_id=19)
    like_23 = Like(user_id=3, video_id=20)
    like_24 = Like(user_id=2, video_id=4)
    like_25 = Like(user_id=2, video_id=5)
    like_26 = Like(user_id=2, video_id=6)
    like_27 = Like(user_id=2, video_id=7)
    like_28 = Like(user_id=2, video_id=8)
    like_29 = Like(user_id=2, video_id=9)
    like_30 = Like(user_id=2, video_id=10)
    like_31 = Like(user_id=2, video_id=11)
    like_32 = Like(user_id=2, video_id=12)
    like_33 = Like(user_id=2, video_id=13)
    like_34 = Like(user_id=2, video_id=14)
    like_35 = Like(user_id=2, video_id=15)
    like_36 = Like(user_id=2, video_id=16)
    like_37 = Like(user_id=2, video_id=17)
    like_38 = Like(user_id=2, video_id=18)
    like_39 = Like(user_id=2, video_id=19)
    like_40 = Like(user_id=2, video_id=20)




    likes = [like_1, like_2, like_3, like_4,like_5,like_6,like_7,like_8,like_9 ,like_10,
    like_11, like_12, like_13, like_14,like_15,like_16,like_17,like_18,like_19 ,like_20,
    like_21, like_22, like_23, like_24,like_25,like_26,like_27,like_28,like_29 ,like_30,
    like_31, like_32, like_33, like_34,like_35,like_36,like_37,like_38,like_39 ,like_40,
    ]

    for like in likes:
        db.session.add(like)
        db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
