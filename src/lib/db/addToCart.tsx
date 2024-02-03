import { cookies } from 'next/headers';
import { prisma } from './prisma';
import { Prisma } from '@prisma/client';

export type CartProductsType = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type CartType = CartProductsType & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<CartType | null> {
  const localCartId = cookies().get('localCart')?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
  };
}

export async function createCart(): Promise<CartType> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  cookies().set('localCart', newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
