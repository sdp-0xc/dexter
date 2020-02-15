import flask
import os

app = flask.Flask(__name__, template_folder = "html")

@app.route("/")
def home():
    return flask.render_template("index.html")

@app.route("/send", methods=["POST"])
def get_request():
    if flask.request.method == 'POST':
       command = flask.request.get_json()
       print(command["command"])
    return("Sent")


if __name__ == "__main__":
    app.run(host='0.0.0.0')