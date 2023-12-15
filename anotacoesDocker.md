# Docker

- Instalar o Docker no pc
# Usar o seguinte comando para baixar e configurar o postgres
docker run --name api-solid-pg  -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql

# Comandos docker

- Comando para ver o container que estão rodando
docker ps

- Container que eu ja criei em algum momento
docker ps -a

- Comando para iniciar o container
docker start api-solid-pg
Ou passa o ID do container
docker start 3342FA11231...

- Comando para para o container
docker stop api-solid-pg
Ou passa o ID do container
docker stop 3342FA11231...

- Comando para deletar p container
docker rm api-solid-pg

# Docker compose
- Depois de configurar o docker-compose.yml exclua o container 
- rode o seguinte comando
docker compose up -d

# Para excluir todos os container criado pelo docker-compose
docker compose down

# Apena parar o container
docker compose stop

## ATENCAO SE APARECER ESSA MENSAGEM NO WINDOWS BASTA ABRIR O PROGRAMA DOCKER DESCKTOP
The command 'docker' could not be found in this WSL 2 distro.
We recommend to activate the WSL integration in Docker Desktop settings.

For details about using Docker Desktop with WSL 2, visit:

https://docs.docker.com/go/wsl2/
