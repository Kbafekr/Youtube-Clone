from flask.cli import AppGroup
from .users import seed_users, undo_users
from .channels import seed_channels, undo_channels
from .videos import seed_videos, undo_videos
from .comments import seed_comments, undo_comments
from .tags import seed_tags, undo_tags
from .likes import seed_likes, undo_likes
from .dislikes import seed_dislikes, undo_dislikes
from .subscribers import seed_subscribers, undo_subscribers
from .notifications import seed_notifications, undo_notifications
from .history import seed_history, undo_history
from .watchlater import seed_watch_later, undo_watch_later
from .playlists import seed_playlist, undo_playlist
from .playlistvideos import seed_playlistvideo, undo_playlistvideo
from .songs import seed_songs, undo_songs

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
    seed_likes()
    seed_dislikes()
    seed_subscribers()
    seed_notifications()
    seed_history()
    seed_watch_later()
    seed_playlist()
    seed_playlistvideo()
    seed_songs()
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
    undo_notifications()
    undo_history()
    undo_watch_later()
    undo_playlist()
    undo_playlistvideo()
    undo_songs()
    # Add other undo functions here
