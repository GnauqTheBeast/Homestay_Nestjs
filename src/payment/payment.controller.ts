import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import PayOS from "@payos/node";
import { PaymentDto } from "./dto/payment.dto";

const PAYOS_CLIENT_ID = process.env.PAYOS_CLIENT_ID;
const PAYOS_API_KEY = process.env.PAYOS_API_KEY;
const PAYOS_CHECKSUM_KEY = process.env.PAYOS_CHECKSUM_KEY;

const rateUSDToVND = 25000;

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
    @Post('create-payment-link')
    async createPaymentLink(@Body() paymentDto: PaymentDto) {
      console.log(paymentDto)
      const payOS = new PayOS(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY);

      const body = {
          orderCode: paymentDto.orderCode,
          amount: paymentDto.numDay * paymentDto.price * rateUSDToVND,
          description: "Booking Payment",
          items: [{
            name: paymentDto.homestayName,
            numPeople: paymentDto.numPeople,
            price: paymentDto.price * rateUSDToVND,
            quantity: 1,
          }],
          cancelUrl: `http://localhost:3000/homestay/${paymentDto.slug}`,
          returnUrl: `http://localhost:3000/homestay/${paymentDto.slug}`
        };
      
      const paymentLinkRes = await payOS.createPaymentLink(body);

      return paymentLinkRes.checkoutUrl;
    }
}
