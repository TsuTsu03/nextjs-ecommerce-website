import PriceTag from '@/components/PriceTag';
import { prisma } from '@/lib/db/prisma';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import CartButton from './CartButton';
import { incrementProduct } from './actions';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetaData({ params: { id } }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + '- Budol Shop',
    description: product.description,
    openGraph: {
      images: [
        {
          url: product.imageUrl,
        },
      ],
    },
  };
}

export default async function ProductPage({ params: { id } }: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-base-200 p-4 lg:flex-row lg:items-center">
      <Image
        priority
        className="rounded-lg"
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <CartButton productId={product.id} incrementProduct={incrementProduct} />
      </div>
    </div>
  );
}
