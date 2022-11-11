from app.models import db, WatchLater

def seed_watch_later():
    watch_later_1 = WatchLater(user_id=1, video_id=4)
    watch_later_2 = WatchLater(user_id=1, video_id=5)
    watch_later_3 = WatchLater(user_id=1, video_id=9)
    watch_later_4 = WatchLater(user_id=1, video_id=13)
    watch_later_5 = WatchLater(user_id=1, video_id=20)
    watch_later_6 = WatchLater(user_id=1, video_id=7)
    watch_later_7 = WatchLater(user_id=1, video_id=3)
    watch_later_8 = WatchLater(user_id=1, video_id=12)
    watch_later_9 = WatchLater(user_id=1, video_id=11)
    watch_later_10 = WatchLater(user_id=1, video_id=10)
    # watch_later_11 = WatchLater(user_id=3, video_id=8)
    # watch_later_12 = WatchLater(user_id=3, video_id=9)
    # watch_later_13 = WatchLater(user_id=3, video_id=10)
    # watch_later_14 = WatchLater(user_id=3, video_id=11)
    # watch_later_15 = WatchLater(user_id=3, video_id=12)
    # watch_later_16 = WatchLater(user_id=3, video_id=13)
    # watch_later_17 = WatchLater(user_id=3, video_id=14)
    # watch_later_18 = WatchLater(user_id=3, video_id=15)
    # watch_later_19 = WatchLater(user_id=3, video_id=16)
    # watch_later_20 = WatchLater(user_id=3, video_id=17)
    # watch_later_21 = WatchLater(user_id=3, video_id=18)
    # watch_later_22 = WatchLater(user_id=3, video_id=19)
    # watch_later_23 = WatchLater(user_id=3, video_id=20)
    # watch_later_24 = WatchLater(user_id=2, video_id=4)
    # watch_later_25 = WatchLater(user_id=2, video_id=5)
    # watch_later_26 = WatchLater(user_id=2, video_id=6)
    # watch_later_27 = WatchLater(user_id=2, video_id=7)
    # watch_later_28 = WatchLater(user_id=2, video_id=8)
    # watch_later_29 = WatchLater(user_id=2, video_id=9)
    # watch_later_30 = WatchLater(user_id=2, video_id=10)
    # watch_later_31 = WatchLater(user_id=2, video_id=11)
    # watch_later_32 = WatchLater(user_id=2, video_id=12)
    # watch_later_33 = WatchLater(user_id=2, video_id=13)
    # watch_later_34 = WatchLater(user_id=2, video_id=14)
    # watch_later_35 = WatchLater(user_id=2, video_id=15)
    # watch_later_36 = WatchLater(user_id=2, video_id=16)
    # watch_later_37 = WatchLater(user_id=2, video_id=17)
    # watch_later_38 = WatchLater(user_id=2, video_id=18)
    # watch_later_39 = WatchLater(user_id=2, video_id=19)
    # watch_later_40 = WatchLater(user_id=2, video_id=20)




    WatchHistory = [watch_later_1, watch_later_2, watch_later_3, watch_later_4,watch_later_5,watch_later_6,watch_later_7,watch_later_8,watch_later_9 ,watch_later_10,
    # watch_later_11, watch_later_12, watch_later_13, watch_later_14,watch_later_15,watch_later_16,watch_later_17,watch_later_18,watch_later_19 ,watch_later_20,
    # watch_later_21, watch_later_22, watch_later_23, watch_later_24,watch_later_25,watch_later_26,watch_later_27,watch_later_28,watch_later_29 ,watch_later_30,
    # watch_later_31, watch_later_32, watch_later_33, watch_later_34,watch_later_35,watch_later_36,watch_later_37,watch_later_38,watch_later_39 ,watch_later_40,
    ]

    for watch_later in WatchHistory:
        db.session.add(watch_later)
        db.session.commit()


def undo_watch_later():
    db.session.execute('TRUNCATE watch_laters RESTART IDENTITY CASCADE;')
    db.session.commit()
