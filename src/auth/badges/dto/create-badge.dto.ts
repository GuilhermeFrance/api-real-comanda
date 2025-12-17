import { Badge } from 'generated/prisma/client';

export class CreateBadgeDto implements Badge {
  id: number;
  name: string;
  key: string;
}
