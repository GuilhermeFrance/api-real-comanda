import { Badge } from 'generated/prisma/client';

export class CreateBadgeDto implements Badge {
  name: string;
  id: number;
  key: string;
}
