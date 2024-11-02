import psycopg
from configs.postgres_config import db_URI

class DB:
    def __init__(self):
        self.conn = psycopg.connect(conninfo=db_URI)
        self.cur = self.conn.cursor()

    def query(self, query, args):
        self.cur.execute(query, args)
        self.conn.commit()
        return self.cur

    def close(self):
        self.cur.close()
        self.conn.close()