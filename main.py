import os
import re
import server
from syrics.api import Spotify
from pprint import pprint

sp = Spotify(os.getenv("SP_DC"))


def find_spotify_id(link):
    spotify_id = re.search("([a-zA-Z0-9]{22})", link)
    if spotify_id:
        spotify_id = spotify_id.group(1)
    else:
        raise ValueError("Invalid Spotify link/ID.")
    return spotify_id


def find_youtube_id(link):
    youtube_id = re.search("([a-zA-Z0-9]{11})", link)
    if youtube_id:
        youtube_id = youtube_id.group(1)
    else:
        raise ValueError("Invalid Youtube link/ID.")
    return youtube_id


# spotify_id = input("Spotify Link/ID: ")
spotify_link = "https://open.spotify.com/track/1OYOLWqKmhkFIx2KC9ek1a?si=86e8826f30f54a02"
spotify_id = find_spotify_id(spotify_link)
lyrics = sp.get_lyrics(spotify_id)

youtube_link = "https://www.youtube.com/watch?v=9ThO76peOw0"

video_id = find_youtube_id(youtube_link)

server.start(video_id, lyrics)
