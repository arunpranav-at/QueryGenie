import psycopg
from configs.postgres_config import db_URI, table_name

def update_ai_data(id,user_id,response_token,cost):
    conn = psycopg.connect(conninfo=db_URI)
    cur = conn.cursor()
    query = f'''
    UPDATE {table_name}
    SET user_id = %s, response_token = %s, cost = %s
    WHERE id = %s
    '''
    cur.execute(query,(user_id,response_token,cost,id))
    conn.commit()
    cur.close()
    conn.close()


def update_user_data(id, user_id, input_token):
    conn = psycopg.connect(conninfo=db_URI)
    cur = conn.cursor()
    query = f'''
    UPDATE {table_name}
    SET user_id = %s, input_token = %s
    WHERE id = %s
    '''
    cur.execute(query, (user_id, input_token, id))
    conn.commit()
    cur.close()
    conn.close()

def get_id(session_id):
    conn = psycopg.connect(conninfo=db_URI)
    cur = conn.cursor()
    query = f'''
    SELECT id FROM {table_name}
    WHERE session_id = %s
    ORDER BY id DESC
    LIMIT 2
    '''
    cur.execute(query,(session_id,))
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows
