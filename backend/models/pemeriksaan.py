from . import db
from datetime import datetime

class Pemeriksaan(db.Model):
    __tablename__ = 'pemeriksaan'
    id = db.Column(db.Integer, primary_key=True)
    tanggal = db.Column(db.DateTime, default=datetime.utcnow)
    hasil_scan = db.Column(db.Text, nullable=False)
    pasien_id = db.Column(db.Integer, db.ForeignKey('pasien.id'), nullable=False)
