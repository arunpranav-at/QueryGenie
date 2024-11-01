import psycopg
from configs.postgres_config import db_URI
from .db import DB

table_name = 'session'

def get_session_id(user_id):
    db = DB()
    query = f''' 
    INSERT INTO {table_name} (user_id) VALUES (%s) RETURNING id
    '''
    cur = db.query(query, (user_id,))
    session_id = cur.fetchone()[0]
    db.close()
    return session_id