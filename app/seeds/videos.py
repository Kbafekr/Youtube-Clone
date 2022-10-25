from app.models import db
from app.models.video import Video



# Adds a demo user, you can add other users here if you want
def seed_videos():
    video_1 = Video(channel_id=1, title='''Ant-Man and The Wasp Quantumania Trailer: Avengers 5 Kang Dynasty and Loki Marvel Easter Eggs", description="
Covering new Ant-Man 3 Quantumania Trailer Breakdown and Marvel Easter Eggs. Avengers 5 Kang Dynasty Trailer Footage. Loki Season 2 Trailer Kang Easter Eggs and Connections. Scott Lang Ant-Man vs Kang the Conqueror Breakdown. New Kang variant vs He Who Remains Kang on Loki Episode 6 Finale. Ant-Man 3 MODOK and Bill Murray character explained. Fantastic Four Easter Eggs and Connection.

Ant-Man 3 Quantumania is the beginning of Marvel Phase 5. How it helps set up Avengers 5 Kang Dynasty with new Avengers vs Kang. And Avengers 6 Secret Wars Teaser. With the Incursions and Time Runs Out teaser during the Doctor Strange 2 Multiverse of Madness Post Credit Scene. Avengers 5 and Avengers 6 will be more like the cliffhanger between Infinity War and Endgame. Marvel Phase  Movies, Marvel Phase 6 Movies Schedule.

I'll do more Ant-Man 3 Quantumania videos as we get more footage! My House Of The Dragon Season 2 video will post next!''', video_url="https://www.youtube.com/watch?v=_iVHw7kxZiE")
#     image_2 = Image(userId=2, albumId=2, title="NY Building Tower", description="MultiLayered building was awesome", previewImageUrl="https://images.unsplash.com/photo-1664700747100-756700090373?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80")
#     image_3 = Image(userId=1, albumId=1, title="Solar System", description="Took this at the perfect moment", previewImageUrl="https://images.unsplash.com/photo-1663187114582-5cfcbdac5481?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80")
#     image_4 = Image(userId=3, albumId=3, title="Rainbow Shot", description="Beautiful Rainbow shot", previewImageUrl="https://images.unsplash.com/photo-1606667788845-5dbd000041f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1555&q=80")
#     image_5 = Image(userId=2, albumId=2, title="Florida Dock", description="Dock was beautiful", previewImageUrl="https://images.unsplash.com/photo-1665916712273-d5d74843683b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80")
#     image_6 = Image(userId=4, albumId=4, title="Empowerment", description="Standing up for whats right", previewImageUrl="https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=660&q=80")
#     image_7 = Image(userId=3, albumId=3, title="Inception", description="Nothing is as it's perceived", previewImageUrl="https://images.unsplash.com/photo-1548133650-7e2b96ebe5e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80")
#     image_8 = Image(userId=4, albumId=4, title="Audi A7", description="Luxury unleashed", previewImageUrl="https://images.unsplash.com/photo-1626847037657-fd3622613ce3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
#     image_9 = Image(userId=2, albumId=2, title="Visionary Sign", description="This is the sign you've been looking for", previewImageUrl="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
#     image_10 = Image(userId=3, albumId=3, title="Dreams", description="Dreams are made to be reality", previewImageUrl="https://images.unsplash.com/photo-1494633114655-819eb91fde40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
#     image_11 = Image(userId=2, albumId=2, title="Snowboard", description="Go Big or Go Home", previewImageUrl="https://images.unsplash.com/photo-1611124600582-c9ef0e977585?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
#     image_12 = Image(userId=2, albumId=2, title="Halloween", description="Spooky Vibes", previewImageUrl="https://images.unsplash.com/photo-1541877057445-c90b478d53d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80")
#     image_13 = Image(userId=3, albumId=3, title="CyberPunk", description="Futurism", previewImageUrl="https://images.unsplash.com/photo-1580428180098-24b353d7e9d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80")
#     image_14 = Image(userId=4, albumId=4, title="RoboWisdom", description="Connecting to the future", previewImageUrl="https://images.unsplash.com/photo-1599790772272-d1425cd3242e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80")
#     image_15 = Image(userId=1, albumId=1, title="Anime", description="Anime Vibes", previewImageUrl="https://images.unsplash.com/photo-1586461715699-1e192dcd04c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=419&q=80")
#     image_16 = Image(userId=1, albumId=1, title="Desert Palace", description="MiddleEast", previewImageUrl="https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80")
# # carousel images
#     image_17 = Image(userId=5, albumId=5, title="Fantasy Island", description="The coastline and ship wreck was shot in Mauritius.", previewImageUrl="https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Fantasy_Island_Daniel_Cheong.jpg")
#     image_18 = Image(userId=6, albumId=6, title="Secluded", description="An idyllic scene lush with green", previewImageUrl="https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Secluded_Pete_Rowbottom.jpg")
#     image_19 = Image(userId=7, albumId=7, title="Albuquerque, New Mexico", description="Waltuh, put the camera away Waltuh... I ain't taking a picture rn Waltuh", previewImageUrl="https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Untitled_Jorge_Guadalupe_Lizarraga.jpg")
#     image_20 = Image(userId=8, albumId=8, title="Europe's Best View", description="Snow covered mountain tops", previewImageUrl="https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Europes_best_View_Fabian_Fortmann.jpg")
#     image_21 = Image(userId=9, albumId=9, title="Mists of Renfrew", description="Surreal lake shot", previewImageUrl="https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Mists_of_renfrew_Adam_Gibbs.jpg")
#     image_22 = Image(userId=10, albumId=10, title="Sunset 1663", description="Crashing Waves", previewImageUrl="https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/sunset_1663_Junji_Aoyama.jpg")
#     image_23 = Image(userId=11, albumId=11, title="Tree and Morning Mist", description="Vast landscape", previewImageUrl="https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Tree_and_Morning_Mist_Jos_Buurmans.jpg")
#     image_24 = Image(userId=12, albumId=12, title="Desert Beauty", description="Desert shot", previewImageUrl="https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Desert_Beauty_Christoph_Fischer.jpg")
#     image_25 = Image(userId=13, albumId=13, title="Catwalk am Bahnhof Zürich Oerlikon", description="Where are the cats???", previewImageUrl="https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Catwalk_am_Bahnhof_Zurich_Oerlikon_Peter_Arn.jpg")
#     image_26 = Image(userId=14, albumId=1, title="Dawn of Another Day", description="Cool", previewImageUrl="https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Dawn_of_Another_Day_Sky_Matthews.jpg")

#     images = [image_1, image_2, image_3, image_4, image_5, image_6, image_7,image_8,image_9,image_10,image_11,image_12,image_13,image_14,image_15, image_16, image_17, image_18, image_19, image_20, image_21, image_22, image_23, image_24, image_25, image_26]
    videos = [video_1]
    for video in videos:
        db.session.add(video)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_videos():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
