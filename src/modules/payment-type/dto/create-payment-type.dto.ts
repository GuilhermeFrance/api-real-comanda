import { PaymentType } from 'generated/prisma/client';

export class CreatePaymentTypeDto implements PaymentType {
  id: number;
  name: string;
  key: string;
}
