import {MigrationInterface, QueryRunner} from "typeorm";

export class first1612228451293 implements MigrationInterface {
    name = 'first1612228451293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(30) NOT NULL, "verified_email" boolean NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "coordinates" double precision NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "incident" ("id" SERIAL NOT NULL, "address" character varying(200) NOT NULL, "description" text NOT NULL, "userId" integer, "locationId" integer, CONSTRAINT "PK_5f90b28b0b8238d89ee8edcf96e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "incident" ADD CONSTRAINT "FK_c743cf0afa64e82b48fa7bf9f9b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "incident" ADD CONSTRAINT "FK_987e144c09739193eb6cd0e1e82" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incident" DROP CONSTRAINT "FK_987e144c09739193eb6cd0e1e82"`);
        await queryRunner.query(`ALTER TABLE "incident" DROP CONSTRAINT "FK_c743cf0afa64e82b48fa7bf9f9b"`);
        await queryRunner.query(`DROP TABLE "incident"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
