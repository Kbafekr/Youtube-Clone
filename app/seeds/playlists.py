from app.models import db, Playlist

def seed_playlist():
    playlist_1 = Playlist(user_id=1, title="Z")
    playlist_2 = Playlist(user_id=1, title="Cool Videos")
    playlist_3 = Playlist(user_id=1, title="Coding Projects")
    playlist_4 = Playlist(user_id=1, title="A2")
    # playlist_11 = Playlist(user_id=3, video_id=8)
    # playlist_12 = Playlist(user_id=3, video_id=9)
    # playlist_13 = Playlist(user_id=3, video_id=10)
    # playlist_14 = Playlist(user_id=3, video_id=11)
    # playlist_15 = Playlist(user_id=3, video_id=12)
    # playlist_16 = Playlist(user_id=3, video_id=13)
    # playlist_17 = Playlist(user_id=3, video_id=14)
    # playlist_18 = Playlist(user_id=3, video_id=15)
    # playlist_19 = Playlist(user_id=3, video_id=16)
    # playlist_20 = Playlist(user_id=3, video_id=17)
    # playlist_21 = Playlist(user_id=3, video_id=18)
    # playlist_22 = Playlist(user_id=3, video_id=19)
    # playlist_23 = Playlist(user_id=3, video_id=20)
    # playlist_24 = Playlist(user_id=2, video_id=4)
    # playlist_25 = Playlist(user_id=2, video_id=5)
    # playlist_26 = Playlist(user_id=2, video_id=6)
    # playlist_27 = Playlist(user_id=2, video_id=7)
    # playlist_28 = Playlist(user_id=2, video_id=8)
    # playlist_29 = Playlist(user_id=2, video_id=9)
    # playlist_30 = Playlist(user_id=2, video_id=10)
    # playlist_31 = Playlist(user_id=2, video_id=11)
    # playlist_32 = Playlist(user_id=2, video_id=12)
    # playlist_33 = Playlist(user_id=2, video_id=13)
    # playlist_34 = Playlist(user_id=2, video_id=14)
    # playlist_35 = Playlist(user_id=2, video_id=15)
    # playlist_36 = Playlist(user_id=2, video_id=16)
    # playlist_37 = Playlist(user_id=2, video_id=17)
    # playlist_38 = Playlist(user_id=2, video_id=18)
    # playlist_39 = Playlist(user_id=2, video_id=19)
    # playlist_40 = Playlist(user_id=2, video_id=20)




    Playlists = [playlist_1, playlist_2, playlist_3, playlist_4,
    # playlist_5,playlist_6,playlist_7,playlist_8,playlist_9 ,playlist_10,
    # playlist_11, playlist_12, playlist_13, playlist_14,playlist_15,playlist_16,playlist_17,playlist_18,playlist_19 ,playlist_20,
    # playlist_21, playlist_22, playlist_23, playlist_24,playlist_25,playlist_26,playlist_27,playlist_28,playlist_29 ,playlist_30,
    # playlist_31, playlist_32, playlist_33, playlist_34,playlist_35,playlist_36,playlist_37,playlist_38,playlist_39 ,playlist_40,
    ]

    for playlist in Playlists:
        db.session.add(playlist)
        db.session.commit()


def undo_playlist():
    db.session.execute('TRUNCATE playlists RESTART IDENTITY CASCADE;')
    db.session.commit()
