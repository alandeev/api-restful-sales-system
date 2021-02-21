import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUpload1612381576071 implements MigrationInterface {
    private table = new Table({
      name: 'uploads',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'originalname',
          type: 'varchar',
        },
        {
          name: 'mimetype',
          type: 'varchar',
        },
        {
          name: 'filename',
          type: 'varchar',
        },
        {
          name: 'size',
          type: 'int',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('uploads');
    }
}
