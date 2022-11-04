from app.models import db, Tag

# Adds a demo user, you can add other users here if you want
def seed_tags():

    tag_1 = Tag(channel_id=15, video_id=1, body="Marvel")
    tag_2 = Tag(channel_id=15, video_id=1, body="SuperHero")
    tag_3 = Tag(channel_id=15, video_id=1, body="Ant-man")
    tag_4 = Tag(channel_id=15, video_id=1, body="Heist")
    tag_5 = Tag(channel_id=15, video_id=1, body="Trailer")

    tag_6 = Tag(channel_id=1, video_id=2, body="Show")
    tag_7 = Tag(channel_id=1, video_id=2, body="Dragon")
    tag_8 = Tag(channel_id=1, video_id=2, body="Drama")
    tag_9 = Tag(channel_id=1, video_id=2, body="Scene")
    tag_10 = Tag(channel_id=1, video_id=2, body="HBO")

    tag_11 = Tag(channel_id=3, video_id=3, body="Anime")
    tag_12 = Tag(channel_id=3, video_id=3, body="Japan")
    tag_13 = Tag(channel_id=3, video_id=3, body="Animator")
    tag_14 = Tag(channel_id=3, video_id=3, body="Education")
    tag_15 = Tag(channel_id=3, video_id=3, body="Learning")

    tag_16 = Tag(channel_id=2, video_id=4, body="Nirvana")
    tag_17 = Tag(channel_id=2, video_id=4, body="Grunge")
    tag_18 = Tag(channel_id=2, video_id=4, body="Rock")
    tag_19 = Tag(channel_id=2, video_id=4, body="Remix")
    tag_20 = Tag(channel_id=2, video_id=4, body="Music")

    tag_21 = Tag(channel_id=10, video_id=5, body="Interview")
    tag_22 = Tag(channel_id=10, video_id=5, body="Acting")
    tag_23 = Tag(channel_id=10, video_id=5, body="Fashion")
    tag_24 = Tag(channel_id=10, video_id=5, body="Actors")
    tag_25 = Tag(channel_id=10, video_id=5, body="Movies")

    tag_26 = Tag(channel_id=12, video_id=6, body="Programming")
    tag_27 = Tag(channel_id=12, video_id=6, body="Learning")
    tag_28 = Tag(channel_id=12, video_id=6, body="Education")
    tag_29 = Tag(channel_id=12, video_id=6, body="Coding")
    tag_30 = Tag(channel_id=12, video_id=6, body="Software")

    tag_31 = Tag(channel_id=15, video_id=7, body="Action")
    tag_32 = Tag(channel_id=15, video_id=7, body="Movies")
    tag_33 = Tag(channel_id=15, video_id=7, body="Trailer")
    tag_34 = Tag(channel_id=15, video_id=7, body="Superhero")
    tag_35 = Tag(channel_id=15, video_id=7, body="Marvel")

    tag_36 = Tag(channel_id=1, video_id=8, body="Succession")
    tag_37 = Tag(channel_id=1, video_id=8, body="Show")
    tag_38 = Tag(channel_id=1, video_id=8, body="Scene")
    tag_39 = Tag(channel_id=1, video_id=8, body="Drama")
    tag_40 = Tag(channel_id=1, video_id=8, body="HBO")

    tag_41 = Tag(channel_id=11, video_id=9, body="Education")
    tag_42 = Tag(channel_id=11, video_id=9, body="Learning")
    tag_43 = Tag(channel_id=11, video_id=9, body="Health")
    tag_44 = Tag(channel_id=11, video_id=9, body="Habits")
    tag_45 = Tag(channel_id=11, video_id=9, body="Stress")

    tag_46 = Tag(channel_id=2, video_id=10, body="Cartoon")
    tag_47 = Tag(channel_id=2, video_id=10, body="Show")
    tag_48 = Tag(channel_id=2, video_id=10, body="Analysis")
    tag_49 = Tag(channel_id=2, video_id=10, body="Podcasts")
    tag_50 = Tag(channel_id=2, video_id=10, body="Comedy")


    tag_51 = Tag(channel_id=20, video_id=11, body="Nirvana")
    tag_52 = Tag(channel_id=20, video_id=11, body="Electronic")
    tag_53 = Tag(channel_id=20, video_id=11, body="Rock")
    tag_54 = Tag(channel_id=20, video_id=11, body="Remix")
    tag_55 = Tag(channel_id=20, video_id=11, body="Music")

    tag_56 = Tag(channel_id=19, video_id=12, body="Electronic")
    tag_57 = Tag(channel_id=19, video_id=12, body="Anime")
    tag_58 = Tag(channel_id=19, video_id=12, body="Music")
    tag_59 = Tag(channel_id=19, video_id=12, body="Dubstep")
    tag_60 = Tag(channel_id=19, video_id=12, body="Animated")

    tag_61 = Tag(channel_id=3, video_id=13, body="Sports")
    tag_62 = Tag(channel_id=3, video_id=13, body="Soccer")
    tag_63 = Tag(channel_id=3, video_id=13, body="Score")
    tag_64 = Tag(channel_id=3, video_id=13, body="Game")
    tag_65 = Tag(channel_id=3, video_id=13, body="UEFA")

    tag_66 = Tag(channel_id=6, video_id=14, body="Podcasts")
    tag_67 = Tag(channel_id=6, video_id=14, body="H3")
    tag_68 = Tag(channel_id=6, video_id=14, body="News")
    tag_69 = Tag(channel_id=6, video_id=14, body="Fashion")
    tag_70 = Tag(channel_id=6, video_id=14, body="Entertainment")

    tag_71 = Tag(channel_id=9, video_id=15, body="News")
    tag_72 = Tag(channel_id=9, video_id=15, body="Politics")
    tag_73 = Tag(channel_id=9, video_id=15, body="International")
    tag_74 = Tag(channel_id=9, video_id=15, body="Germany")
    tag_75 = Tag(channel_id=9, video_id=15, body="Diplomacy")

    tag_76 = Tag(channel_id=17, video_id=16, body="Nature")
    tag_77 = Tag(channel_id=17, video_id=16, body="Animals")
    tag_78 = Tag(channel_id=17, video_id=16, body="Wolves")
    tag_79 = Tag(channel_id=17, video_id=16, body="Wild")
    tag_80 = Tag(channel_id=17, video_id=16, body="Education")

    tag_81 = Tag(channel_id=16, video_id=17, body="Scene")
    tag_82 = Tag(channel_id=16, video_id=17, body="Sports")
    tag_83 = Tag(channel_id=16, video_id=17, body="Movies")
    tag_84 = Tag(channel_id=16, video_id=17, body="Baseball")
    tag_85 = Tag(channel_id=16, video_id=17, body="Acting")

    tag_86 = Tag(channel_id=13, video_id=18, body="Tasty")
    tag_87 = Tag(channel_id=13, video_id=18, body="Food")
    tag_88 = Tag(channel_id=13, video_id=18, body="Recipe")
    tag_89 = Tag(channel_id=13, video_id=18, body="Ramen")
    tag_90 = Tag(channel_id=13, video_id=18, body="Yum")

    tag_91 = Tag(channel_id=4, video_id=19, body="Scene")
    tag_92 = Tag(channel_id=4, video_id=19, body="HBO")
    tag_93 = Tag(channel_id=4, video_id=19, body="Drama")
    tag_94 = Tag(channel_id=4, video_id=19, body="Show")
    tag_95 = Tag(channel_id=4, video_id=19, body="Acting")

    tag_96 = Tag(channel_id=7, video_id=20, body="Gaming")
    tag_97 = Tag(channel_id=7, video_id=20, body="COD")
    tag_98 = Tag(channel_id=7, video_id=20, body="Walkthrough")
    tag_99 = Tag(channel_id=7, video_id=20, body="Gameplay")
    tag_100 = Tag(channel_id=7, video_id=20, body="Campaign")

    tags = [tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10,
    tag_11, tag_12, tag_13, tag_14, tag_15, tag_16, tag_17, tag_18, tag_19, tag_20,
    tag_21, tag_22, tag_23, tag_24, tag_25, tag_26, tag_27, tag_28, tag_29, tag_30,
    tag_31, tag_32, tag_33, tag_34, tag_35, tag_36, tag_37, tag_38, tag_39, tag_40,
    tag_41, tag_42, tag_43, tag_44, tag_45, tag_46, tag_47, tag_48, tag_49, tag_50,
    tag_51, tag_52, tag_53, tag_54, tag_55, tag_56, tag_57, tag_58, tag_59, tag_60,
    tag_61, tag_62, tag_63, tag_64, tag_65, tag_66, tag_67, tag_68, tag_69, tag_70,
    tag_71, tag_72, tag_73, tag_74, tag_75, tag_76, tag_77, tag_78, tag_79, tag_80,
    tag_81, tag_82, tag_83, tag_84, tag_85, tag_86, tag_87, tag_88, tag_89, tag_90,
    tag_91, tag_92, tag_93, tag_94, tag_95, tag_96, tag_97, tag_98, tag_99, tag_100
    ]

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
