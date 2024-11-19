# CST438 Project 3
Jonathan Barroso, Adrian Haro, Caitlin Susbilla, Saniya Wairkar

## Technologies Used
Basic tech stack:
* Express, Node.JS -- Backend framework
* MySQL (MariaDB) -- Persistent database
* React.JS -- Frontend framework
* OAuth2 -- User authentication
* Docker -- Containerized execution
* Heroku -- Cloud deployment

## Running project
This project is meant to run completely and totally within Docker.
To do so, make sure Docker is running on your machine,
and that you have all the requisite tools.

On a first run, or after making any changes, run `rebuild.sh` or `rebuild.ps1`
depending on the type of machine you're using. These will build the container
according to the latest changes and run it.

Run `docker-compose up`, or `docker-compose up -d` to not see logs.
The containers will all run simultaneously, notwithstanding any bugs.

For security reasons, the DB password is not included in the repository.
Bugs will occur if you don't remediate for this.
