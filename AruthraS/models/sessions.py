import psycopg
from configs.postgres_config import db_URI
import json
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

def add_dbStructure(session_id, structure):
    db = DB()
    structure = json.dumps(structure)
    query = f'''
    UPDATE {table_name} SET db_structure = %s WHERE id = %s
    '''
    db.query(query, (structure, session_id))
    db.close()

def get_dbStructure(session_id):
    db = DB()
    query = f'''
    SELECT db_structure FROM {table_name} WHERE id = %s
    '''
    cur = db.query(query, (session_id,))
    db_structure = cur.fetchone()[0]
    db.close()
    return db_structure