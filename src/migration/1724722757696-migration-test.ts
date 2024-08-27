import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationTest1724722757696 implements MigrationInterface {
    name = 'MigrationTest1724722757696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "city"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "city" character varying(50) NOT NULL`);
    }

}
