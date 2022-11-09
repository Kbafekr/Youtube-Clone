from app.models import db, Notification

# Adds a demo user, you can add other users here if you want
def seed_notifications():

    notification_1 = Notification(channel_id=7, video_id=20, user_id=1, is_read=False)
    notification_2 = Notification(channel_id=9, video_id=15, user_id=1, is_read=False)
    notification_3 = Notification(channel_id=12, video_id=6, user_id=1, is_read=True)
    notification_4 = Notification(channel_id=13, video_id=18,user_id=1, is_read=False)
    notification_5 = Notification(channel_id=15, video_id=1, user_id=1, is_read=False)

    notification_6 = Notification(channel_id=15, video_id=7, user_id=1, is_read=True)
    notification_7 = Notification(channel_id=16, video_id=17, user_id=1, is_read=True)
    notification_8 = Notification(channel_id=17, video_id=16, user_id=1, is_read=True)
    notification_9 = Notification(channel_id=19, video_id=12, user_id=1, is_read=False)
    notification_10 = Notification(channel_id=20, video_id=11, user_id=1, is_read=True)

    # notification_11 = Notification(channel_id=3, video_id=3, body="Anime")
    # notification_12 = Notification(channel_id=3, video_id=3, body="Japan")
    # notification_13 = Notification(channel_id=3, video_id=3, body="Animator")
    # notification_14 = Notification(channel_id=3, video_id=3, body="Education")
    # notification_15 = Notification(channel_id=3, video_id=3, body="Learning")

    # notification_16 = Notification(channel_id=2, video_id=4, body="Nirvana")
    # notification_17 = Notification(channel_id=2, video_id=4, body="Grunge")
    # notification_18 = Notification(channel_id=2, video_id=4, body="Rock")
    # notification_19 = Notification(channel_id=2, video_id=4, body="Remix")
    # notification_20 = Notification(channel_id=2, video_id=4, body="Music")

    # notification_21 = Notification(channel_id=10, video_id=5, body="Interview")
    # notification_22 = Notification(channel_id=10, video_id=5, body="Acting")
    # notification_23 = Notification(channel_id=10, video_id=5, body="Fashion")
    # notification_24 = Notification(channel_id=10, video_id=5, body="Actors")
    # notification_25 = Notification(channel_id=10, video_id=5, body="Movies")

    # notification_26 = Notification(channel_id=12, video_id=6, body="Programming")
    # notification_27 = Notification(channel_id=12, video_id=6, body="Learning")
    # notification_28 = Notification(channel_id=12, video_id=6, body="Education")
    # notification_29 = Notification(channel_id=12, video_id=6, body="Coding")
    # notification_30 = Notification(channel_id=12, video_id=6, body="Software")

    # notification_31 = Notification(channel_id=15, video_id=7, body="Action")
    # notification_32 = Notification(channel_id=15, video_id=7, body="Movies")
    # notification_33 = Notification(channel_id=15, video_id=7, body="Trailer")
    # notification_34 = Notification(channel_id=15, video_id=7, body="Superheroes")
    # notification_35 = Notification(channel_id=15, video_id=7, body="Marvel")

    # notification_36 = Notification(channel_id=1, video_id=8, body="Succession")
    # notification_37 = Notification(channel_id=1, video_id=8, body="Show")
    # notification_38 = Notification(channel_id=1, video_id=8, body="Scene")
    # notification_39 = Notification(channel_id=1, video_id=8, body="Drama")
    # notification_40 = Notification(channel_id=1, video_id=8, body="HBO")

    # notification_41 = Notification(channel_id=11, video_id=9, body="Education")
    # notification_42 = Notification(channel_id=11, video_id=9, body="Learning")
    # notification_43 = Notification(channel_id=11, video_id=9, body="Health")
    # notification_44 = Notification(channel_id=11, video_id=9, body="Habits")
    # notification_45 = Notification(channel_id=11, video_id=9, body="Stress")

    # notification_46 = Notification(channel_id=2, video_id=10, body="Cartoon")
    # notification_47 = Notification(channel_id=2, video_id=10, body="Show")
    # notification_48 = Notification(channel_id=2, video_id=10, body="Analysis")
    # notification_49 = Notification(channel_id=2, video_id=10, body="Podcasts")
    # notification_50 = Notification(channel_id=2, video_id=10, body="Comedy")


    # notification_51 = Notification(channel_id=20, video_id=11, body="Nirvana")
    # notification_52 = Notification(channel_id=20, video_id=11, body="Electronic")
    # notification_53 = Notification(channel_id=20, video_id=11, body="Rock")
    # notification_54 = Notification(channel_id=20, video_id=11, body="Remix")
    # notification_55 = Notification(channel_id=20, video_id=11, body="Music")

    # notification_56 = Notification(channel_id=19, video_id=12, body="Electronic")
    # notification_57 = Notification(channel_id=19, video_id=12, body="Anime")
    # notification_58 = Notification(channel_id=19, video_id=12, body="Music")
    # notification_59 = Notification(channel_id=19, video_id=12, body="Dubstep")
    # notification_60 = Notification(channel_id=19, video_id=12, body="Animated")

    # notification_61 = Notification(channel_id=3, video_id=13, body="Sports")
    # notification_62 = Notification(channel_id=3, video_id=13, body="Soccer")
    # notification_63 = Notification(channel_id=3, video_id=13, body="Score")
    # notification_64 = Notification(channel_id=3, video_id=13, body="Game")
    # notification_65 = Notification(channel_id=3, video_id=13, body="UEFA")

    # notification_66 = Notification(channel_id=6, video_id=14, body="Podcasts")
    # notification_67 = Notification(channel_id=6, video_id=14, body="H3")
    # notification_68 = Notification(channel_id=6, video_id=14, body="News")
    # notification_69 = Notification(channel_id=6, video_id=14, body="Fashion")
    # notification_70 = Notification(channel_id=6, video_id=14, body="Entertainment")

    # notification_71 = Notification(channel_id=9, video_id=15, body="News")
    # notification_72 = Notification(channel_id=9, video_id=15, body="Politics")
    # notification_73 = Notification(channel_id=9, video_id=15, body="International")
    # notification_74 = Notification(channel_id=9, video_id=15, body="Germany")
    # notification_75 = Notification(channel_id=9, video_id=15, body="Diplomacy")

    # notification_76 = Notification(channel_id=17, video_id=16, body="Nature")
    # notification_77 = Notification(channel_id=17, video_id=16, body="Animals")
    # notification_78 = Notification(channel_id=17, video_id=16, body="Wolves")
    # notification_79 = Notification(channel_id=17, video_id=16, body="Wild")
    # notification_80 = Notification(channel_id=17, video_id=16, body="Education")

    # notification_81 = Notification(channel_id=16, video_id=17, body="Scene")
    # notification_82 = Notification(channel_id=16, video_id=17, body="Sports")
    # notification_83 = Notification(channel_id=16, video_id=17, body="Movies")
    # notification_84 = Notification(channel_id=16, video_id=17, body="Baseball")
    # notification_85 = Notification(channel_id=16, video_id=17, body="Acting")

    # notification_86 = Notification(channel_id=13, video_id=18, body="Tasty")
    # notification_87 = Notification(channel_id=13, video_id=18, body="Food")
    # notification_88 = Notification(channel_id=13, video_id=18, body="Recipe")
    # notification_89 = Notification(channel_id=13, video_id=18, body="Ramen")
    # notification_90 = Notification(channel_id=13, video_id=18, body="Yum")

    # notification_91 = Notification(channel_id=4, video_id=19, body="Scene")
    # notification_92 = Notification(channel_id=4, video_id=19, body="HBO")
    # notification_93 = Notification(channel_id=4, video_id=19, body="Drama")
    # notification_94 = Notification(channel_id=4, video_id=19, body="Show")
    # notification_95 = Notification(channel_id=4, video_id=19, body="TV")

    # notification_96 = Notification(channel_id=7, video_id=20, body="Gaming")
    # notification_97 = Notification(channel_id=7, video_id=20, body="COD")
    # notification_98 = Notification(channel_id=7, video_id=20, body="Walkthrough")
    # notification_99 = Notification(channel_id=7, video_id=20, body="Gameplay")
    # notification_100 = Notification(channel_id=7, video_id=20, body="Campaign")

    notifications = [notification_1, notification_2, notification_3, notification_4, notification_5, notification_6, notification_7, notification_8, notification_9, notification_10,
    # notification_11, notification_12, notification_13, notification_14, notification_15, notification_16, notification_17, notification_18, notification_19, notification_20,
    # notification_21, notification_22, notification_23, notification_24, notification_25, notification_26, notification_27, notification_28, notification_29, notification_30,
    # notification_31, notification_32, notification_33, notification_34, notification_35, notification_36, notification_37, notification_38, notification_39, notification_40,
    # notification_41, notification_42, notification_43, notification_44, notification_45, notification_46, notification_47, notification_48, notification_49, notification_50,
    # notification_51, notification_52, notification_53, notification_54, notification_55, notification_56, notification_57, notification_58, notification_59, notification_60,
    # notification_61, notification_62, notification_63, notification_64, notification_65, notification_66, notification_67, notification_68, notification_69, notification_70,
    # notification_71, notification_72, notification_73, notification_74, notification_75, notification_76, notification_77, notification_78, notification_79, notification_80,
    # notification_81, notification_82, notification_83, notification_84, notification_85, notification_86, notification_87, notification_88, notification_89, notification_90,
    # notification_91, notification_92, notification_93, notification_94, notification_95, notification_96, notification_97, notification_98, notification_99, notification_100
    #
    ]

    for notification in notifications:
        db.session.add(notification)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_notifications():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
