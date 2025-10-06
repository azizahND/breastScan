from flask import Blueprint, request, jsonify
from models import db
from models.pemeriksaan import Pemeriksaan
from models.pasien import Pasien
from datetime import datetime
import os
# from tensorflow.keras.models import load_model 
# from tensorflow.keras.preprocessing import image
import numpy as np

# try:
#     from tensorflow.keras.models import load_model
# except ImportError:
#     load_model = None


bp_pemeriksaan = Blueprint('pemeriksaan', __name__, url_prefix='/api/pemeriksaan')
MODEL_PATH = os.path.join(os.getcwd(), 'models_ai', 'best_multimodal_model.h5')
# model = load_model(MODEL_PATH)
model = None 
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@bp_pemeriksaan.route('', methods=['POST'])
def add_pemeriksaan():
    try:
        data = request.json

        if not data or 'pasien_id' not in data:
            return jsonify({'error': 'pasien_id wajib disertakan'}), 400

        pasien = Pasien.query.get(data['pasien_id'])
        if not pasien:
            return jsonify({'error': 'Pasien tidak ditemukan'}), 404

        pemeriksaan = Pemeriksaan(
            tanggal=datetime.strptime(data.get('tanggal', datetime.utcnow().strftime('%Y-%m-%d')), '%Y-%m-%d'),
            hasil_deteksi=data.get('hasil_deteksi', 'Pending'),
            hasil_scan=data.get('hasil_scan'),
            suhu=data.get('suhu'),
            kulit=data.get('kulit'),
            pendarahan=data.get('pendarahan', False),
            nyeri=data.get('nyeri', False),
            bengkak=data.get('bengkak', False),
            sesak_nafas=data.get('sesak_nafas', False),
            pasien_id=data['pasien_id']
        )

        db.session.add(pemeriksaan)
        db.session.commit()

        return jsonify({
            'message': 'Pemeriksaan berhasil ditambahkan',
            'id_pemeriksaan': pemeriksaan.id_pemeriksaan
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bp_pemeriksaan.route('/pasien/<int:pasien_id>', methods=['GET'])
def get_pemeriksaan_pasien(pasien_id):
    pemeriksaans = Pemeriksaan.query.filter_by(pasien_id=pasien_id).all()
    if not pemeriksaans:
        return jsonify({'message': 'Belum ada pemeriksaan untuk pasien ini'}), 404

    result = []
    for pm in pemeriksaans:
        result.append({
            'id_pemeriksaan': pm.id_pemeriksaan,
            'tanggal': pm.tanggal.strftime('%Y-%m-%d'),
            'hasil_deteksi': pm.hasil_deteksi,
            'hasil_scan': pm.hasil_scan,
            'suhu': pm.suhu,
            'kulit': pm.kulit,
            'pendarahan': pm.pendarahan,
            'nyeri': pm.nyeri,
            'bengkak': pm.bengkak,
            'sesak_nafas': pm.sesak_nafas
        })

    return jsonify(result), 200

# iot

# @bp_pemeriksaan.route('/iot', methods=['POST'])
# def iot_input():
    try:
        pasien_id = request.form.get('pasien_id')
        suhu = float(request.form.get('suhu', 0))
        file = request.files.get('hasil_scan')

        if not pasien_id or not file:
            return jsonify({"error": "pasien_id dan file gambar wajib dikirim"}), 400

        pasien = Pasien.query.get(pasien_id)
        if not pasien:
            return jsonify({"error": "Pasien tidak ditemukan"}), 404

        filename = f"{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{file.filename}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        # --- proses prediksi ---
        img = image.load_img(filepath, target_size=(224, 224))   # sesuaikan ukuran model kamu
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        pred = model.predict(img_array)
        hasil_deteksi = 'abnormal' if pred[0][0] > 0.5 else 'normal'  # tergantung output model

        # simpan ke database
        pemeriksaan = Pemeriksaan(
            tanggal=datetime.utcnow(),
            hasil_deteksi=hasil_deteksi,
            hasil_scan=filename,
            suhu=suhu,
            pasien_id=pasien.id_pasien
        )
        db.session.add(pemeriksaan)
        db.session.commit()

        return jsonify({
            "message": "Data IoT berhasil diproses dan disimpan",
            "id_pemeriksaan": pemeriksaan.id_pemeriksaan,
            "hasil_deteksi": hasil_deteksi,
            "gambar_tersimpan": filename
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@bp_pemeriksaan.route('/hasil/<int:pasien_id>', methods=['GET'])
def hasil_pemeriksaan(pasien_id):
    pemeriksaan = Pemeriksaan.query.filter_by(pasien_id=pasien_id).order_by(Pemeriksaan.tanggal.desc()).first()
    if not pemeriksaan:
        return jsonify({"message": "Belum ada hasil pemeriksaan"}), 404

    return jsonify({
        "tanggal": pemeriksaan.tanggal,
        "hasil_deteksi": pemeriksaan.hasil_deteksi,
        "hasil_scan_url": f"/static/uploads/{pemeriksaan.hasil_scan}",
        "suhu": pemeriksaan.suhu
    })