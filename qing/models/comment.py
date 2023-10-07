from datetime import datetime

from qing import db


class CommentORM(db.Model):
    """评论"""

    __tablename__ = "bbs_comment"

    id = db.Column(db.Integer, primary_key=True)  # 评论编号
    content = db.Column(db.Text, nullable=False)  # 评论内容
    like_count = db.Column(db.Integer, default=0)  # 点赞条数
    user_id = db.Column(
        db.Integer, db.ForeignKey("bbs_user.id"), nullable=False
    )  # 用户 id
    article_id = db.Column(
        db.Integer, db.ForeignKey("bbs_article.id"), nullable=False
    )  # 新闻 id

    create_at = db.Column(db.DateTime, default=datetime.now)  # 记录的创建时间
    update_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now
    )  # 记录的更新时间

    parent_id = db.Column(db.Integer, db.ForeignKey("bbs_comment.id"))  # 父评论 id
