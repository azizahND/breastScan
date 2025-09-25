from flask import Flask
from flask_migrate import Migrate
from models import db
from routes.pasien_routes import bp_pasien
from routes.pemeriksaan_routes import bp_pemeriksaan
import config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(config)

# Initialize database
db.init_app(app)
migrate = Migrate(app, db)

# Enable CORS hanya untuk React frontend di localhost:5173 atau 3000
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"], methods=["GET","POST","PUT","DELETE","OPTIONS"])

# Register blueprints dengan prefix yang jelas
app.register_blueprint(bp_pasien, url_prefix='/api/pasien')
app.register_blueprint(bp_pemeriksaan, url_prefix='/api/pemeriksaan')

@app.route('/')
def home():
    return "Flask + MySQL + Migrate siap!"

if __name__ == "__main__":
    # Debug mode untuk development
    app.run(debug=True)
