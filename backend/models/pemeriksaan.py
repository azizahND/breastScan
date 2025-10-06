from models import db
from datetime import datetime

class Pemeriksaan(db.Model):
    __tablename__ = 'pemeriksaan'

    id_pemeriksaan = db.Column(db.Integer, primary_key=True)
    tanggal = db.Column(db.Date, default=datetime.utcnow)
    hasil_deteksi = db.Column(db.String(20), nullable=False)   # normal / abnormal
    hasil_scan = db.Column(db.String(255), nullable=True)      # path atau nama file gambar
    suhu = db.Column(db.Float, nullable=True)
    kulit = db.Column(db.String(50), nullable=True)
    pendarahan = db.Column(db.Boolean, nullable=True, default=False)
    nyeri = db.Column(db.Boolean, nullable=True, default=False)
    bengkak = db.Column(db.Boolean, nullable=True, default=False)
    sesak_nafas = db.Column(db.Boolean, nullable=True, default=False)
    pasien_id = db.Column(db.Integer, db.ForeignKey('pasien.id_pasien'), nullable=False)

    def __repr__(self):
        return f"<Pemeriksaan {self.id_pemeriksaan}>"
