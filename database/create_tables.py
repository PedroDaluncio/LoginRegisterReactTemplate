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


def create_tables():
    """Cria as tabelas no banco de dados"""
    query = """ CREATE TABLE IF NOT EXISTS Accounts(
        id integer primary key generated always as identity NOT NULL,
        name varchar(100) NOT NULL,
        email varchar(100) NOT NULL UNIQUE,
        password varchar(100) NOT NULL)"""

    try:
        with connect_db() as connection:
            try:
                with connection.cursor() as cursor:
                    cursor.execute(query)
                connection.commit()
                return True
            except psycopg2.Error:
                logging.exception("Erro ao dar commit:")
                connection.rollback()
                return False
    except Exception:
        logging.exception("Erro ao abrir conexão com banco de dados:")
        return False
