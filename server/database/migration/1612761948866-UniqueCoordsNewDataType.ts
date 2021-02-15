import {MigrationInterface, QueryRunner} from "typeorm";

export class UniqueCoordsNewDataType1612761948866 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT uniqueCoords UNIQUE(coordinates)`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN coordinates TYPE VARCHAR(100)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT uniqueCoords`);
    }

}
