# -*- coding: utf-8 -*-
# filename:configs.py
import logging
import os


class BaseConfig:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev key")

    # mysql 数据库的配置信息
    SQLALCHEMY_DATABASE_URI = ""

    # redis配置
    REDIS_HOST = "127.0.0.1"
    REDIS_PORT = 6379

    # 默认日志等级
    LOG_LEVEL = logging.DEBUG


class DevelopmentConfig(BaseConfig):
    """开发配置"""

    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@127.0.0.1:3306/qing"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(BaseConfig):
    """测试配置"""

    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"  # 内存数据库


class ProductionConfig(BaseConfig):
    """生成环境配置"""

    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:mysql@127.0.0.1:3306/qingdengbbs"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    """生产模式下的配置"""
    LOG_LEVEL = logging.ERROR


config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
}
