import os

from flask import Flask, current_app

from configs import config
from utils import setup_log

app = Flask(__name__)

# 尝试从本地环境中读取
config_name = os.getenv("FLASK_CONFIG", "development")
app.config.from_object(config[config_name])
setup_log(config_name)


@app.route("/")
def hello_world():  # put application's code here
    current_app.logger.debug("debug")
    current_app.logger.error("error")
    return "Hello World!"
