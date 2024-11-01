import psycopg
from configs.postgres_config import db_URI
from .db import DB

table_name = 'users'

def get_user_email(email):
    db = DB()
    query = f'''
    SELECT * FROM {table_name} WHERE email = %s
    '''
    curr = db.query(query,(email,))
    user = curr.fetchone()
    if user is None:
        return None
    user = user[0]
    db.close()
    return user

def add_user(email,password):
    db = DB()
    query = f'''
    INSERT INTO {table_name} (email, password) VALUES (%s, %s) RETURNING id
    '''
    curr = db.query(query,(email,password))
    user_id = curr.fetchone()[0]
    db.close()