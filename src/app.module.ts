import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';
import { DbhelperModule } from './dbhelper/dbhelper.module';

@Module({
  imports: [UsersModule, BlogsModule,AuthModule, DbhelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
