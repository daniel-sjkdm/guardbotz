import { query } from "express";
import {MigrationInterface, QueryRunner} from "typeorm";

export class UniqueDescription1612745857157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE "incident" ADD CONSTRAINT uniqueDescription UNIQUE(description)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE "incident" DROP CONSTRAINT uniqueDescription`);
    }

}
