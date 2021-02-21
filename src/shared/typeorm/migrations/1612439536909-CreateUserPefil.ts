import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserPefil1612439536909 implements MigrationInterface {
    private table = new Table({
      name: 'user_perfils',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'avatarId',
          type: 'uuid',
          isNullable: true
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
      foreignKeys: [
        {
          name: 'AvatarPerfilFK',
          referencedTableName: 'uploads',
          referencedColumnNames: ['id'],
          columnNames: ['avatarId'],
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        },
      ],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user_perfils');
    }
}
