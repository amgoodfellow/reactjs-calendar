¯\\\_(ツ)_/¯  
Logo under construction

# ReactJS-Calendar

An application written in ReactJS that hooks up to a database, 
and provides a modern, ADA accessible, and i18n respecting view
of user events

## Installing / Getting started
> This section is a work-in-progress  

For first time developers, an _init_ script is provided that goes through some of the process
of setting up a workstation. Go-lang and postgresql have to be setup on your computer 
for this to work

```shell
    source init.sh
```

This will create a user `coursesuser` and a database `courses` with password `courses`

## Developing

### Built With
- ReactJS using the JSS and Material-UI libraries
- Go - is providing a mock backend for this early development stage
- Postgresql is the database we use, though this frontend aims to be backend agnostic

### Prerequisites
> This section is a work in progress

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/Aaron-G-9/reactjs-calendar.git
cd reactjs-calendar/
go run main.go
CTRL+C
psql -d DBNAME -U DBNAME -W < sql.sql
go run main.go
yarn upgrade && yarn start 
```

And state what happens step-by-step. If there is any virtual environment, local server or database feeder needed, explain here.

### Building
> This section is a work in progress


### Deploying / Publishing
> This section is a work in progress

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

## Configuration
> This section is a work in progress


## Tests

### Accessibility 
### Internationalization 
### Code / Logic 


## Style guide

### Code formatting
This project uses [prettier](https://github.com/prettier/prettier) to format all js/html code and [gofmt](https://golang.org/cmd/gofmt/) to format all Go code
### Code opinions
The contributors of this project have a couple of best practice React/JS preferences:  
- React's `render()` methods should have as little logic as possible inside of them, we prefer to call other methods that take care of the logic elswhere
- ES6 classes, functions, and stateless functional components are preferred when possible
- In keeping with the Material-UI way of doing things, we prefer to have styles declared with JSS instead of inline style objects whenever possible
- `Object.is()` is preferred over the `===` operator


## Database

The developers of this project use Postgres 5.5 currently, but the project aims to be database and backend agnostic

## Licensing

This project is under the Apache 2 License. All contributions will be made under that license. 

## Screenshots

![Schedule View](./screenshots/schedule.png?raw=true "Schedule View")
