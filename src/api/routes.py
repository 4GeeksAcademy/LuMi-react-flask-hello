"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def create_user_in_db():

    email = request.json.get('email')
    password = request.json.get('password')
    is_active = request.json.get('is_active')

    if email is None:
        return jsonify({'msg': 'add an email please'}), 400

    if password is None:
        return jsonify({'msg': 'add a password please'}), 400
    
    avoid_duplicate = User.query.filter_by(email = email).one_or_none()

    if avoid_duplicate != None:
        return jsonify({'msg': 'user already exist'}), 400

    new_user = User(email = email, password = password, is_active = is_active)
    db.session.add(new_user)
    db.session.commit()
    
    jwt_token = create_access_token(identity = new_user.id)
    return jsonify({ "token": jwt_token, "identity": new_user.id }), 200

@api.route('/login', methods=['POST'])
def get_user_token():
    email = request.json.get('email')
    password = request.json.get('password')

    if email == None or password == None or email == "" or password == "":
        return jsonify({'msg': 'you must add email and password'}), 404

    user = User.query.filter_by(email = email, password = password).one_or_none()

    if user == None:
        return jsonify({'msg': 'wrong email or password'}), 404
    
    jwt_token = create_access_token(identity = user.id)
    return jsonify({ "token": jwt_token, "identity": user.id }), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def get_user_info():
    user_id = get_jwt_identity()

    if user_id is None:
        return jsonify({'msg': 'login to enter this place'}), 400

    user = User.query.filter_by(id = user_id).one_or_none()

    return jsonify(user.serialize()), 202