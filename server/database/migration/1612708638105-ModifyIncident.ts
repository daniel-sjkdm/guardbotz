import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifyIncident1612708638105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE "incident" DROP COLUMN address`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE "incident" ADD COLUMN address VARCHAR`);
    }

}
