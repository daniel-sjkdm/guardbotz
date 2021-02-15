## Typeorm migrations

First, define the __entities__. Then after each change, generate a new migration
file with the following command:

```
$ yarn typeorm migration:generate --name <migrationName>
```

Then the migrations needs to be executed in order to create the database with the credentials
provided in the __ormconfig.json_ file, run the migrations with:

```
$ yarn typeorm migration:run
```

**Important**

When using the _migration:run_ command, typeorm expects the migration files to be .js so make sure to either compile the files first or
to use ts-node in the following way to run them as .ts files.

```
$ ts-node ./node_modules/typeorm/cli.js migration:run
```

**Running with multiple environments**

```bash
$ yarn run cross-env NODE_ENV=development ts-node-dev --respawn server.ts
```
