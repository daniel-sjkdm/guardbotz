CREATE DATABASE guardbotdb;

CREATE USER moonzombie WITH ENCRYPTED PASSWORD 'moonzombie';

GRANT ALL ON DATABASE guardbotdb TO moonzombie;
