from flask.cli import AppGroup
from .users import seed_users, undo_users
from .channels import seed_channels, undo_channels
from .videos import seed_videos, undo_videos
from .comments import seed_comments, undo_comments
from .tags import seed_tags, undo_tags
from .likes import seed_likes, undo_likes
from .dislikes import seed_dislikes, undo_dislikes
from .subscribers import seed_subscribers, undo_subscribers
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
    seed_users()
    seed_channels()
    seed_videos()
    seed_comments()
    seed_tags()
    seed_likes()
    seed_dislikes()
    seed_subscribers()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_channels()
    undo_videos()
    undo_comments()
    undo_tags()
    undo_likes()
    undo_dislikes()
    undo_subscribers()
    # Add other undo functions here
