import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';

@Module({
    imports: [],
    controllers: [PaymentController],
})
export class PaymentModule {}
