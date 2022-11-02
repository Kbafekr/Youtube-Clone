from flask.cli import AppGroup
from .users import seed_users, undo_users
from .channels import seed_channels, undo_channels
from .videos import seed_videos, undo_videos
from .comments import seed_comments, undo_comments
from .tags import seed_tags, undo_tags

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_channels()
    seed_videos()
    seed_comments()
    seed_tags()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_channels()
    undo_videos()
    undo_comments()
    undo_tags()
    # Add other undo functions here
