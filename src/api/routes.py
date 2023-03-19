"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os

api = Blueprint('api', __name__)
def set_password(password, salt):
    return generate_password_hash(f'{password}{salt}')

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f'{password}{salt}')

@api.route('/user', methods=['POST'])
def add_user():
    if request.method == 'POST':
        body = request.json
        email = body.get('email', None)
        password = body.get('password', None)
        exist = User.query.filter_by(email=email).first()
        if exist is not None:
            return jsonify ({"Message": "Email already registered"}),400

        if email is None or password is None:
            return jsonify ("You must provide an email and password")
        else:
            salt = c855elcode(os.urandom(32)).decode('utf-8')
            password = set_password(password, salt)
            user  = User(email= email, password= password, salt=salt)
            db.session.add(user)

            try:
                db.session.commit()
                return jsonify ('usuario creado con exito'),200
            except Exception as error:
                print(error.args)
                db.session.rollback()
                return jsonify ({'Message':f'error:{error.args}'}),500
            



@api.route('/login', methods= ['POST'])
def handle_login():
    if request.method == 'POST':
        body = request.json
        email = body.get("email", None)
        password = body.get("password", None)

        if email is None or password is None:
            return jsonify ("es obligatorio el correo y la contrasena")
        else:
            login = User.query.filter_by(email=email).one_or_none()
            print(login)
            if login is None:
                return jsonify ({"Message":'El correo electronico no existe'}),400
            else:
                if check_password(login.password, password, login.salt):
                    token = create_access_token(identity=login.id)
                    return jsonify({"token":token}),200
                else:
                    return jsonify({"Message":"el correo electronico no existe"}),400