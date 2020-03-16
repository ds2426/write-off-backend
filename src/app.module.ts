import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; 
import { DeductionModule } from './deduction/deduction.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ds2426:Sutton1!@cluster0-zeteg.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }),
    DeductionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
