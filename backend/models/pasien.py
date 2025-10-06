from models import db

class Pasien(db.Model):
    __tablename__ = 'pasien'

    id_pasien = db.Column(db.Integer, primary_key=True, autoincrement=False)  # manual input
    jenis_kelamin = db.Column(db.String(10), nullable=False)

    pemeriksaans = db.relationship('Pemeriksaan', backref='pasien', lazy=True)

    def __repr__(self):
        return f"<Pasien {self.id_pasien}>"
