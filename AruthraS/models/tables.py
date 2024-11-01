from .db import DB

table_name = "tables"

def add_table(structure,session_id):
    db = DB()
    name = structure.name
    columns = structure.column
    dataType = structure.dataType
    constraints = structure.constraints
    query = f'''
    INSERT INTO {table_name} (name, columns, data_type, constraints, session_id) VALUES (%s, %s, %s, %s, %s) RETURNING id
    '''
    curr = db.query(query,(name,columns,dataType,constraints,session_id))
    table_id = curr.fetchone()[0]
    db.close()
    return table_id

def get_table(table_id):
    db = DB()
    query = f'''
    SELECT * FROM {table_name} WHERE id = %s
    '''
    curr = db.query(query,(table_id,))
    table = curr.fetchone()
    db.close()
    # (UUID('cc813bcb-152a-42e9-bb39-77d32aa43d31'), datetime.datetime(2024, 11, 1, 9, 7, 57, 572762, tzinfo=datetime.timezone.utc),
#  'emp_table', ['id', 'name'], ['int', 'string'], ['primaryKey(id)'], UUID('30e516ad-ac9e-4a01-af25-a9d520b5d5dc'))
    structure = {
        "name": table[2],
        "column": table[3],
        "dataType": table[4],
        "constraints": table[5]
    }
    return structure

def get_tableId(session_id):
    db = DB()
    query = f'''
    SELECT id FROM {table_name} WHERE session_id = %s
    '''
    curr = db.query(query,(session_id,))
    table_id = curr.fetchone()[0]
    db.close()
    return table_id