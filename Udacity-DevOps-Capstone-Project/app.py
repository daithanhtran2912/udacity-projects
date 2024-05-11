import logging
from flask import Flask, render_template
from flask.logging import create_logger

app = Flask(__name__, static_folder="templates/static")
LOG = create_logger(app)
LOG.setLevel(logging.INFO)

@app.route("/")
def home():
    LOG.info("Rendering index.html...")
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
