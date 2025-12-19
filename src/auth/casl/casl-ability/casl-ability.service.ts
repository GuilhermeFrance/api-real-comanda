import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, Subjects } from '@casl/prisma';
import { Injectable, Scope } from '@nestjs/common';
import { ProductType } from 'generated/prisma/browser';
import {
  Badge,
  Order,
  OrderItems,
  PaymentType,
  Products,
  Status,
  Table,
  User,
} from 'generated/prisma/client';

export type PermActions =
  | 'manage'
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'work';

export type BadgeKey = 'admin' | 'funcionario';

export type PermitionResources =
  | Subjects<{
      User: User;
      Badge: Badge;
      Table: Table;
      Order: Order;
      OrderItems: OrderItems;
      Status: Status;
      ProductType: ProductType;
      PaymentType: PaymentType;
      Products: Products;
    }>
  | 'all';

export type AppAbility = PureAbility<[PermActions, PermitionResources]>;

export type DefinePermissions = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void;

const rolePermissionsMap: Record<BadgeKey, DefinePermissions> = {
  admin(user, { can }) {
    can('read', 'all');
    can('manage', 'all');
    can('create', 'all');
  },
  funcionario(user, { can }) {
    can('read', 'all');
    can('work', 'Table');
    can('work', 'OrderItems');
    can('work', 'Order');
  },
};

@Injectable({ scope: Scope.REQUEST })
export class CaslAbilityService {
  ability: AppAbility;
  createForUser(user: User): AppAbility {
    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
    rolePermissionsMap[(user.badgesKey ?? 'admin') as BadgeKey](user, builder);
    this.ability = builder.build();

    return this.ability;
  }
}
