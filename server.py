from flask import Flask, render_template


def start(video_id, lyrics):
    app = Flask(__name__)

    video_link = f"https://www.youtube-nocookie.com/embed/{video_id}?autoplay=1&si=eCrQWk1Um5v-VeD9&amp;controls=0"

    @app.route("/")
    def index():
        return render_template("index.html",
                               video_link=video_link,
                               lyrics=lyrics)

    app.run(host="0.0.0.0", port=8080)
