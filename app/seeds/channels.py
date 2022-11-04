from app.models import db, Channel


# Adds a demo user, you can add other users here if you want
def seed_channels():
    channel_1 = Channel(
        channel_name='DemoUserGaming', user_id='1',
        profile_picture="https://static.esea.net/global/images/users/1080122.1543427602.jpg",
        banner_picture='https://wallpaperaccess.com/full/1615368.jpg')
    channel_2 = Channel(
        channel_name='DemoUserStreaming', user_id='1',
        profile_picture="https://64.media.tumblr.com/06cb8dbb8be14d91777d2f9e16f6a407/012792e20c1bc675-b2/s500x750/565f42f875a135af7efbebc1f662071b11a64bda.jpg",
        banner_picture='https://img.freepik.com/premium-vector/dark-navy-blue-banner-background-vector-abstract-graphic-design-banner-pattern-background-template_181182-18817.jpg')
    channel_3 = Channel(
        channel_name='OnePiece', user_id='2',
        profile_picture="https://i.ytimg.com/vi/xDeQP5Y7Tus/maxresdefault.jpg",
        banner_picture='https://i.redd.it/2gavdohhcozz.jpg')
    channel_4 = Channel(
        channel_name='Admirals', user_id='2',
        profile_picture="https://i1.sndcdn.com/avatars-000090559018-l7pk9f-t500x500.jpg",
        banner_picture='https://i.pinimg.com/736x/8f/b6/b9/8fb6b9d1829a44e45416e8f31e08dc42.jpg')
    channel_5 = Channel(
        channel_name='Bondman', user_id='3',
        profile_picture="https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/12/spy-x-family-bond-image.jpg",
        banner_picture='https://img1.ak.crunchyroll.com/i/spire3/a5708621d3b23af120d50d9c7965d86b1637343001_main.png')
    channel_6 = Channel(
        channel_name='WakuWaku', user_id='3',
        profile_picture="https://i.kym-cdn.com/entries/icons/mobile/000/040/241/anya_heh_thumbnail.jpg",
        banner_picture='https://goodsrepublic.com/media/binary/007/261/122/7261122.jpg')
    channel_7 = Channel(
        channel_name='Markiplier', user_id='4',
        profile_picture="https://i.pinimg.com/originals/ee/2d/29/ee2d292c7ebcae49f47a1464659422c0.png",
        banner_picture='https://looxcie.com/wp-content/uploads/2018/12/markiplier-thumbnail.png')
    channel_8 = Channel(
        channel_name='IGN', user_id='4',
        profile_picture="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/IGN_Entertainment_Logo.svg/1200px-IGN_Entertainment_Logo.svg.png",
        banner_picture='https://www.pngkey.com/png/detail/21-214887_banner-black-and-white-library-deepfreeze-ign-ign.png')
    channel_9 = Channel(
        channel_name='Politico', user_id='5',
        profile_picture="https://cdn.comparably.com/24749373/l/163465/logo.jpg",
        banner_picture='https://pbs.twimg.com/media/CdFGLcxWwAA9932.jpg')
    channel_10 = Channel(
        channel_name='FashionShow', user_id='5',
        profile_picture="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/09/fashion-logo-design.jpg",
        banner_picture="https://marketplace.canva.com/EAFGKRRskMs/1/0/1600w/canva-brown-and-beige-minimalist-fashion-banner-lYcbGpUSVGo.jpg")
    channel_11 = Channel(
        channel_name='CrashCourse', user_id='6',
        profile_picture="https://upload.wikimedia.org/wikipedia/en/e/e9/Crash_Course_logo.png",
        banner_picture='https://www.clipartmax.com/png/middle/261-2612453_crash-course-website-crash-course-world-history-logo.png')
    channel_12 = Channel(
        channel_name='Fireship', user_id='6',
        profile_picture="https://dslv9ilpbe7p1.cloudfront.net/JQ6paMWlouqHZYm89mG-fA_store_logo_image.png",
        banner_picture='https://i.ytimg.com/vi/gun8OiGtlNc/maxresdefault.jpg')
    channel_13 = Channel(
        channel_name='Tasty', user_id='7',
        profile_picture="https://www.licensingmattersglobal.com/wp-content/uploads/2019/03/News-Tasty.jpg",
        banner_picture='https://brandingstyleguides.com/wp-content/guidelines/2019/10/Tasty_Style_Guide_032317-1-1000x563.jpg')
    channel_14 = Channel(
        channel_name='WatchMojo', user_id='7',
        profile_picture="https://credobags.com/wp-content/uploads/2017/11/watchmojo-media-logo.jpg",
        banner_picture='https://static.tvtropes.org/pmwiki/pub/images/watchmojobetter.png')
    channel_15 = Channel(
        channel_name='Marvel', user_id='8',
        profile_picture="https://i.pinimg.com/originals/5c/1d/f8/5c1df865ec798229c9a722c6240a896f.jpg",
        banner_picture='https://terrigen-cdn-dev.marvel.com/content/prod/1x/marvelstudios_logo.jpg')
    channel_16 = Channel(
        channel_name='HBOMax', user_id='8',
        profile_picture="https://cdn.sanity.io/images/1pn9obcz/production/6c440f28ca5d1a16e74289dd57cc0ae1167eb446-1920x1080.jpg",
        banner_picture='https://logos-world.net/wp-content/uploads/2022/01/HBO-Max-Emblem.png')
    channel_17 = Channel(
        channel_name='National Geographics', user_id='9',
        profile_picture="https://i.pinimg.com/originals/66/d0/11/66d0115c90e3325a5372aeb37d0f1728.jpg",
        banner_picture='https://1000logos.net/wp-content/uploads/2017/04/national-geographic-symbol.jpg')
    channel_18 = Channel(
        channel_name='First We Feast', user_id='9',
        profile_picture="https://i.pinimg.com/474x/ee/bd/df/eebddf27ea217996819b946de3b2bfee.jpg",
        banner_picture='https://images.firstwefeast.com/complex/image/upload/f_auto,fl_lossy,q_auto,w_1200/firstwefeast-logo_o3d1gq.jpg')
    channel_19 = Channel(
        channel_name='Really Slow Motion', user_id='10',
        profile_picture="https://lastfm.freetls.fastly.net/i/u/ar0/9c574089a88c44b5c4a45e7af8828973.jpg",
        banner_picture='https://i.ytimg.com/vi/0FWDMki6Pp8/maxresdefault.jpg')
    channel_20 = Channel(
        channel_name='Insider', user_id='10',
        profile_picture="https://i.pinimg.com/originals/ce/7b/ac/ce7bacb704a4d54550e285ed89e1bb82.jpg",
        banner_picture='https://www.insider.com/public/assets/INSIDER/US/og-image-logo-social.png')

    channels = [channel_1, channel_2, channel_3, channel_4, channel_5, channel_6, channel_7, channel_8, channel_9,
    channel_10, channel_11, channel_12, channel_13, channel_14, channel_15,
    channel_16, channel_17, channel_18, channel_19, channel_20]
    for channel in channels:
        db.session.add(channel)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
