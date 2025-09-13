import { Migration } from '@mikro-orm/migrations';

export class Migration20250912135809 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "flowers" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "color" varchar(255) not null, "price" int not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "flowers" cascade;`);
  }

}
