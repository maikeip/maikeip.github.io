from qing import db


class CategoryORM(db.Model):
    """新闻分类"""

    __tablename__ = "bbs_category"

    id = db.Column(db.Integer, primary_key=True)  # 分类编号
    name = db.Column(db.String(64), nullable=False)  # 分类名
