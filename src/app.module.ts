import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/user.controller';
import { AuthController } from './modules/auth/auth.controller';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { databaseConfig } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/utils/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthService } from './modules/auth/auth.service';
import { NotesModule } from './modules/notes/notes.module';
import { ProfileController } from './modules/profile/profile.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (dbConfig: ConfigType<typeof databaseConfig>) => ({
        uri: dbConfig.url,
        dbName: dbConfig.name,
      }),
      inject: [databaseConfig.KEY],
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    NotesModule
  ],
  controllers: [AppController, UserController, AuthController, ProfileController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
