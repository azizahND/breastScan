from flask import Blueprint, request, jsonify
from models import db
from models.pasien import Pasien
from models.pemeriksaan import Pemeriksaan
from datetime import datetime

bp_pasien = Blueprint('pasien', __name__, url_prefix='/api/pasien')

@bp_pasien.route('', methods=['POST'])
def add_pasien():
    try:
        data = request.json

        required_fields = ['id_pasien', 'jenis_kelamin', 'tanggal']
        if not data or any(field not in data for field in required_fields):
            return jsonify({"error": "Data tidak lengkap"}), 400

        pasien = Pasien.query.get(data['id_pasien'])
        if not pasien:
            pasien = Pasien(
                id_pasien=data['id_pasien'],
                jenis_kelamin=data['jenis_kelamin']
            )
            db.session.add(pasien)
            db.session.commit()

        # Simpan pemeriksaan
        pemeriksaan = Pemeriksaan(
            tanggal=datetime.strptime(data['tanggal'], '%Y-%m-%d'),
            hasil_deteksi=data.get('hasil_deteksi'),
            hasil_scan=data.get('hasil_scan'),
            suhu=data.get('suhu'),
            kulit=data.get('kulit'),
            pendarahan=data.get('pendarahan', False),
            nyeri=data.get('nyeri', False),
            bengkak=data.get('bengkak', False),
            sesak_nafas=data.get('sesak_nafas', False),
            pasien_id=pasien.id_pasien
        )
        db.session.add(pemeriksaan)
        db.session.commit()

        return jsonify({
            "message": "Pasien dan pemeriksaan berhasil ditambahkan",
            "id_pasien": pasien.id_pasien,
            "id_pemeriksaan": pemeriksaan.id_pemeriksaan
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
