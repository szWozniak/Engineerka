import numpy as np
import pandas as pd
from datetime import datetime
import functions as f
import random
import string
import time
import uuid

EARTH_RADIUS = 6371.0
CENTER_LATITUDE = 50.0619
CENTER_LONGITUDE = 19.9369
FLIGHT_FUNCTIONS = f.get_all_functions()
NUMBER_OF_POINTS = 100
NUMBER_OF_DRONES = 10
COUNTRIES = ["Poland", "Germany", "France", "Spain"]
OPERATORS = ["PL", "DE", "FR", "ES"]
IDENTIFICATION_LABELS = ["Dark Red", "Red", "Gold", "Yellow", "Dark Green", "Green", "Aqua", "Dark Aqua", "Dark Blue", "Blue", "Light Purple", "Dark Purple", "White", "Gray", "Dark Gray", "Black"]
MODELS = ["DJI Mini 4 Pro", "DJI Mini 3", "DJI Air 3", "DJI Mavic 3 Pro", "DJI Air 2S rival", "DJI Mavic 3 Classic"]

def generate_random_registration_number():
    letters = random.choices(string.ascii_uppercase, k=3)
    digits = random.choices(string.digits, k=3)
    
    random_string = letters + digits

    return ''.join(random_string)

def generate_drone_data(drones_data):
    country = random.choice(COUNTRIES)
    operator = random.choice(OPERATORS)
    identification = random.randint(1, 16)
    identification_label = IDENTIFICATION_LABELS[identification-1]
    model = random.choice(MODELS)
    registration_number = generate_random_registration_number()
    sign = operator + registration_number

    drones_data.append({'country': country, 'operator': operator, 'identification': identification, 'identification_label': identification_label, 'model': model, 'registration_number': registration_number, 'sign': sign})

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

def generate_points_for_function(starting_latitude: float, starting_longitude: float, function):
    t_min = 0
    t_max = 2 * np.pi

    latitudes = []
    longitudes = []
    headings = []
    altitudes = np.linspace(random.randint(10, 100), random.randint(100, 300), NUMBER_OF_POINTS)
    fuel = np.linspace(100, 50, NUMBER_OF_POINTS)
    speeds = np.random.uniform(25, 35, NUMBER_OF_POINTS)
    lat_old = starting_latitude
    lon_old = starting_longitude

    for i in range(NUMBER_OF_POINTS):
        t = t_min + (t_max - t_min) * i / NUMBER_OF_POINTS

        x, y = function(t)

        delta_lon = x * (180 / np.pi) / EARTH_RADIUS / np.cos(np.radians(starting_latitude))
        delta_lat = y * (180 / np.pi) / EARTH_RADIUS

        lat_new = starting_latitude + delta_lat
        lon_new = starting_longitude + delta_lon

        lat_lon_dms = convert_to_dms(round(lat_new,4), round(lon_new,4))
    
        latitudes.append(lat_lon_dms[0])
        longitudes.append(lat_lon_dms[1])
        headings.append(calculate_heading(lat_old, lon_old, lat_new, lon_new))

        lat_old = lat_new
        lon_old = lon_old
    
    return latitudes, longitudes, headings, altitudes, fuel, speeds

def generate_drone_flight_data(drones_flights_data):
    starting_latitude = CENTER_LATITUDE + random.uniform(-0.01, 0.01)
    starting_longitude = CENTER_LONGITUDE + random.uniform(-0.01, 0.01)
    random_function = random.choice(FLIGHT_FUNCTIONS)

    latitudes, longitudes, headings, altitudes, fuel, speeds = generate_points_for_function(starting_latitude, starting_longitude, random_function)
    
    drones_flights_data.append({'latitudes': latitudes, 'longitudes': longitudes, 'headings': headings, 'speeds': speeds, 'altitudes': altitudes, 'fuel': fuel})

def generate_flights():
    flights_data = []

    for _ in range(NUMBER_OF_DRONES):
        generate_drone_flight_data(flights_data)
    
    return flights_data

def generate_drones():
    drones_data = []

    for _ in range(NUMBER_OF_DRONES):
        generate_drone_data(drones_data)
    
    return drones_data

def generate_single_flight_tick(index, drone_data, flight_data, file_name, day_date, day_time, flag):

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

tick_number = 0
drones_data = generate_drones()
flights_data = []

if __name__ == "__main__":
    print("Simulator started...")

    while True:
        index = tick_number % NUMBER_OF_POINTS
        file_name = "File"+str(uuid.uuid4())
        now = datetime.now()
        day_date = now.strftime("%d%m%Y")
        day_time = now.strftime("%H:%M:%S.%f")[:-2]
        drones_dfs = []
        
        flag = "UPD"

        if index == 0:
            flag = "BEG"
            flights_data = generate_flights()
        elif index == NUMBER_OF_POINTS - 1:
            flag = "DROP"

        for i in range(NUMBER_OF_DRONES):
            drones_dfs.append(generate_single_flight_tick(index, drones_data[i], flights_data[i], file_name, day_date, day_time, flag))

        combined_data = pd.concat(drones_dfs)
        combined_data.to_csv("../shared_directory/data.csv", sep=',', index=False)
        tick_number += 1

        print("New data saved to /shared_directory/data.csv")

        if flag == "DROP":
            time.sleep(4)

        time.sleep(2)