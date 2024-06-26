import numpy as np
import pandas as pd
from datetime import datetime
import time
import uuid

# Parametry okręgu
center_lat = 50.0619
center_lon = 19.9369
radius = 0.01  # Promień w stopniach (około 1 km)
points = 48  # Liczba punktów na każdą ścieżkę
angles = np.linspace(0, 2 * np.pi, points, endpoint=False)  # Kąty w radianach

# Generowanie współrzędnych geograficznych dla okręgu
circle_latitudes = center_lat + (radius * np.sin(angles))

circle_longitudes = center_lon + (radius * np.cos(angles))
circle_headings = (angles * 180 / np.pi + 90) % 360  # Konwersja radianów na stopnie, przesunięcie o 90 stopni

# Parametry kwadratu
square_latitudes = []
square_longitudes = []
square_headings = []
side_length = 0.02  # Długość boku kwadratu w stopniach (około 2 km)
for i in range(4):
    for j in range(points // 4):
        if i == 0:
            square_latitudes.append(center_lat - side_length / 2 + (side_length / (points // 4)) * j )
            square_longitudes.append(center_lon - side_length / 2 )
            square_headings.append(90)
        elif i == 1:
            square_latitudes.append(center_lat + side_length / 2)
            square_longitudes.append(center_lon - side_length / 2 + (side_length / (points // 4)) * j)
            square_headings.append(0)
        elif i == 2:
            square_latitudes.append(center_lat + side_length / 2 - (side_length / (points // 4)) * j)
            square_longitudes.append(center_lon + side_length / 2)
            square_headings.append(270)
        elif i == 3:
            square_latitudes.append(center_lat - side_length / 2)
            square_longitudes.append(center_lon + side_length / 2 - (side_length / (points // 4)) * j)
            square_headings.append(180)

# Parametry trapezu
trapezoid_latitudes = []
trapezoid_longitudes = []
trapezoid_headings = []
base_length = 0.02
top_length = 0.01
height = 0.01
for i in range(4):
    for j in range(points // 4):
        if i == 0:
            trapezoid_latitudes.append(center_lat - height / 2 + (height / (points // 4)) * j)
            trapezoid_longitudes.append(center_lon - base_length / 2)
            trapezoid_headings.append(90)
        elif i == 1:
            trapezoid_latitudes.append(center_lat + height / 2)
            trapezoid_longitudes.append(center_lon - base_length / 2 + ((base_length - top_length) / 2 + top_length / (points // 4)) * j)
            trapezoid_headings.append(0)
        elif i == 2:
            trapezoid_latitudes.append(center_lat + height / 2 - (height / (points // 4)) * j)
            trapezoid_longitudes.append(center_lon + base_length / 2)
            trapezoid_headings.append(270)
        elif i == 3:
            trapezoid_latitudes.append(center_lat - height / 2)
            trapezoid_longitudes.append(center_lon + base_length / 2 - ((base_length - top_length) / 2 + top_length / (points // 4)) * j)
            trapezoid_headings.append(180)

def generate_additional_data(points, start_altitude=100, end_altitude=150, start_fuel=100, end_fuel=50):
    altitudes = np.linspace(start_altitude, end_altitude, points)
    fuel_levels = np.linspace(start_fuel, end_fuel, points)
    speeds = np.random.uniform(25, 35, points)
    current_moments = np.arange(points)
    return altitudes, fuel_levels, speeds, current_moments

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

# Generowanie pozostałych danych
circle_altitudes, circle_fuel, circle_speeds, circle_moments = generate_additional_data(points)
square_altitudes, square_fuel, square_speeds, square_moments = generate_additional_data(points)
trapezoid_altitudes, trapezoid_fuel, trapezoid_speeds, trapezoid_moments = generate_additional_data(points)

# Konwersja współrzędnych do formatu DMS
circle_coords_dms = [convert_to_dms(lat, lon) for lat, lon in zip(circle_latitudes, circle_longitudes)]
square_coords_dms = [convert_to_dms(lat, lon) for lat, lon in zip(square_latitudes, square_longitudes)]
trapezoid_coords_dms = [convert_to_dms(lat, lon) for lat, lon in zip(trapezoid_latitudes, trapezoid_longitudes)]

tick_number = 0
flag = "UPD"
type = "Airborne"
signal = "Mode S"
frequency = 1000
sensor_lat = "500342N"
sensor_lon = "195614E"
sensor_label = "Krakow1"
notes = "Notatka numer 1"
ext1 = "Parametr ext 1",
ext2 = "Parametr ext 2",
ext3 = "Parametr ext 3",
ext4 = "Parametr ext 4",
ext5 = "Parametr ext 5",
ext6 = "Parametr ext 6"

if __name__ == "__main__":
    print("Simulator started...")

    while True:
        index = tick_number % points
        file_name = "File"+str(uuid.uuid4())
        server = "Server1"
        now = datetime.now()
        day_date = now.strftime("%d%m%Y")
        day_time = now.strftime("%H:%M:%S.%f")[:-2]

        df_circle = pd.DataFrame([{
            "Filename":file_name,
            "Server":server,
            "Date":day_date,
            "Time":day_time,
            "Flag":flag,
            "Id":"0000001",
            "IdExt": str(uuid.uuid4()),
            "Latitude":circle_coords_dms[index][0],
            "Longitude":circle_coords_dms[index][1],
            "Heading":int(circle_headings[index]),
            "Speed":int(circle_speeds[index]),
            "Altitude":int(circle_altitudes[index]),
            "Country":"Poland",
            "Operator":"UK",
            "Identification":1,
            "IdentificationLabel":"Dark Blue",
            "Model":"DJI Air 2S",
            "RegistrationNumber":"XDA123",
            "Sign":"UKXDA123",
            "Type":type,
            "Fuel":int(circle_fuel[index]),
            "Signal":signal,
            "Frequency":frequency,
            "SensorLat":sensor_lat,
            "SensorLon":sensor_lon,
            "SensorLabel":sensor_label,
            "Notes":notes,
            "Ext1":ext1,
            "Ext2":ext2,
            "Ext3":ext3,
            "Ext4":ext4,
            "Ext5":ext5,
            "Ext6":ext6
        }])

        df_square = pd.DataFrame([{
            "Filename":file_name,
            "Server":server,
            "Date":day_date,
            "Time":day_time,
            "Flag":flag,
            "Id":"0000002",
            "IdExt": str(uuid.uuid4()),
            "Latitude":square_coords_dms[index][0],
            "Longitude":square_coords_dms[index][1],
            "Heading":int(square_headings[index]),
            "Speed":int(square_speeds[index]),
            "Altitude":int(square_altitudes[index]),
            "Country":"Poland",
            "Operator":"US",
            "Identification":2,
            "IdentificationLabel":"Dark Green",
            "Model":"DJI Mavic Air",
            "RegistrationNumber":"YGB456",
            "Sign":"USYGB456",
            "Type":type,
            "Fuel":int(square_fuel[index]),
            "Signal":signal,
            "Frequency":frequency,
            "SensorLat":sensor_lat,
            "SensorLon":sensor_lon,
            "SensorLabel":sensor_label,
            "Notes":notes,
            "Ext1":ext1,
            "Ext2":ext2,
            "Ext3":ext3,
            "Ext4":ext4,
            "Ext5":ext5,
            "Ext6":ext6
        }])

        df_trapezoid = pd.DataFrame([{
            "Filename":file_name,
            "Server":server,
            "Date":day_date,
            "Time":day_time,
            "Flag":flag,
            "Id":"0000003",
            "IdExt": str(uuid.uuid4()),
            "Latitude":trapezoid_coords_dms[index][0],
            "Longitude":trapezoid_coords_dms[index][1],
            "Heading":int(trapezoid_headings[index]),
            "Speed":int(trapezoid_speeds[index]),
            "Altitude":int(trapezoid_altitudes[index]),
            "Country":"Poland",
            "Operator":"PL",
            "Identification":3,
            "IdentificationLabel":"Dark Aqua",
            "Model":"DJI Phantom 4 Pro",
            "RegistrationNumber":"WZB789",
            "Sign":"PLWZB789",
            "Type":type,
            "Fuel":int(trapezoid_fuel[index]),
            "Signal":signal,
            "Frequency":frequency,
            "SensorLat":sensor_lat,
            "SensorLon":sensor_lon,
            "SensorLabel":sensor_label,
            "Notes":notes,
            "Ext1":ext1,
            "Ext2":ext2,
            "Ext3":ext3,
            "Ext4":ext4,
            "Ext5":ext5,
            "Ext6":ext6
        }])

        combined_data = pd.concat([df_circle, df_square, df_trapezoid])
        combined_data.to_csv("../shared_directory/data.csv", sep=',', index=False)
        tick_number += 1

        time.sleep(2)