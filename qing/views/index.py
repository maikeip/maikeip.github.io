from flask import Blueprint, current_app, render_template

index_bp = Blueprint("index", __name__)


@index_bp.route("/")
def hello_world():
    return render_template("bbs/index.html")


@index_bp.route("/article")
def article_view():
    return render_template("bbs/article.html")


@index_bp.route("/login")
def login_view():
    return render_template("bbs/login.html")


@index_bp.route("/register")
def register_view():
    return render_template("bbs/register.html")


@index_bp.route("/user")
def user_view():
    return render_template("bbs/user.html")


@index_bp.route("/favicon.ico")
def favicon():
    return current_app.send_static_file("favicon.ico")
