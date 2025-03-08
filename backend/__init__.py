import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from pydantic import ValidationError
from types_validation.types_validation import Account
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from database.insert_values import create_user_account
import bcrypt


app = Flask(__name__)
CORS(app)


@app.post("/createAccount")
def create_account():
    data = request.get_json()
    if not data or not data['name'] or not data['email'] or not data['password']:
        return jsonify(error="ERRO: Dados faltando ou inválidos!", status=400)

    try:
        Account(name=data['name'], email=data['email'], password=data['password'])
    except ValidationError:
        return jsonify(error="ERRO: dados inválidos!", status=400)

    data['password'] = (bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())).decode('utf-8')

    response = create_user_account(data)

    if response == "ERRO: já existe uma conta com esses dados!":
        return jsonify(error="Erro ao criar conta, já existe uma conta com esses dados", status=400)

    if response:
        return jsonify(success="Conta criada com sucesso!", status=200)
    return jsonify(error="Erro ao criar conta, tente novamente mais tarde", status=400)



if __name__ == "__main__":
    app.run(host = '0.0.0.0', port=5123)
