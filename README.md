## Project setup

```After clone the repo , dot first below things
$ npm install

$ npx prisma migrate dev --name init

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## How to call api with curl 
```
curl -X POST http://localhost:3000/api/v1/auth/test -H "Content-Type: application/json"
```
    -- User Table
CREATE TABLE Tbl_User (
    UserId INT PRIMARY KEY AUTO_INCREMENT,
    UserCode VARCHAR(50) UNIQUE NOT NULL,
    UserName VARCHAR(100) NOT NULL,
    GitHubAccountName VARCHAR(100),
    Nrc VARCHAR(50),
    MobileNo VARCHAR(20)
);

-- TechStack Table
CREATE TABLE Tbl_TechStack (
    TechStackId INT PRIMARY KEY AUTO_INCREMENT,
    TechStackCode VARCHAR(50) UNIQUE NOT NULL,
    TechStackShortCode VARCHAR(20),
    TechStackName VARCHAR(100) NOT NULL
);

-- UserTechStack Junction Table
CREATE TABLE Tbl_UserTechStack (
    UserTechStackId INT PRIMARY KEY AUTO_INCREMENT,
    UserCode VARCHAR(50) NOT NULL,
    TechStackCode VARCHAR(50) NOT NULL,
    ProficiencyLevel INT
);

-- Team Table
CREATE TABLE Tbl_Team (
    TeamId INT PRIMARY KEY AUTO_INCREMENT,
    TeamCode VARCHAR(50) UNIQUE NOT NULL,
    TeamName VARCHAR(100) NOT NULL
);

-- TeamUser Junction Table
CREATE TABLE Tbl_TeamUser (
    TeamUserId INT PRIMARY KEY AUTO_INCREMENT,
    TeamCode VARCHAR(50) NOT NULL,
    UserCode VARCHAR(50) NOT NULL,
    UserRating DECIMAL(3,2)
);

-- Project Table
CREATE TABLE Tbl_Project (
    ProjectId INT PRIMARY KEY AUTO_INCREMENT,
    ProjectCode VARCHAR(50) UNIQUE NOT NULL,
    ProjectName VARCHAR(100) NOT NULL,
    RepoUrl VARCHAR(255),
    StartDate DATE,
    EndDate DATE,
    ProjectStatus VARCHAR(50) NOT NULL
    ProjectDescription TEXT
);

-- ProjectTeam Junction Table
CREATE TABLE Tbl_ProjectTeam (
    ProjectTeamId INT PRIMARY KEY AUTO_INCREMENT,
    ProjectCode VARCHAR(50) NOT NULL,
    TeamCode VARCHAR(50) NOT NULL,
    ProjectTeamRating DECIMAL(3,2),
    Duration INT  -- Assuming duration in days
);

-- ProjectTeamActivity Table
CREATE TABLE Tbl_ProjectTeamActivity (
    ProjectTeamActivityId INT PRIMARY KEY AUTO_INCREMENT,
    UserCode VARCHAR(50) NOT NULL,
    TeamCode VARCHAR(50) NOT NULL,
    ProjectCode VARCHAR(50) NOT NULL,
    TechStackCode VARCHAR(50),
    ActivityDate DATE,
    Tasks TEXT
);

```
