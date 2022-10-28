from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', email='demo@aa.io', active_channel=1, password='password')
    marnie = User(
        first_name='Marnie', last_name='Malkovich', email='marnie@aa.io', active_channel=3, password='password')
    bobbie = User(
        first_name='Bobbie', last_name='Bobbert', email='bobbie@aa.io', active_channel=4, password='password')

    users = [demo, marnie, bobbie]
    for user in users:
        db.session.add(user)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
