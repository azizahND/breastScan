from . import db

class Pasien(db.Model):
    __tablename__ = 'pasien'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False)
    umur = db.Column(db.Integer, nullable=False)
    tinggi = db.Column(db.Float, nullable=False)
    riwayat = db.Column(db.Text)
    pemeriksaans = db.relationship('Pemeriksaan', backref='pasien', lazy=True)
