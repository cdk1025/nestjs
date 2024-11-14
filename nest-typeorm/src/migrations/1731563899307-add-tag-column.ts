import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTagColumn1731563899307 implements MigrationInterface {
  name = 'AddTagColumn1731563899307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`tags\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`tags\``);
  }
}
