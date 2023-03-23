from flask import Flask, request, jsonify, url_for, Blueprint
import smtplib
import os
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from base64 import b64encode 
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User
from api.utils import generate_sitemap, APIException
import cloudinary.uploader as uploader


def set_password(password, salt):
    return generate_password_hash(f'{password}{salt}')

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f'{password}{salt}')

api = Blueprint('api', __name__)


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None or password is None:
        return jsonify({"msg": "Bad username or password"}), 401
    else:
        login=User.query.filter_by(email=email).first()
        if login is None:
            return jsonify({"msg":"credenciales invalidas"})
        else:
            if check_password(login.password, password, login.salt):
                token = create_access_token(identity=login.id)
                return jsonify({"token":token})
            else:
                return jsonify({"msg": "Bad username or password"}), 401
    

@api.route('/user', methods=['GET'])
def get_users():

    if request.method == "GET" :
        all_users = User.query.all()
        user_dictionary = []
        for user in all_users:
            user_dictionary.append(user.serialize())
        print(user_dictionary)

    return jsonify(user_dictionary), 200

@api.route('/user', methods=['POST'])
def post_users():
    if request.method == "POST" :
        body = request.json
        email = body.get("email", None)
        password = body.get("password", None)
        
            
        if email is None or password is None:
            return jsonify ("You must provide an email and password")
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            password = set_password(password, salt)
            try:
                user  = User(email= email, password= password, salt=salt)
                db.session.add(user)
                db.session.commit()
                return jsonify("message" "User Created!")
            except Exception as error:
                return jsonify(error.args[0])








