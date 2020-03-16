import { Module, NestModule, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { DeductionService } from './deduction.service';
import { DeductionController } from './deduction.controller';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { DeductionsSchema } from '../deductions/schemas/deductions.schema'; // and this
import { AuthenticationMiddleware } from '../common/authentication.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Deduction', schema: DeductionsSchema }]),
  ], 
  providers: [DeductionService],
  controllers: [DeductionController]
})
export class DeductionModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      { method: RequestMethod.POST, path: '/deduction/add' },
      { method: RequestMethod.PUT, path: '/deduction/edit' },
      { method: RequestMethod.DELETE, path: '/deduction/delete' }
    )
  }
}
