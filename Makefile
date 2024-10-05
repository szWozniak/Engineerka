PROJECT_PATH = $(abspath .)
GRADLE = ./gradlew
check_defined = \
    $(strip $(foreach 1,$1, \
        $(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
    $(if $(value $1),, \
    $(error Undefined $1$(if $2, ($2)) Please set environtment variable or run in development mode with 'make develop'))
	

all: check-variables clear-docker kill-tmux clean check-deps start-rabbitmq run-backend run-frontend run-simulator
	echo "Started application in production mode."

check-variables:
	$(call check_defined, DATABASE_URL)
	$(call check_defined, DATABASE_USERNAME)
	$(call check_defined, DATABASE_PASSWORD)


check-deps:
	@echo "Checking dependencies..."
	@$(MAKE) check-docker
	@$(MAKE) check-java
	@$(MAKE) check-gradle
	@$(MAKE) check-python
	@$(MAKE) check-pip
	@$(MAKE) check-tmux
	@echo "Dependencies satisfied. You are good to go <3"

check-docker:
	@echo "Checking docker"
	@if command -v docker > /dev/null; then \
		echo "Docker found :)"; \
	else \
		echo "Docker not found"; \
		echo "Please install docker :<";\
		exit 1; \
	fi

check-java:
	@echo "Checking java"
	@if command -v java > /dev/null; then \
		echo "Java found :)"; \
	else \
		echo "Java not found :<";\
		echo "Please install Java to run application";\
		exit 1;\
	fi

check-gradle:
	@echo "Checking gradle"
	@if command -v gradle > /dev/null; then \
		echo "Gradle found :)"; \
	else \
		echo "Gradle not found"; \
		echo "Please install Gradle to run DronHub"; \
	fi

check-python:
	@echo "Checking python"
	@if command -v python3 > /dev/null; then \
		echo "Found python3 <3"; \
		exit 0; \
	else \
		if command -v python; then \
			echo "Found python <3"; \
			exit 0; \
		else \
			exit 1; \
		fi \
	fi

check-pip:
	@echo "Checking pip"
	@if command -v python3 > /dev/null; then \
		if command -v pip3 > /dev/null; then \
			echo "pip3 detected, downloading python dependencies"; \
		else \
			echo "pip3 not found. Please install pip3"; \
			exit 1; \
		fi \
	else \
		if command -v pip > /dev/null; then \
			echo "pip detected, downloading python dependencies";\
		else \
			echo "pip not found. Please install pip3";\
			exit 1;\
		fi \
	fi

check-tmux:
	@echo "Checking tmux"
	@if command -v tmux > /dev/null; then \
		echo "tmux found :)"; \
	else \
		echo "tmux not found"; \
		echo "Please install tmux to run DronHub"; \
	fi

build-frontend:
	@echo "Building frontend..."
	cd frontend && npm install && npm run build
	echo "Frontend built :)"

run-frontend: build-frontend
	@echo "Starting frontend"
	tmux new-session -s frontend -d 'cd frontend && npx serve -s build -l 80'

run-backend-develop:
	@echo "Starting backend in development mode. Have fun :D "
	tmux new-session -s backend "cd backend && $(GRADLE) run --args='--spring.profiles.active=develop'"

run-backend:
	echo "Starting backend in production mode. Behold the power of DronHub <3"
	tmux new-session -s backend  -d "cd backend && $(GRADLE) run --args='--spring.profiles.active=prod'"

check-python-deps:
	@echo "Cheking python dependencies"
	@if command -v pip3 > /dev/null; then \
		pip3 install numpy pandas pika> /dev/null; \
	else \
		pip install numpy pandas pika > /dev/null; \
	fi
	@echo "All dependencies satisfied :>"

run-simulator: check-python-deps
	@echo "Starting simulator. Watch out, Pythons can bite."
	tmux new-session -s simulator -d "cd simulator && python3 simulator.py"

clear-docker:
	@if docker container ls | grep 'dronhub_rabbitmq'; then \
		docker container stop dronhub_rabbitmq; \
		docker container rm dronhub_rabbitmq; \
	else \
		if docker container ls -a | grep 'dronhub_rabbitmq'; then\
			docker container rm dronhub_rabbitmq; \
		fi \
	fi
	@if docker container ls | grep 'dronhub_mysql'; then \
		docker container stop dronhub_mysql; \
		docker container rm dronhub_mysql; \
	else \
		if docker container ls -a | grep 'dronhub_mysql'; then\
			docker container rm dronhub_mysql; \
		fi \
	fi
	
start-rabbitmq: 
	docker pull rabbitmq:3-management
	docker run -d --name dronhub_rabbitmq -p 5672:5672 -p 5673:5673 -p 15672:15672 rabbitmq:3-management

start-mysql:
	docker pull mysql
	docker run -d --name dronhub_mysql -e MYSQL_ROOT_PASSWORD=passwd -e MYSQL_USER=dronhub -e MYSQL_PASSWORD=passwd -e MYSQL_DATABASE=dronhub -p 3306:3306 mysql 

develop: kill-tmux clear-docker start-rabbitmq start-mysql run-frontend run-simulator run-backend-develop
	echo "Started application in development mode."

clean:
	rm -rf backend/build/
	rm -rf frontend/build/
	rm -rf shared_folder/*

kill-tmux:
	@if tmux ls | grep frontend; then\
		tmux kill-session -t frontend;\
	fi
	@if tmux ls | grep backend; then \
		tmux kill-session -t backend; \
	fi
	@if tmux ls | grep simulator; then \
		tmux kill-session -t simulator; \
	fi		
