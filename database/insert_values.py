import os
import logging
import psycopg2
from dotenv import load_dotenv

load_dotenv()


def connect_db():
    """Cria a conexão com o banco de dados"""
    try:
        connection = psycopg2.connect(
            dbname=os.environ['DB_NAME_POSTGRESS_PROD'],
            host=os.environ['HOST_POSTGRESS_PROD'],
            port=os.environ['PORT_POSTGRESS_PROD'],
            user=os.environ['USERNAME_POSTGRESS_PROD'],
            password=os.environ['PASSWORD_USER_POSTGRESS_PROD'],
        )
    except psycopg2.Error:
        return None

    return connection


def create_user_account(data: dict):
    """Insere contas de usuário na tabela accounts"""
    query = f"""INSERT INTO accounts (name, email, password) VALUES (
        '{data['name']}', '{data['email']}', '{data['password']}')"""

    try:
        with connect_db() as connection:
            try:
                with connection.cursor() as cursor:
                    cursor.execute(query)
                    connection.commit()
                    return True
            except psycopg2.errors.UniqueViolation:
                return "ERRO: já existe uma conta com esses dados!"
            except psycopg2.Error:
                connection.rollback()
                logging.exception("Erro ao inserir valores no banco de dados")
                return False
    except Exception:
        logging.exception("Erro ao abrir conexão com banco de dados")
        return False
