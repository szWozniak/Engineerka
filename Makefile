PROJECT_PATH = $(abspath .)
GRADLE = ./gradlew
stop-database:
	@if docker container ls | grep "dronhub" ; then \
		docker container stop dronhub_db; \
		docker container rm dronhub_db; \
		echo "Container stopped"; \
	else \
		echo "Container stopped"; \
	fi

create-volume:
	@if docker volume ls | grep "postgres_db_volume" ; then\
		echo "Volume already exists"; \
	else \
		echo "Creating volume for Postgres database"; \
		docker volume create postgres_db_volume;\
		echo "Created volume for postgres";\
	fi

clear-volume: stop-database
	@if docker volume ls | grep postgres_db_volume; then\
		docker volume rm postgres_db_volume;\
		docker volume create postgres_db_volume;\
	else \
		echo "Creating volume for Postgres database";\
		docker volume create postgres_db_volume;\
		echo "Created volume for postgres";\
	fi

start-database:	stop-database create-volume
	docker pull postgres:latest
	
	docker run -d -e POSTGRES_PASSWORD=zaq12wsx -e POSTGRES_USER=dronhub -e POSTGRES_DB=dronhub -v postgres_db_volume:/var/lib/postgresql/data \
        --name dronhub_db -p 5432:5432 postgres:latest

start-rabbitmq: 
	docker pull rabbitmq:3-management

	docker run -d --name dronhub_rabbitmq -p 5672:5672 -p 5673:5673 -p 15672:15672 rabbitmq:3-management

all: start-rabbitmq
	cd backend && $(GRADLE) run
