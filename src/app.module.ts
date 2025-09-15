import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FlowersModule } from './flowers/flowers.module';
import { LoggerMiddleware } from './conception/middleware';
import mikroConfig from '../mikro-orm.config';
import { MikroOrmModule, MikroOrmMiddleware } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroserviceModule } from './microservice/microservice.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { FlowersGraphqlModule } from './flowers-graphql/flowers-graphql.module';
import { WebsocketGateway } from './wesocket.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(mikroConfig),
    FlowersModule,
    UsersModule,
    PostModule,
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8877,
        },
      },
    ]),
    MicroserviceModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      graphiql: true,
    }),
    FlowersGraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // IMPORTANT: This creates a per-request EntityManager context
      .apply(MikroOrmMiddleware, LoggerMiddleware)
      .forRoutes('flowers');
  }
}
