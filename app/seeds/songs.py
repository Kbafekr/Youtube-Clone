from app.models import db, Song


# Adds a demo user, you can add other users here if you want
def seed_songs():
    song_1 = Song(channel_id=1,
    title="More Than I Remember You",
    artist="Unlike Pluto",
    song_url="https://youtu.be/R8Cm5ubgfVI")

    song_2 = Song(channel_id=2,
    title="Tripwire",
    artist="YMIR",
    song_url="https://youtu.be/IScEQa2MJUk")

    song_3 = Song(channel_id=3,
    title="Something In The Way (ILLENIUM Remix)",
    artist="Nirvana",
    song_url="https://youtu.be/RGNP_ZJ8Uxo")

    song_4 = Song(channel_id=4,
    title="Chemicals (feat. Neoni)",
    artist="Besomorph",
    song_url="https://youtu.be/UeSkptwfifI")

    song_5 = Song(channel_id=5,
    title="Bury A Friend (Zeds Dead Remix)",
    artist="Billie Eilish",
    song_url="https://youtu.be/KvmNDnFnW7o")

    song_6 = Song(channel_id=6,
    title="Turn Out The Light",
    artist="Cjbeards",
    song_url="https://youtu.be/tvtk0mDB93U")

    song_7 = Song(channel_id=7,
    title="Heart-Shaped Box (VIRTU Remix)",
    artist="Nirvana",
    song_url="https://youtu.be/7XZNf8Mt1fY")

    song_8 = Song(channel_id=8,
    title="F**K YOU",
    artist="Silent Child",
    song_url="https://youtu.be/L7T6UOkHkJo")

    song_9 = Song(channel_id=9,
    title="Boys Lie Girls Steal",
    artist="Slow Roosevelt",
    song_url="https://youtu.be/PyRPCuw_g8I")

    song_10 = Song(channel_id=10,
    title="Strip My Mind",
    artist="Red Hot Chili Peppers",
    song_url="https://youtu.be/Gp7rGy0UkYU")






    song_11 = Song(channel_id=11,
    title="Dies Irae (feat. Black Prez)",
    artist="Apashe",
    song_url="https://youtu.be/n1ZQDtzzUMo")

    song_12 = Song(channel_id=12,
    title="Craving",
    artist="YMIR",
    song_url="https://youtu.be/NAGj2FpW4ok")

    song_13 = Song(channel_id=13,
    title="Dynasties & Dystopia",
    artist="Denzel Curry",
    song_url="https://youtu.be/y_fB0IMbq54")

    song_14 = Song(channel_id=14,
    title="Blockbuster Night Part 1",
    artist="Run The Jewels",
    song_url="https://youtu.be/uuWQyfGa1yI")

    song_15 = Song(channel_id=15,
    title="The Day the World Went Away",
    artist="Ramin Djawadi",
    song_url="https://youtu.be/_i1tFnsQeno")






    song_16 = Song(channel_id=16,
    title="Hollow Purple",
    artist="Mask Official",
    song_url="https://youtu.be/JZ4sjHCaIKQ")




    song_17 = Song(channel_id=17,
    title="28 Days Later",
    artist="SYN",
    song_url="https://youtu.be/jDigbTQ7xAM")


    song_18 = Song(channel_id=18,
    title="Happy Face",
    artist="Jagwar Twin",
    song_url="https://youtu.be/LBNWehxbS2M")

    song_19 = Song(channel_id=19,
    title="Heartsick",
    artist="YMIR",
    song_url="https://youtu.be/za7nKDL-8Bw")

    song_20 = Song(channel_id=20,
    title="Glitch In The Simulation",
    artist="Gryffin & salem ilese",
    song_url="https://youtu.be/xESXMz8bTK0")

    all_songs = [song_1, song_2, song_3, song_4, song_5, song_6, song_7, song_8, song_9, song_10, song_11, song_12, song_13, song_14, song_15, song_16, song_17, song_18, song_19, song_20]

    for song in all_songs:
        db.session.add(song)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_songs():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
