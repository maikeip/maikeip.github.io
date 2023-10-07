import os

from flask import Flask

from configs import config
from qing.com.utils import setup_log
from qing.extensions import db, migrate
from qing.models import UserORM
from qing.views.index import index_bp


# 使用工厂函数创建程序实例
def create_app(config_name=None):
    app = Flask("qdbbs")
    if not config_name:
        config_name = os.getenv("FLASK_CONFIG", "development")
    app.config.from_object(config[config_name])
    setup_log(config_name)

    # 使用函数注册插件
    register_extensions(app)

    register_blueprint(app)

    return app


def register_extensions(app: Flask):
    db.init_app(app)
    migrate.init_app(app, db)


def register_blueprint(app: Flask):
    app.register_blueprint(index_bp)
