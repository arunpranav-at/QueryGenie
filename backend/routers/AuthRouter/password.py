import hashlib

def hash_password(password):
    pwd_bytes = password.encode('utf-8')
    hashed_pwd = hashlib.sha256(pwd_bytes).hexdigest()
    return hashed_pwd