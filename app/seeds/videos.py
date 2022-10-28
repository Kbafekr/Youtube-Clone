from app.models import db
from app.models.video import Video


# Adds a demo user, you can add other users here if you want
def seed_videos():
    video_1 = Video(channel_id=1,
    title="Marvel Studios' Ant-Man and The Wasp: Quantumania | Official Trailer",
    description='''
    This February, enter the Quantum Realm. Watch the brand-new trailer for Marvel Studios' Ant-Man and The Wasp: Quantumania, only in theaters February 17, 2023.
    ''',
    video_url="https://www.youtube.com/watch?v=ZlNFpri-Y40")

    video_2 = Video(channel_id=2,
    title="House of the Dragon (2022) | Aemond vs Lucerys Scene | S01E10",
    description='''
     An eye for an eye, a son for a son. Lucerys shall be avenged.
    ''',
    video_url="https://www.youtube.com/watch?v=46i7jIpzV6g")

    video_3 = Video(channel_id=3,
    title="Underpaid and Overworked: Being an Animator in Japan | THE VOICELESS #23",
    description='''
    Our vision is to build a lasting grassroots movement of young people from every country to report on real social and cultural issues. We believe having meaningful discussions with people with different opinions is extremely important.

    For media and licensing inquiries, reach out to us at inquiries@asianboss.io
    ''',
    video_url="https://www.youtube.com/watch?v=Tvj-XnVKQI8&t=2s")

    video_4 = Video(channel_id=4,
    title="Nirvana - Something In The Way (ILLENIUM Remix)",
    description='''
    My first remix in over 2 years! With my Batman jersey collab coming out and hearing this Nirvana song again in the new movie, I really wanted to try to put my spin on it. Super different vibe, had such a blast making it. Hope u guys enjoy!!
    ''',
    video_url="https://www.youtube.com/watch?v=RGNP_ZJ8Uxo&feature=youtu.be")

    video_5 = Video(channel_id=1,
    title="Christian Bale Breaks Down His Most Iconic Characters | GQ",
    description='''
    Christian Bale breaks down a few of his most iconic characters from 'American Psycho,' 'The Dark Knight' Trilogy, 'The Fighter,' 'The Machinist,' 'The Big Short,' 'Vice,' 'Empire of the Sun,' 'Amsterdam' and 'The Pale Blue Eye.'

    Christian Bale will star in AMSTERDAM, in theaters October 7, 2022, and THE PALE BLUE EYE, premiering on Netflix on December 23, 2022.
    ''',
    video_url="https://www.youtube.com/watch?v=TRGHIN2PGIA&t=6s")

    video_6 = Video(channel_id=1,
    title="Stanford Computer Scientist Answers Coding Questions From Twitter | Tech Support | WIRED",
    description='''
    Chris Piech, professor of computer science at Stanford University, answers the internet's burning questions about coding. Do you need to know math to be good at coding? How many computer languages are there? Are programming and coding the same thing? How do you code A.I.? What is the meaning of the "404" error? Chris answers all these questions and much more!
    ''',
    video_url="https://www.youtube.com/watch?v=1yyRvyNQ5rQ")

    video_7 = Video(channel_id=2,
    title="Marvel Studios' Black Panther: Wakanda Forever | Official Trailer",
    description='''
    “Show them who we are.” Watch the brand-new trailer for Marvel Studios' Black Panther: Wakanda Forever, only in theaters November 11.
    ''',
    video_url="https://www.youtube.com/watch?v=_Z3QKkl1WyM")

    video_8 = Video(channel_id=3,
    title="Logan Roy Plays Boar On The Floor | Succession | HBO",
    description='''
   Logan Roy Plays Boar On The Floor | Succession | HBO
    ''',
    video_url="https://www.youtube.com/watch?v=dYqqW3c2mBU")

    video_9 = Video(channel_id=4,
    title="5 mental habits they don't teach you in school",
    description='''
    In school, or really in life, we will face setbacks. When failures compound, our minds often run wild with self-doubt and hopelessness until we aren't able to continue working toward our goals. We aren't taught in school how to manage this, only that it needs to be overcome. What has helped us get past these roadblocks is following a set of principles to shift the focus from negative to positive. So here are our 5 principles, 5 mental habits to stay mentally strong and secure.
    ''',
    video_url="https://www.youtube.com/watch?v=RHHFLMaEuBM")

    video_10 = Video(channel_id=1,
    title="In Defence of Diane | Video Essay (Bojack Horseman)",
    description='''
    People hate Diane. They call her whiny, hypocritical, and the worse person on Bojack Horseman. But I disagree.
    So as Bojack Horseman approaches its series finale (season 6, part 2), I decided to write an essay defending Diane and explaining what she does what she does.
    ''',
    video_url="https://www.youtube.com/watch?v=lk7trjqOqzo")
    
    videos = [video_1, video_2, video_3, video_4, video_5, video_6, video_7, video_8, video_9, video_10]

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
