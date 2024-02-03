import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { prisma } from '@/lib/db/prisma';
import { notFound } from 'next/navigation';
import CartButton from './CartButton';
import { incrementProduct } from './actions';
import PriceTag from '@/components/PriceTag';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
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

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the IDs of all products from the database
  const products = await prisma.product.findMany();
  const paths = products.map((product) => ({ params: { id: product.id } }));

  return {
    paths,
    fallback: false, // Set to true if you want to enable incremental static regeneration
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params ?? {};

  if (!id) {
    // Handle the case where id is undefined
    return {
      notFound: true,
    };
  }

  // Fetch the product based on the ID from the database
  const product = await prisma.product.findUnique({ where: { id: id as string } });

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};
