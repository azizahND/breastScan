from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # <-- hanya deklarasikan db di sini

# import semua model agar dikenali
from .pasien import Pasien
from .pemeriksaan import Pemeriksaan
