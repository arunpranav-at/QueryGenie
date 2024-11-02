from datetime import datetime
import pytz

def convert_to_ist(utc_time_str):
    utc_time = datetime.fromisoformat(utc_time_str)
    utc_zone = pytz.utc
    ist_zone = pytz.timezone('Asia/Kolkata')
    ist_time = utc_time.astimezone(ist_zone)
    return ist_time
