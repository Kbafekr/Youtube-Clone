from app.models import db, History

def seed_history():
    history_1 = History(user_id=1, video_id=1)
    history_2 = History(user_id=1, video_id=6)
    history_3 = History(user_id=1, video_id=3)
    history_4 = History(user_id=1, video_id=14)
    history_5 = History(user_id=1, video_id=12)
    history_6 = History(user_id=1, video_id=19)
    history_7 = History(user_id=1, video_id=4)
    history_8 = History(user_id=1, video_id=5)
    history_9 = History(user_id=1, video_id=9)
    history_10 = History(user_id=1, video_id=7)
    # history_11 = History(user_id=3, video_id=8)
    # history_12 = History(user_id=3, video_id=9)
    # history_13 = History(user_id=3, video_id=10)
    # history_14 = History(user_id=3, video_id=11)
    # history_15 = History(user_id=3, video_id=12)
    # history_16 = History(user_id=3, video_id=13)
    # history_17 = History(user_id=3, video_id=14)
    # history_18 = History(user_id=3, video_id=15)
    # history_19 = History(user_id=3, video_id=16)
    # history_20 = History(user_id=3, video_id=17)
    # history_21 = History(user_id=3, video_id=18)
    # history_22 = History(user_id=3, video_id=19)
    # history_23 = History(user_id=3, video_id=20)
    # history_24 = History(user_id=2, video_id=4)
    # history_25 = History(user_id=2, video_id=5)
    # history_26 = History(user_id=2, video_id=6)
    # history_27 = History(user_id=2, video_id=7)
    # history_28 = History(user_id=2, video_id=8)
    # history_29 = History(user_id=2, video_id=9)
    # history_30 = History(user_id=2, video_id=10)
    # history_31 = History(user_id=2, video_id=11)
    # history_32 = History(user_id=2, video_id=12)
    # history_33 = History(user_id=2, video_id=13)
    # history_34 = History(user_id=2, video_id=14)
    # history_35 = History(user_id=2, video_id=15)
    # history_36 = History(user_id=2, video_id=16)
    # history_37 = History(user_id=2, video_id=17)
    # history_38 = History(user_id=2, video_id=18)
    # history_39 = History(user_id=2, video_id=19)
    # history_40 = History(user_id=2, video_id=20)




    WatchHistory = [history_1, history_2, history_3, history_4,history_5,history_6,history_7,history_8,history_9 ,history_10,
    # history_11, history_12, history_13, history_14,history_15,history_16,history_17,history_18,history_19 ,history_20,
    # history_21, history_22, history_23, history_24,history_25,history_26,history_27,history_28,history_29 ,history_30,
    # history_31, history_32, history_33, history_34,history_35,history_36,history_37,history_38,history_39 ,history_40,
    ]

    for history in WatchHistory:
        db.session.add(history)
        db.session.commit()


def undo_history():
    db.session.execute('TRUNCATE historys RESTART IDENTITY CASCADE;')
    db.session.commit()
