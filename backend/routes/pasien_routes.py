from flask import Blueprint, request, jsonify
from models import db
from models.pasien import Pasien
from models.pemeriksaan import Pemeriksaan
from datetime import datetime

bp_pasien = Blueprint('pasien', __name__, url_prefix='/api/pasien')

# Tambah pasien + buat pemeriksaan awal
@bp_pasien.route('', methods=['POST'])
def add_pasien():
    try:
        data = request.json
        required_fields = ['nama', 'umur', 'tinggi', 'riwayat', 'tanggal']
        if not data or any(field not in data for field in required_fields):
            return jsonify({"error": "Data tidak lengkap"}), 400

        pasien = Pasien(
            nama=data['nama'],
            umur=data['umur'],
            tinggi=data['tinggi'],
            riwayat=data['riwayat']
        )
        db.session.add(pasien)
        db.session.commit()

        # Buat pemeriksaan awal
        pemeriksaan = Pemeriksaan(
            tanggal=datetime.strptime(data['tanggal'], '%Y-%m-%d'),
            hasil_scan="Pending",
            pasien_id=pasien.id
        )
        db.session.add(pemeriksaan)
        db.session.commit()

        return jsonify({"message": "Pasien berhasil ditambahkan", "id": pasien.id}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
