PROJECT_PATH = $(abspath .)
GRADLE = ./gradlew

build-frontend:
	echo "Building frontend..."
	cd frontend && npm run build
	echo "Frontend built :)"

run-frontend:
	echo "Starting frontend"
	tmux new-session -s frontend -d 'cd frontend && npx serve -s build -l 80'

run-backend-develop:
	echo "Starting backend in development mode. Have fun :D "
	cd backend && $(GRADLE) run --args='--spring.profiles.active=develop' &

run-backend:
	echo "Starting backend in production mode. Behold the power of DronHub <3"
	tmux new-session -s backend -d "cd backend && $(GRADLE) run --args='--spring.profiles.active=prod'"

run-simulator:
	echo "Starting simulator. Watch out, Pythons can bite."
	tmux new-session -s simulator -d "cd simulator && python3 simulator.py"

start-rabbitmq:
	docker pull rabbitmq:3-management
	docker run -d --name dronhub_rabbitmq -p 5672:5672 -p 5673:5673 -p 15672:15672 rabbitmq:3-management
	sleep 10

develop: start-rabbitmq run-backend-develop run-frontend run-simulator
	echo "Started application in development mode."

all: start-rabbitmq run-backend run-frontend run-simulator
	echo "Started application in production mode."
