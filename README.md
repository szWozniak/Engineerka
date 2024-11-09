# Dronhub - gorące drony w Twojej okolicy!

---
## Getting started
Kilka informacji na temat uruchamiania systemu Dronhub na lokalnym urządzeniu

---

### 1. Gotowe obrazy
Wymagania:
- docker-compose

Jak uruchomić?\
Wersja z docker-compose:
```shell
docker-compose -f docker-compose-prebuilt.yaml up -d
```
Użycie docker-compose z tym plikiem spowoduje pobranie najnowszych udostępnionych na dockerhub i uruchomienie z ich wykorzystaniem całej aplikacji

---
### 2. Samodzielna budowa obrazów z kodu źródłowego:

Wymagania:
 - ~~Java 17~~
 - ~~Gradle~~
 - ~~npm~~
 - docker-compose

~~Żeby zbudować obrazy z kodu źródłowego musimy przygotować zbudowane komponenty aplikacji~~ Już nie musimy. Teraz kod przygotowuję sie w Dockerfilach, na poziomie obrazu.

```shell
docker-compose -f docker-compose-scratch.yaml up -d
```

---
### 3. Uruchamianie w trybie developmentu (każdy komponent osobno)

Wymagania:
- uruchomiony brocker RabbitMQ
- uruchomiana baza danych MySQL
- zmienne środowiskowe z danymi dostępu do bazy

Uruchamianie bazy danych 
```shell
docker pull mysql
docker run -d --name dronhub_mysql -p 3306:3306 -e MYSQL_DATABASE=<nazwa_bazy_danych> -e MYSQL_USER=<uzytkownik_bazy> -e MYSQL_PASSWORD=<haslo_do_bazy> -e MYSQL_ROOT_PASSWORD=passwd mysql
```

Uruchamianie brockera RabbitMQ:
```shell
docker pull rabbitmq:3-management
docker run -d --name dronhub_rabbitmq -p 5672:5672 -p 5673:5673 -p 15672:15672 rabbitmq:3-management
```

Ustawienie zmiennych środowiskowych (na przykładzie macOS):
```shell
export DATABASE_URL=jdbc:mysql://localhost:3306/<nazwa_bazy_danych>
export DATABASE_USERNAME=<uzytkownik_bazy>
export DATBASE_PASSWORD=<haslo_do_bazy>
```

Uruchamianie aplikacji:
Do pełnego uruchomienia aplikacji zalecene jest wykorzystanie 3 terminali:

W pierwszym uruchamiamy backend:
```shell
cd ./backend 
./gradlew run --args='--spring.profiles.active=develop'
```

W drugim uruchamiamy symulator:
```shell
cd ./simulator
pip3 install -r ./requirements.txt // Jeżeli nie mamy zainstalowanych modułów
python3 simulator.py
```

W ostatnim frontend:
```shell
cd ./frontend
npm start --port 80
```
---

### 4. Tryb produkcyjny
Co to znaczy? Że podpinamy sami bazę danych (MariaDB) i SpringBoot nie czyści jej po zakończeniu działania. Dane zostają na stałe
Wymagania:
- zmienny środowiskowe z danymi do bazy MariaDB
- docker-compose

Ustawienie zmiennych środowiskowych (na przykładzie macOS):
```shell
export DATABASE_URL=jdbc:mariadb://localhost:3306/<nazwa_bazy_danych>
export DATABASE_USERNAME=<uzytkownik_bazy>
export DATBASE_PASSWORD=<haslo_do_bazy>
```

Uruchamiamy aplikację:
```shell
docker-compose -f docker-compose-prod.yaml up -d
```
---
### Po każdej z tych ścieżek, aplikacja powinna być dostępna pod adresem http://127.0.0.1

