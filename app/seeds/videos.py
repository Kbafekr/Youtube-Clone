from app.models import db
from app.models.video import Video


# Adds a demo user, you can add other users here if you want
def seed_videos():
    video_1 = Video(channel_id=15,
    title="Marvel Studios' Ant-Man and The Wasp: Quantumania | Official Trailer",
    description='''
    This February, enter the Quantum Realm. Watch the brand-new trailer for Marvel Studios' Ant-Man and The Wasp: Quantumania, only in theaters February 17, 2023.
    ''',
    video_url="https://www.youtube.com/watch?v=ZlNFpri-Y40")

    video_2 = Video(channel_id=1,
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

    video_4 = Video(channel_id=2,
    title="Nirvana - Something In The Way (ILLENIUM Remix)",
    description='''
    My first remix in over 2 years! With my Batman jersey collab coming out and hearing this Nirvana song again in the new movie, I really wanted to try to put my spin on it. Super different vibe, had such a blast making it. Hope u guys enjoy!!
    ''',
    video_url="https://www.youtube.com/watch?v=RGNP_ZJ8Uxo&feature=youtu.be")

    video_5 = Video(channel_id=10,
    title="Christian Bale Breaks Down His Most Iconic Characters | GQ",
    description='''
    Christian Bale breaks down a few of his most iconic characters from 'American Psycho,' 'The Dark Knight' Trilogy, 'The Fighter,' 'The Machinist,' 'The Big Short,' 'Vice,' 'Empire of the Sun,' 'Amsterdam' and 'The Pale Blue Eye.'

    Christian Bale will star in AMSTERDAM, in theaters October 7, 2022, and THE PALE BLUE EYE, premiering on Netflix on December 23, 2022.
    ''',
    video_url="https://www.youtube.com/watch?v=TRGHIN2PGIA&t=6s")

    video_6 = Video(channel_id=12,
    title="Stanford Computer Scientist Answers Coding Questions From Twitter | Tech Support | WIRED",
    description='''
    Chris Piech, professor of computer science at Stanford University, answers the internet's burning questions about coding. Do you need to know math to be good at coding? How many computer languages are there? Are programming and coding the same thing? How do you code A.I.? What is the meaning of the "404" error? Chris answers all these questions and much more!
    ''',
    video_url="https://www.youtube.com/watch?v=1yyRvyNQ5rQ")

    video_7 = Video(channel_id=15,
    title="Marvel Studios' Black Panther: Wakanda Forever | Official Trailer",
    description='''
    “Show them who we are.” Watch the brand-new trailer for Marvel Studios' Black Panther: Wakanda Forever, only in theaters November 11.
    ''',
    video_url="https://www.youtube.com/watch?v=_Z3QKkl1WyM")

    video_8 = Video(channel_id=1,
    title="Logan Roy Plays Boar On The Floor | Succession | HBO",
    description='''
   Logan Roy Plays Boar On The Floor | Succession | HBO
    ''',
    video_url="https://www.youtube.com/watch?v=dYqqW3c2mBU")

    video_9 = Video(channel_id=11,
    title="5 mental habits they don't teach you in school",
    description='''
    In school, or really in life, we will face setbacks. When failures compound, our minds often run wild with self-doubt and hopelessness until we aren't able to continue working toward our goals. We aren't taught in school how to manage this, only that it needs to be overcome. What has helped us get past these roadblocks is following a set of principles to shift the focus from negative to positive. So here are our 5 principles, 5 mental habits to stay mentally strong and secure.
    ''',
    video_url="https://www.youtube.com/watch?v=RHHFLMaEuBM")

    video_10 = Video(channel_id=2,
    title="In Defence of Diane | Video Essay (Bojack Horseman)",
    description='''
    People hate Diane. They call her whiny, hypocritical, and the worse person on Bojack Horseman. But I disagree.
    So as Bojack Horseman approaches its series finale (season 6, part 2), I decided to write an essay defending Diane and explaining what she does what she does.
    ''',
    video_url="https://www.youtube.com/watch?v=lk7trjqOqzo")

    video_11 = Video(channel_id=20,
    title="Heart-Shaped Box (VIRTU Remix)",
    description="℗ 2018 Nice Life Recording Company and Atlantic Recording Corporation",
    video_url="https://youtu.be/7XZNf8Mt1fY")

    video_12 = Video(channel_id=19,
    title="Jujutsu Kaisen - Hollow Purple (Ultra Epic Cover)",
    description="Recreation cover by: MASK",
    video_url="https://youtu.be/JZ4sjHCaIKQ")

    video_13 = Video(channel_id=3,
    title="KERR AND HARDER PARTY | Chelsea vs. Vllaznia Highlights (UEFA Women's Champions League 2022-23)",
    description="October 26, 2022 -- Chelsea vs. Vllaznia (UEFA Women's Champions League 2022-2023 Matchday 2)",
    video_url="https://www.youtube.com/watch?v=iPoWXwzwoKI")

    video_14 = Video(channel_id=6,
    title="Andrew Callaghan Of Channel 5 - Leftovers #30",
    description="Thank you to Andrew of @Channel 5 with Andrew Callaghan  joining us! Check out Andrew on tour at http://channel5.news",
    video_url="https://www.youtube.com/watch?v=aoh2W_WiuN4")

    video_15 = Video(channel_id=9,
    title="No alternative but dialogue between Germany and China: Berlin Global Advisors",
    description="Eberhard Sandschneider, partner at Berlin Global Advisors, discusses what German Chancellor Olaf Scholz's visit to Beijing means for the economic and political landscape of both countries.",
    video_url="https://www.youtube.com/watch?v=gclg5Zle2H0")

    video_16 = Video(channel_id=17,
    title="Monster Wolf (Full Episode) | America the Wild",
    description="Wolves have been around for centuries, but with so many variations in the wild, what's really considered a wolf? Casey puts his tracking skills to the test to reveal the truth about wolves.",
    video_url="https://www.youtube.com/watch?v=x_uriBZ-VQo")

    video_17 = Video(channel_id=16,
    title="Moneyball (2011) - He Gets On Base Scene (3/10) | Movieclips",
    description="Moneyball - He Gets On Base: The scouts are doubtful when Billy (Brad Pitt) describes Peter's (Jonah Hill) strategy for picking players.",
    video_url="https://www.youtube.com/watch?v=PlKDQqKh03Y")

    video_18 = Video(channel_id=13,
    title="What It Takes to Make 400 Bowls of Ramen From Scratch • Tasty",
    description="Making 400 bowls of ramen from scratch is not an easy task. But for Keizo Shimamoto, ramen is his life. Watch as he artfully prepares noodles, broth, toppings, eggs, tare, and oils from start to finish - loving it every second.",
    video_url="https://youtu.be/aagyuWlHyUI")

    video_19 = Video(channel_id=4,
    title="House of the Dragon - Otto vs Daemon - Caraxes & Syrax | Episode 2",
    description="The Small Council learns Daemon has stolen a dragon egg and plans to take his mistress Mysaria, who he claims is pregnant, as his second wife. Otto goes to retrieve the egg, with Rhaenyra following him on her dragon, Syrax.",
    video_url="https://youtu.be/lLbV7qxPrkY")

    video_20 = Video(channel_id=7,
    title="CALL OF DUTY MODERN WARFARE 2 Gameplay Walkthrough Part 1 Campaign FULL GAME [4K 60FPS PS5]",
    description="Call Of Duty Modern Warfare 2 Walkthrough Part 1 and until the last part will include the full Call Of Duty Modern Warfare 2 Gameplay on PS5. This Call Of Duty Modern Warfare 2 Gameplay is recorded in 4K 60FPS on PS5 and will include the full game, all endings and all boss fights. ",
    video_url="https://youtu.be/XV8vBqNu9nI")



    videos = [video_1, video_2, video_3, video_4, video_5, video_6, video_7, video_8, video_9, video_10, video_11, video_12, video_13, video_14, video_15, video_16, video_17, video_18, video_19, video_20]

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
