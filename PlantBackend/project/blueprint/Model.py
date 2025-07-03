from flask import Blueprint, jsonify
from marshmallow import fields
from webargs.flaskparser import use_args
from project.app.bl.ModelBLC import ModelBLC
from http import HTTPStatus
from flask_jwt_extended import get_jwt, jwt_required, get_jwt_identity
# from project.app.decorator import admin_required
from flask_cors import cross_origin
from project.app.utils.plot_generator import generate_training_plot
from project.app.utils.plot_generator import get_training_statistics

bp = Blueprint('model', __name__)

@bp.route('/api/image', methods=['POST'])
# @admin_required()
# @jwt_required()
@cross_origin(origins='http://localhost:8081')
@use_args({"image": fields.Field(required=True)}, location='files')
def plant_disease(args):
    try:
        return ModelBLC.predict_plant_disease(args)  
    except Exception as e:
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR


@bp.route("/api/model/plot", methods=["GET"])
def plot_training_graph():
    img = generate_training_plot()
    return Response(img.getvalue(), mimetype='image/png')

@bp.route("/api/model/statistics", methods=["GET"])
def model_statistics():
    try:
        stats = get_training_statistics()
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500