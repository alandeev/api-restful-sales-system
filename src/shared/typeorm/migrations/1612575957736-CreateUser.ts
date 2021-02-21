import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1612575957736 implements MigrationInterface {
    private table = new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'perfilId',
          type: 'uuid'
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
          name: "FK_Perfil_User",
          referencedTableName: 'user_perfils',
          referencedColumnNames: ['id'],
          columnNames: ['perfilId'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ]
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }
}
