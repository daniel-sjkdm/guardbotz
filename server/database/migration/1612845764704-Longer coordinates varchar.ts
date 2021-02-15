import {MigrationInterface, QueryRunner} from "typeorm";

export class LongerCoordinatesVarchar1612845764704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN coordinates TYPE VARCHAR(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
