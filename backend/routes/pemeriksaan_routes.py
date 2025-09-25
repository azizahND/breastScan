from flask import Blueprint, request, jsonify
from models import db
from models.pemeriksaan import Pemeriksaan
from models.pasien import Pasien

bp_pemeriksaan = Blueprint('pemeriksaan', __name__, url_prefix='/api/pemeriksaan')

# Tambah pemeriksaan untuk pasien tertentu
@bp_pemeriksaan.route('', methods=['POST'])
def add_pemeriksaan():
    data = request.json
    # cek pasien ada atau tidak
    pasien = Pasien.query.get(data['pasien_id'])
    if not pasien:
        return jsonify({'error': 'Pasien tidak ditemukan'}), 404

    pemeriksaan = Pemeriksaan(
        hasil_scan=data['hasil_scan'],
        pasien_id=data['pasien_id']
    )
    db.session.add(pemeriksaan)
    db.session.commit()
    return jsonify({'message': 'Pemeriksaan berhasil ditambahkan', 'id': pemeriksaan.id}), 201

# Ambil semua pemeriksaan pasien tertentu
@bp_pemeriksaan.route('/pasien/<int:pasien_id>', methods=['GET'])
def get_pemeriksaan_pasien(pasien_id):
    pemeriksaans = Pemeriksaan.query.filter_by(pasien_id=pasien_id).all()
    if not pemeriksaans:
        return jsonify({'message': 'Belum ada pemeriksaan'}), 404
    result = [{'id': pm.id, 'tanggal': pm.tanggal, 'hasil_scan': pm.hasil_scan} for pm in pemeriksaans]
    return jsonify(result)
