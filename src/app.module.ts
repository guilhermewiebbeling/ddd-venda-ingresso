import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './events/events.module';
import { DomainEventModule } from './domain-event/domain-event.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [DatabaseModule, EventsModule, DomainEventModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
