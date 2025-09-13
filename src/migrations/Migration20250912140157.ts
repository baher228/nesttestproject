import { Migration } from '@mikro-orm/migrations';

export class Migration20250912140157 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "flower" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "color" varchar(255) not null, "price" int not null);`);

    this.addSql(`drop table if exists "flowers" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "flowers" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "color" varchar(255) not null, "price" int not null);`);

    this.addSql(`drop table if exists "flower" cascade;`);
  }

}
