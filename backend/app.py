from flask import Flask
from flask_migrate import Migrate
from models import db
from routes.pasien_routes import bp_pasien
from routes.pemeriksaan_routes import bp_pemeriksaan
import config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(config)

db.init_app(app)
migrate = Migrate(app, db)

CORS(app, origins=["http://localhost:5173", "http://localhost:3000"], methods=["GET","POST","PUT","DELETE","OPTIONS"])

app.register_blueprint(bp_pasien, url_prefix='/api/pasien')
app.register_blueprint(bp_pemeriksaan, url_prefix='/api/pemeriksaan')

@app.route('/')
def home():
    return "Flask + MySQL + Migrate siap!"

if __name__ == "__main__":
    app.run(debug=True)
