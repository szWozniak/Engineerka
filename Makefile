PROJECT_PATH = $(abspath .)
GRADLE = ./gradlew

build-frontend:
	echo "Building frontend..."
	cd frontend && npm run build
	echo "Frontend built :)"

run-frontend: build-frontend
	echo "Starting frontend"
	cd frontend && npx serve -s build -l 80 &

run-backend-develop:
	echo "Starting backend in development mode. Have fun :D "
	cd backend && $(GRADLE) run --args='--spring.profiles.active=develop' &

run-backend:
	echo "Starting backend in production mode. Behold the power of DronHub <3"
	cd backend && $(GRADLE) run --args='--spring.profiles.active=prod' &

run-simulator:
	echo "Starting simulator. Watch out, Pythons can bite."
	cd simulator && python3 simulator.py

develop: run-backend-develop run-frontend run-simulator
	echo "Started application in development mode."

all: run-backend run-frontend run-simulator
	echo "Started application in production mode."
