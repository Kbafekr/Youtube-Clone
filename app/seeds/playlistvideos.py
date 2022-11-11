from app.models import db, PlaylistVideos

def seed_playlistvideo():
    playlistvideo_1 = PlaylistVideos(playlist_id=1, video_id=1)
    playlistvideo_2 = PlaylistVideos(playlist_id=1, video_id=6)
    playlistvideo_3 = PlaylistVideos(playlist_id=1, video_id=3)
    playlistvideo_4 = PlaylistVideos(playlist_id=1, video_id=14)
    playlistvideo_5 = PlaylistVideos(playlist_id=2, video_id=12)
    playlistvideo_6 = PlaylistVideos(playlist_id=2, video_id=19)
    playlistvideo_7 = PlaylistVideos(playlist_id=3, video_id=6)
    playlistvideo_8 = PlaylistVideos(playlist_id=3, video_id=9)
    playlistvideo_9 = PlaylistVideos(playlist_id=4, video_id=9)
    playlistvideo_10 = PlaylistVideos(playlist_id=4, video_id=7)
    # playlistvideo_11 = PlaylistVideos(playlist_id=3, video_id=8)
    # playlistvideo_12 = PlaylistVideos(playlist_id=3, video_id=9)
    # playlistvideo_13 = PlaylistVideos(playlist_id=3, video_id=10)
    # playlistvideo_14 = PlaylistVideos(playlist_id=3, video_id=11)
    # playlistvideo_15 = PlaylistVideos(playlist_id=3, video_id=12)
    # playlistvideo_16 = PlaylistVideos(playlist_id=3, video_id=13)
    # playlistvideo_17 = PlaylistVideos(playlist_id=3, video_id=14)
    # playlistvideo_18 = PlaylistVideos(playlist_id=3, video_id=15)
    # playlistvideo_19 = PlaylistVideos(playlist_id=3, video_id=16)
    # playlistvideo_20 = PlaylistVideos(playlist_id=3, video_id=17)
    # playlistvideo_21 = PlaylistVideos(playlist_id=3, video_id=18)
    # playlistvideo_22 = PlaylistVideos(playlist_id=3, video_id=19)
    # playlistvideo_23 = PlaylistVideos(playlist_id=3, video_id=20)
    # playlistvideo_24 = PlaylistVideos(playlist_id=2, video_id=4)
    # playlistvideo_25 = PlaylistVideos(playlist_id=2, video_id=5)
    # playlistvideo_26 = PlaylistVideos(playlist_id=2, video_id=6)
    # playlistvideo_27 = PlaylistVideos(playlist_id=2, video_id=7)
    # playlistvideo_28 = PlaylistVideos(playlist_id=2, video_id=8)
    # playlistvideo_29 = PlaylistVideos(playlist_id=2, video_id=9)
    # playlistvideo_30 = PlaylistVideos(playlist_id=2, video_id=10)
    # playlistvideo_31 = PlaylistVideos(playlist_id=2, video_id=11)
    # playlistvideo_32 = PlaylistVideos(playlist_id=2, video_id=12)
    # playlistvideo_33 = PlaylistVideos(playlist_id=2, video_id=13)
    # playlistvideo_34 = PlaylistVideos(playlist_id=2, video_id=14)
    # playlistvideo_35 = PlaylistVideos(playlist_id=2, video_id=15)
    # playlistvideo_36 = PlaylistVideos(playlist_id=2, video_id=16)
    # playlistvideo_37 = PlaylistVideos(playlist_id=2, video_id=17)
    # playlistvideo_38 = PlaylistVideos(playlist_id=2, video_id=18)
    # playlistvideo_39 = PlaylistVideos(playlist_id=2, video_id=19)
    # playlistvideo_40 = PlaylistVideos(playlist_id=2, video_id=20)




    playlistvideos = [playlistvideo_1, playlistvideo_2, playlistvideo_3, playlistvideo_4,playlistvideo_5,playlistvideo_6,playlistvideo_7,playlistvideo_8,playlistvideo_9 ,playlistvideo_10,
    # playlistvideo_11, playlistvideo_12, playlistvideo_13, playlistvideo_14,playlistvideo_15,playlistvideo_16,playlistvideo_17,playlistvideo_18,playlistvideo_19 ,playlistvideo_20,
    # playlistvideo_21, playlistvideo_22, playlistvideo_23, playlistvideo_24,playlistvideo_25,playlistvideo_26,playlistvideo_27,playlistvideo_28,playlistvideo_29 ,playlistvideo_30,
    # playlistvideo_31, playlistvideo_32, playlistvideo_33, playlistvideo_34,playlistvideo_35,playlistvideo_36,playlistvideo_37,playlistvideo_38,playlistvideo_39 ,playlistvideo_40,
    ]

    for playlistvideo in playlistvideos:
        db.session.add(playlistvideo)
        db.session.commit()


def undo_playlistvideo():
    db.session.execute('TRUNCATE playlistvideos RESTART IDENTITY CASCADE;')
    db.session.commit()
