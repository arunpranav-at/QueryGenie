import psycopg
from configs.postgres_config import db_URI, table_name

def get_session_id(user_id):
    conn = psycopg.connect(conninfo=db_URI)
    cur = conn.cursor()
    table_name = 'session'
    query = f''' 
    INSERT INTO {table_name} (user_id) VALUES (%s) RETURNING id
    '''
    cur.execute(query, (user_id,))
    session_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return session_id