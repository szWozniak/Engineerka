import numpy as np
import pandas as pd
from datetime import datetime
import random
import string
import time
import uuid
import pika

CENTER_LATITUDE = 50.0619
CENTER_LONGITUDE = 19.9369
NUMBER_OF_DRONES = 10
MIN_NUMBER_OF_POINTS = 10
MAX_NUMBER_OF_POINTS = 15
MIN_STOP_TICKS = 5
MAX_STOP_TICKS = 20
MAX_FLIGHT_ALT = 120
COUNTRIES = ["Poland", "Germany", "France", "Spain"]
OPERATORS = ["PL", "DE", "FR", "ES"]
IDENTIFICATION_LABELS = ["Dark Red", "Red", "Gold", "Yellow", "Dark Green", "Green", "Aqua", "Dark Aqua", "Dark Blue", "Blue", "Light Purple", "Dark Purple", "White", "Gray", "Dark Gray", "Black"]
MODELS = ["DJI Mini 4 Pro", "DJI Mini 3", "DJI Air 3", "DJI Mavic 3 Pro", "DJI Air 2S rival", "DJI Mavic 3 Classic"]

def generate_random_registration_number():
    letters = random.choices(string.ascii_uppercase, k=3)
    digits = random.choices(string.digits, k=3)
    
    random_string = letters + digits

    return ''.join(random_string)

def generate_drone_data(i, drones_data):
    country = random.choice(COUNTRIES)
    operator = random.choice(OPERATORS)
    identification = random.randint(1, 16)
    identification_label = IDENTIFICATION_LABELS[identification-1]
    model = random.choice(MODELS)
    registration_number = generate_random_registration_number()
    sign = operator + registration_number

    drones_data[i] = {'country': country, 'operator': operator, 'identification': identification, 'identification_label': identification_label, 'model': model, 'registration_number': registration_number, 'sign': sign, 'flight': None}

def calculate_heading(latitude_before, longitude_before, latitude_after, longitude_after):
    latitude_before_radians = np.radians(latitude_before)
    latitude_after_radians = np.radians(latitude_after)

    longitude_difference_radians = np.radians(longitude_after - longitude_before)

    x = np.sin(longitude_difference_radians) * np.cos(latitude_after_radians)
    y = np.cos(latitude_before_radians) * np.sin(latitude_after_radians) - (np.sin(latitude_before_radians) * np.cos(latitude_after_radians) * np.cos(longitude_difference_radians))

    initial_heading = np.arctan2(x, y)
    initial_heading = np.degrees(initial_heading)

    compass_heading = (initial_heading + 360) % 360

    return compass_heading

def convert_to_dms(lat, lon):
    lat_deg = int(lat)
    lat_min = int((lat - lat_deg) * 60)
    lat_sec = (lat - lat_deg - lat_min / 60) * 3600

    lon_deg = int(lon)
    lon_min = int((lon - lon_deg) * 60)
    lon_sec = (lon - lon_deg - lon_min / 60) * 3600

    lat_hemisphere = 'N' if lat >= 0 else 'S'
    lon_hemisphere = 'E' if lon >= 0 else 'W'

    lat_str = f"{abs(lat_deg):02}{abs(lat_min):02}{abs(lat_sec):02.0f}{lat_hemisphere}"
    lon_str = f"{abs(lon_deg):03}{abs(lon_min):02}{abs(lon_sec):02.0f}{lon_hemisphere}"

    return lat_str, lon_str

def generate_flight_ticks(starting_latitude, starting_longitude):
    number_of_points = random.randint(MIN_NUMBER_OF_POINTS, MAX_NUMBER_OF_POINTS)
    latitudes = [0 for _ in range(number_of_points)]
    longitudes = [0 for _ in range(number_of_points)]
    headings = np.zeros(number_of_points)
    altitudes = np.zeros(number_of_points)

    scale_factor_geo = 0.0005  
    alpha = 2.5
    time = np.linspace(0, np.pi, number_of_points)
    shaping_factor = np.sin(time)

    fuel = np.linspace(100, 50, number_of_points)
    speeds = np.random.uniform(25, 35, number_of_points)
    lat_before = starting_latitude
    lon_before = starting_longitude
    alt_before = 0

    for i in range(number_of_points):
        step_length = np.random.pareto(alpha)
        theta = np.random.uniform(0, 2 * np.pi)
        
        latitudes[i] = lat_before + step_length * np.cos(theta) * scale_factor_geo
        longitudes[i] = lon_before + step_length * np.sin(theta) * scale_factor_geo
        altitudes[i] = min(alt_before + np.abs(step_length * shaping_factor[i]), MAX_FLIGHT_ALT)
        headings[i-1] = calculate_heading(lat_before, lon_before, latitudes[i], longitudes[i]) 

        lat_before = latitudes[i]
        lon_before = longitudes[i]
        alt_before = altitudes[i]

        latitudes[i], longitudes[i] = convert_to_dms(latitudes[i], longitudes[i])

    return number_of_points, latitudes, longitudes, headings, altitudes, fuel, speeds

def generate_drone_flight_data():
    starting_latitude = CENTER_LATITUDE + random.uniform(-0.01, 0.01)
    starting_longitude = CENTER_LONGITUDE + random.uniform(-0.01, 0.01)

    number_of_points, latitudes, longitudes, headings, altitudes, fuel, speeds = generate_flight_ticks(starting_latitude, starting_longitude)
    
    return {'number_of_points': number_of_points, 'latitudes': latitudes, 'longitudes': longitudes, 'headings': headings, 'speeds': speeds, 'altitudes': altitudes, 'fuel': fuel}

def generate_drones():
    drones_data = [None for _ in range(NUMBER_OF_DRONES)]

    for i in range(NUMBER_OF_DRONES):
        generate_drone_data(i, drones_data)
    
    return drones_data

def prepare_single_flight_tick(index, drone_data, flight_data, file_name, day_date, day_time, flag):

    return pd.DataFrame([{
            "Filename":file_name,
            "Server":"Server1",
            "Date":day_date,
            "Time":day_time,
            "Flag":flag,
            "Id":"0000001",
            "IdExt": str(uuid.uuid4()),
            "Latitude":flight_data['latitudes'][index],
            "Longitude":flight_data['longitudes'][index],
            "Heading":int(flight_data['headings'][index]),
            "Speed":int(flight_data['speeds'][index]),
            "Altitude":int(flight_data['altitudes'][index]),
            "Country":drone_data['country'],
            "Operator":drone_data['operator'],
            "Identification":int(drone_data['identification']),
            "IdentificationLabel":drone_data['identification_label'],
            "Model":drone_data['model'],
            "RegistrationNumber":drone_data['registration_number'],
            "Sign":drone_data['sign'],
            "Type":"Airborne",
            "Fuel":int(flight_data['fuel'][index]),
            "Signal":"Mode S",
            "Frequency":1000,
            "SensorLat":"500342N",
            "SensorLon":"195614E",
            "SensorLabel":"Krakow1",
            "Notes":"Notatka numer 1",
            "Ext1":"Parametr ext 1",
            "Ext2":"Parametr ext 2",
            "Ext3":"Parametr ext 3",
            "Ext4":"Parametr ext 4",
            "Ext5":"Parametr ext 5",
            "Ext6":"Parametr ext 6"
        }])

def init_connection():
    global channel

    credentials = pika.PlainCredentials('guest','guest')
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost', credentials=credentials))
    channel = connection.channel()

    channel.exchange_declare('fileExchange', durable=True, exchange_type='topic')

    channel.queue_declare(queue='fileQueue')
    channel.queue_bind(queue='fileQueue', exchange='fileExchange', routing_key='fileCreation')

def close_connection():
    global channel

    channel.close()

channel = None
drones = generate_drones()
drones_stop_ticks = [0 for _ in range(NUMBER_OF_DRONES)]
drones_tick_indexes = [0 for _ in range(NUMBER_OF_DRONES)]

if __name__ == "__main__":
    init_connection()

    print("Simulator started...")

    while True:
        file_name = "File"+str(uuid.uuid4())
        now = datetime.now()
        day_date = now.strftime("%d%m%Y")
        day_time = now.strftime("%H:%M:%S.%f")[:-2]
        drones_dfs = []

        for i in range(NUMBER_OF_DRONES):
            if drones_stop_ticks[i] != 0:
                drones_stop_ticks[i] -= 1
                continue
            
            index = drones_tick_indexes[i]
            drones_tick_indexes[i] += 1
            flag = "UPD"

            if index == 0:
                flag = "BEG"
                drones[i]['flight'] = generate_drone_flight_data()
            elif index == drones[i]['flight']['number_of_points'] - 1:
                flag = "DROP"
                drones_tick_indexes[i] = 0
                drones_stop_ticks[i] = random.randint(MIN_STOP_TICKS, MAX_STOP_TICKS)

            drones_dfs.append(prepare_single_flight_tick(index, drones[i], drones[i]['flight'], file_name, day_date, day_time, flag))

        if(len(drones_dfs) > 0):
            combined_data = pd.concat(drones_dfs)
            combined_data.to_csv(f"../shared_directory/{file_name}.csv", sep=',', index=False)
            channel.basic_publish(exchange='fileExchange', routing_key='fileCreation', body=f"{file_name}.csv")

            print(f"New data saved to /shared_directory/{file_name}.csv")

            time.sleep(2)
    
    close_connection()