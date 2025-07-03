from sqlite3 import IntegrityError
from flask import Blueprint, jsonify
from project.app.bl.UserBLC import UserBLC
from project.app.bl.LoginBLC import LoginBLC
from project.app.model.TokenBlockList import TokenBlockList
from project.app.schema.UserSchema import UserSchema, GetAllUserSchema, GetUserById, LoginSchema
from webargs.flaskparser import use_args, parser
from marshmallow import fields
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt, jwt_required, get_jwt_identity
from project.app.db import db
from flask_cors import cross_origin
from project.app.bl.Active_user_bl import Actives
from project.app.model.ActiveUsers import ActiveUserSession

bp = Blueprint("user", __name__)

@bp.route("/register", methods=["POST"])
@cross_origin(origins='http://localhost:8081')
@use_args(UserSchema(), location="json")
def register_user(args):
    try:
        # breakpoint()
        res = UserBLC.add_user(args)
        return jsonify({"message": "User added successfully", "result": res}), 201
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/user/get-all", methods=['GET'])
def get_all_users():
    try:
        users = UserBLC.get_all_users()
        if users:
            schema = GetAllUserSchema(many=True)
            result = schema.dump(users)
            return jsonify({"message": "Users fetched", "result": result}), 200
        else:
            return jsonify({"message": "No users found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@bp.route("/user/get_number_of_users", methods=['GET'])
def get_user_count():
    try:
        users = UserBLC.get_all_users()
        total_users = len(users) if users else 0
        return jsonify({"message": "User count fetched", "total_users": total_users}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/user/get", methods=['POST'])
@use_args({"id": fields.Int(required=True)}, location='json')
def get_user_by_id(args):
    try:
        user = UserBLC.fetch_user_by_id(args)
        if user:
            schema = UserSchema()
            result = schema.dump(user)
            return jsonify({"message": "User fetched", "result": result}), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @bp.route("/user/get", methods=['GET'])
# @use_args({"id": fields.Int()}, location='query')
# def get_user(args):
#     id = args.get('id')
#     # breakpoint()
#     if id:
#         try:
#             res = UserBLC.fetch_user_by_id(args)  
#             if res:
#                 schema = UserSchema()
#                 result = schema.dump(res)
#                 return jsonify({"message": "info Fetched", "result": result}), 201
#             else:
#                 return jsonify({"message": "user not found!"}), 404
#         except Exception as e:
#             return jsonify({"error!": str(e)}), 500
#     else:
#         res = UserBLC.get_all_users()
#         if res:
#             schema = GetAllUserSchema(many=True)
#             result = schema.dump(res)
#             return jsonify({"result" : result}), 201
#         else:
#             return jsonify({"message" : "No users found!"}),404
    
        
        
@bp.route("/user", methods = ['PUT'])
@use_args(GetUserById(), location='json')
def update_user(args):
    try:
        res = UserBLC.update_user_by_id(args)
        if res:
            return jsonify({"message" : "user updated successfully!", "result" : res}),200
    except Exception as e:
        return jsonify({"message" : str(e)}),404
    
    
@bp.route("/UserDelete", methods=['DELETE'])
@use_args(GetUserById(), location='query')  
def delete_user(args):
     
    try:
        print("DELETE request received with args:", args)
        res = UserBLC.deleted_user_by_id(args)
        if "error!" in res:
            return jsonify(res), 404
        return jsonify(res), 200
    except Exception as e:
        return jsonify({"error!": str(e)}), 500



@bp.route('/login', methods=['POST'])
@use_args(LoginSchema(), location='json')
def login(args):    
    try:
        result = LoginBLC.login(args)
        # breakpoint()
        return jsonify({"result":result})
    except IntegrityError as e:
        return jsonify({"Error":e.orig.args[1]}), 422
    except Exception as e:
        return jsonify(str(e)),422
    
@bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    user_id = get_jwt_identity()

    session = db.session
    active_session = session.query(ActiveUserSession).filter_by(user_id=user_id).first()
    if active_session:
        active_session.is_active = False

    session.add(TokenBlockList(jti=jti))
    session.commit()

    return jsonify({"message": "Logout successful"}), 200

@bp.route("/api/active-users", methods=["GET"])
def get_active_users():
    active = Actives.get_active_users()

    return jsonify({
        "active_user_count": len(active),
        "active_users": [
            {
                "user_id": user.user_id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
            for user in active
        ]
    }), 200
