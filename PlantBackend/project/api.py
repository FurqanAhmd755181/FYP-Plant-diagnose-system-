# ~ from flask_jwt_extended import JWTManager
# from flask_migrate import Migrate
# from flask import Flask,jsonify
# from datetime import timedelta
# import jwt
# from project.app.db import db
# from project.app.model.User import User
# from project.blueprint.Model import bp as model_bp
# from project.blueprint.User import bp as user_bp
# from flask_jwt_extended import JWTManager
# from project.app.model.TokenBlockList import TokenBlockList
# from flask_cors import CORS

# def create_app():
#     app = Flask(__name__)
    
#     app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:Furqan686@localhost/plant_diagnose_system"
#     app.config["JWT_SECRET_KEY"] = "7b69f55b6d91eb72206525bdc197b343f440cc63a440a0f83a81a92eae642bb4"
#     app.config['JWT_EXPIRATION_DELTA'] = timedelta(days=30)

#     db.init_app(app)
#     CORS(app)
#     migrate = Migrate(app, db)
#     jwt = JWTManager(app)

#     @jwt.user_lookup_loader
#     def user_lookup(jwt_header, jwt_payload):
#         user_id = jwt_payload["sub"]  # Identity (user_id)
#         email = jwt_payload["email"]  # Additional claim
#         role = jwt_payload["role"]    # Additional claim
        
#         user = User.query.get(user_id)
#         return user
    
#     @jwt.token_in_blocklist_loader
#     def check_if_token_in_blocklist(jwt_header, jwt_payload):
#         jti = jwt_payload["jti"]
#         return db.session.query(TokenBlockList).filter_by(jti=jti).first() is not None

#     @app.errorhandler(422)
#     def webargs_error_handler(err):
#         headers = err.data.get("headers", None)
#         messages = err.data.get("messages", ["Invalid request."])
#         if headers:
#             return jsonify({"errors": messages}), err.code, headers
#         else:
#             return jsonify({"errors": messages}), err.code

#     app.register_blueprint(model_bp)
#     app.register_blueprint(user_bp)
#     # with app.app_context():
#     #     db.create_all()

#     return app

from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS
from datetime import timedelta
from project.app.db import db
from project.app.model.User import User
from project.app.model.TokenBlockList import TokenBlockList
from project.blueprint.Model import bp as model_bp
from project.blueprint.User import bp as user_bp

def create_app():
    app = Flask(__name__)

    # Database and JWT configuration
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:Furqan686@localhost/plant_diagnose_system"
    app.config["JWT_SECRET_KEY"] = "7b69f55b6d91eb72206525bdc197b343f440cc63a440a0f83a81a92eae642bb4"
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)

    # Extensions
    db.init_app(app)
    CORS(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)

    # JWT user loader
    @jwt.user_lookup_loader
    def user_lookup(jwt_header, jwt_payload):
        user_id = jwt_payload["sub"]
        return User.query.get(user_id)

    # Token blocklist check
    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        jti = jwt_payload["jti"]
        return db.session.query(TokenBlockList).filter_by(jti=jti).first() is not None

    # Error handling
    @app.errorhandler(422)
    def webargs_error_handler(err):
        headers = err.data.get("headers", None)
        messages = err.data.get("messages", ["Invalid request."])
        if headers:
            return jsonify({"errors": messages}), err.code, headers
        return jsonify({"errors": messages}), err.code

    # Register Blueprints
    app.register_blueprint(model_bp)
    app.register_blueprint(user_bp)

    return app
