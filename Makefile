#
# Env
#
-include .env

EXECUTOR = docker exec -i $(PROJECT_NAME)-nextjs /bin/sh -c

DEFAULT_CONTAINER := nextjs
# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := logs term restart
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(or $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS)),$(DEFAULT_CONTAINER))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

#
##@ HELP
#

.PHONY: help
help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
.DEFAULT_GOAL := help

#
##@ DOCKER MASTER COMMANDS
#

install: ## Fully install the project with docker, then run a container
install:
	@${MAKE} checkenv; \
	 ${MAKE} vhosts; \
	 ${MAKE} build; \
	 ${MAKE} start-install;

start: ## Start container
start: stop docker-compose-up ${MAKE} logs;

start-install: ## Install vendors and then start
start-install: stop vendors docker-compose-up

stop: ## Stop container
stop: docker-compose-down

restart: ## Restart container
restart:
	docker-compose restart $(COMMAND_ARGS)

#
##@ DOCKER UNIT COMMANDS
#

docker-compose-up: # Start a container
	@echo "Starting container...";
	@if [ "$(shell docker ps | grep $(PROJECT_NAME)-nextjs)" != "" ]; then \
		echo "Container already up. Skipping."; \
	else \
		docker-compose up -d --force-recreate nextjs; \
	fi;

docker-compose-down: # Stop a container
	@echo "Stopping container...";
	@if [ "$(shell docker ps | grep $(PROJECT_NAME)-nextjs)" != "" ]; then \
		docker-compose down --remove-orphans --volumes; \
	else \
		echo "No container up. Skipping."; \
	fi;

vendors: # Install vendors
	@echo "Installing vendors...";
	@if [ -d node_modules ]; then \
		echo "Vendors already installed. Skipping."; \
	else \
		docker-compose up --build vendors; \
	fi; \

build: # Build docker image
	@echo "Building docker image..."
	docker-compose build

logs: ## Show & follow nextjs container logs
	docker logs -f $(PROJECT_NAME)-$(COMMAND_ARGS)

term: ## Enter in container terminal as root
	docker-compose exec -u root $(COMMAND_ARGS) /bin/sh

prettier:
	$(EXECUTOR) "npm run prettier"

rl: ## Restart main container &
rl:
	@${MAKE} restart nextjs; \
	 ${MAKE} logs nextjs; \

#
##@ ENVIRONMENT
#

checkenv: ## Check if .env file exists and create it if not
	@if [ ! -f .env ]; then \
		echo "Copying .env.dist to .env"; \
		cp .env.dist .env; \
	fi;
	. .env

#
##@ VIRTUAL HOSTS
#

LINE1='\\\# Added by ${PROJECT_NAME}'
HOST_LINE='127.0.0.1 ${PROJECT_NAME}.lol'
LINE3='\\\# End of section'

vhosts: ## Add required lines to /etc/hosts file if missing
	@if [ $(shell cat /etc/hosts | grep ${PROJECT_NAME}.lol -c) -ne 0 ]; then \
		echo "Hosts already set."; \
	else \
		echo "Updating hosts file..."; \
		sudo -- sh -c -e "echo '$(LINE1)\n$(HOST_LINE)\n$(LINE3)' >> /etc/hosts"; \
	fi;
