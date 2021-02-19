## Typeorm migrations

First, define the **entities**. Then after each change, generate a new migration
file with the following command:

```
$ yarn typeorm migration:generate --name <migrationName>
```

Then the migrations needs to be executed in order to create the database with the credentials
provided in the \__ormconfig.json_ file, run the migrations with:

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

## PostGIS

To enable GIS in postgresql to query coordinates:

```sql
=> create extension postgis;
```

The documentation suggest to create a column to the geometry(point) type the following way:

```sql
CREATE TABLE ptgeogwgs(gid serial PRIMARY KEY, geog geography(POINT) );
```

[PostGIS Docs](https://postgis.net/stuff/postgis-3.1.pdf)

## Using linters (ESLint) with Typescript

ESLint can't parse the typescript code since the AST generated by the parser has a different structure from what ESLint expects. This is due
to the fact that typescript is a superset of javascript and there are new features that vanilla js doesn't have.

There were a TSLint project wich was deprecated in 2019 because the intention was to move everything into ESLint. This could be done
by using plugins like a typescript parser that generates an AST compatible with the ESLint rules.

To implement the linter in typescript projects, install the following:

```bash
$ yarn add -D
```

A nice set of rules used by developers is the airbnb configuration:

```bash
$ yarn add -D eslint-config-airbnb-typescript
```

Also, if using eslint with prettier, make sure to install the config package to avoid eslint reporting on code formatting done by prettier:

```bash
$ yarn add -D eslint-config-prettier
```

If you're interested in linting jest tests:

```bash
$ yarn add -D eslint-plugin-jest
```

For node.js best practices:

```bash
$ yarn add -D eslint-plugin-node
```

Now that everything is installed, create:

- .eslintrc.js

```javascript
module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "jest"],
	extends: [
		"airbnb-typescript",
		"prettier",
		"prettier/@typescript-eslint",
		"plugin:jest/recommended",
	],
};
```

- .eslintignore
