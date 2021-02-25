import config from "config";

const postgres_uri: string = config.get("POSTGRES_DB_URI");

export default {
	type: "postgres",
	url: postgres_uri,
	synchronize: true,
	logging: false,
	entities: ["database/entity/**/*.ts"],
	migrations: ["database/migration/**/*.ts"],
	subscribers: ["database/subscriber/**/*.ts"],
	cli: {
		entitiesDir: "database/entity",
		migrationsDir: "database/migration",
		subscribersDir: "database/subscriber",
	},
	ssl: {
		rejectUnauthorized: false,
	},
};
