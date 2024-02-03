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

function generateMetaData(product: any): Metadata {
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

export default function ProductPage({ product }: { product: any }) {
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

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  const metadata = generateMetaData(product);

  return {
    props: {
      product,
      metadata,
    },
  };
}
