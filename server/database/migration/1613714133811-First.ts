import { MigrationInterface, QueryRunner } from "typeorm";

export class First1613714133811 implements MigrationInterface {
	name = "First1613714133811";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user" ("id" uuid NOT NULL, "email" character varying(30) NOT NULL, "verified_email" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "location" ("id" uuid NOT NULL, "coordinates" geography(POINT) NOT NULL, "address" text NOT NULL, CONSTRAINT "UQ_39873ca558965503fff41dc89cf" UNIQUE ("coordinates"), CONSTRAINT "UQ_3b8321b0dc9a9cb2e81bfb52cc0" UNIQUE ("address"), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "incident" ("id" uuid NOT NULL, "description" text NOT NULL, "reported" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" uuid, "locationId" uuid, CONSTRAINT "PK_5f90b28b0b8238d89ee8edcf96e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "incident" ADD CONSTRAINT "FK_c743cf0afa64e82b48fa7bf9f9b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "incident" ADD CONSTRAINT "FK_987e144c09739193eb6cd0e1e82" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "incident" DROP CONSTRAINT "FK_987e144c09739193eb6cd0e1e82"`
		);
		await queryRunner.query(
			`ALTER TABLE "incident" DROP CONSTRAINT "FK_c743cf0afa64e82b48fa7bf9f9b"`
		);
		await queryRunner.query(`DROP TABLE "incident"`);
		await queryRunner.query(`DROP TABLE "location"`);
		await queryRunner.query(`DROP TABLE "user"`);
	}
}
