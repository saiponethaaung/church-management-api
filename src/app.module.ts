import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './libs/prisma/prisma.module';
import { AuthPassportModule } from './libs/passport/passport.module';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from './modules/common.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LoggingModule } from './libs/logging/logging.module';
import { UserCommonModule } from './modules/user/user-common.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggingModule,
    PrismaModule,
    AuthPassportModule,
    JwtModule.register({
      secret: '10',
      signOptions: { expiresIn: '4h' },
      global: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [UserCommonModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: false,
      path: '/api/v1/user',
      formatError: ({ extensions, ...formattedError }) => {
        // Remove the stack trace if it's a handled error even for dev (too nuisance to see it 😁)
        if (extensions.info) {
          delete extensions.stacktrace;
        }

        return { ...formattedError, extensions };
      },
    }),
    CommonModule,
  ],
  providers: [],
})
export class AppModule {}
