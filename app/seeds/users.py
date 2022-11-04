from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', email='demo@aa.io', active_channel=1, password='password')
    marnie = User(
        first_name='Borsalino', last_name='Kizaru', email='marnie@aa.io', active_channel=3, password='password')
    bobbie = User(
        first_name='Anya', last_name='Forger', email='bobbie@aa.io', active_channel=5, password='password')
    Marc = User(
        first_name='Marc', last_name='Hernandez', email='MarcHernandez@aa.io', active_channel=7, password='password')
    Gev = User(
        first_name='Gev', last_name='Apikyan', email='GevApikyan@aa.io', active_channel=9, password='password')
    Amy = User(
        first_name='Amy', last_name='Bennett', email='AmyBennett@aa.io', active_channel=11, password='password')
    kermit = User(
        first_name='Carl', last_name='Wheezer', email='carlWheezer@aa.io', active_channel=13, password='password')
    bruce = User(
        first_name='Bruce', last_name='wayne', email='brucewayne@aa.io', active_channel=15, password='password')
    dog = User(
        first_name='Nikita', last_name='doggo', email='Nikita@aa.io', active_channel=17, password='password')
    cindy = User(
        first_name='Cyndaquil', last_name='pokemon', email='pokemon@aa.io', active_channel=19, password='password')

    users = [demo, marnie, bobbie, Marc, Gev, Amy, kermit, bruce, dog, cindy]
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
