from app.models import db, Subscriber
from app.models.db import environment, SCHEMA


def seed_subscribers():
    subscriber_1 = Subscriber(channel_id=7, user_id=1)
    subscriber_2 = Subscriber(channel_id=8, user_id=1)
    subscriber_3 = Subscriber(channel_id=9, user_id=1)
    subscriber_4 = Subscriber(channel_id=12, user_id=1)
    subscriber_5 = Subscriber(channel_id=13, user_id=1)

    subscriber_6 = Subscriber(channel_id=14, user_id=1)
    subscriber_7 = Subscriber(channel_id=15, user_id=1)
    subscriber_8 = Subscriber(channel_id=16, user_id=1)
    subscriber_9 = Subscriber(channel_id=17, user_id=1)
    subscriber_10 = Subscriber(channel_id=19, user_id=1)

    subscriber_11 = Subscriber(channel_id=20, user_id=1)
    subscriber_12 = Subscriber(channel_id=1, user_id=2)
    subscriber_13 = Subscriber(channel_id=1, user_id=3)
    subscriber_14 = Subscriber(channel_id=2, user_id=4)
    subscriber_15 = Subscriber(channel_id=3, user_id=4)

    subscriber_16 = Subscriber(channel_id=2, user_id=5)
    subscriber_17 = Subscriber(channel_id=4, user_id=5)
    subscriber_18 = Subscriber(channel_id=6, user_id=5)
    subscriber_19 = Subscriber(channel_id=10, user_id=6)
    subscriber_20 = Subscriber(channel_id=1, user_id=6)

    subscriber_21 = Subscriber(channel_id=11, user_id=7)
    subscriber_22 = Subscriber(channel_id=1, user_id=7)
    subscriber_23 = Subscriber(channel_id=2, user_id=7)
    subscriber_24 = Subscriber(channel_id=1, user_id=8)
    subscriber_25 = Subscriber(channel_id=3, user_id=8)

    subscriber_26 = Subscriber(channel_id=1, user_id=9)
    subscriber_27 = Subscriber(channel_id=5, user_id=9)
    subscriber_28 = Subscriber(channel_id=1, user_id=10)
    subscriber_29 = Subscriber(channel_id=7, user_id=10)
    subscriber_30 = Subscriber(channel_id=12, user_id=10)

    subscribers = [subscriber_1, subscriber_2, subscriber_3, subscriber_4, subscriber_5,
                   subscriber_6, subscriber_7, subscriber_8, subscriber_9, subscriber_10,
                   subscriber_11, subscriber_12, subscriber_13, subscriber_14, subscriber_15,
                   subscriber_16, subscriber_17, subscriber_18, subscriber_19, subscriber_20,
                   subscriber_21, subscriber_22, subscriber_23, subscriber_24, subscriber_25,
                   subscriber_26, subscriber_27, subscriber_28, subscriber_29, subscriber_30]

    for subscriber in subscribers:
        db.session.add(subscriber)
        db.session.commit()


def undo_subscribers():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
