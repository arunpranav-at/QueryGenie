from .db import DB
table_name = 'message_store'

def update_ai_data(id,response_token,cost):
    db = DB()
    query = f'''
    UPDATE {table_name}
    SET response_token = %s, cost = %s
    WHERE id = %s
    '''
    db.query(query,(response_token,cost,id))
    db.close()

def update_user_data(id, input_token):
    db = DB()
    query = f'''
    UPDATE {table_name}
    SET input_token = %s
    WHERE id = %s
    '''
    db.query(query, ( input_token, id))
    db.close()

def get_id(session_id):
    db = DB()
    query = f'''
    SELECT id FROM {table_name} WHERE session_id = %s ORDER BY id DESC LIMIT 2
    '''
    cur = db.query(query,(session_id,))
    rows = cur.fetchall()
    db.close()
    return rows