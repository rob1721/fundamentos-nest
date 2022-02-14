import {MigrationInterface, QueryRunner} from "typeorm";

export class init1644874454816 implements MigrationInterface {
    name = 'init1644874454816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_87ffe09e725a6e79f87dd6c0b69"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "orderId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_87ffe09e725a6e79f87dd6c0b69" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
