import {MigrationInterface, QueryRunner} from "typeorm";

export class LocationUniqueAddress1612718037507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT uniqueAddress UNIQUE(address)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT uniqueAddress`);
    }

}
