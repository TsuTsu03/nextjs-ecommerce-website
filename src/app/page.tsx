import PaginationBar from '@/components/Pagination';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import Link from 'next/link';

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({ searchParams: { page = '1' } }: HomeProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;

  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return (
    <div className="hero flex flex-col rounded-2xl bg-base-200">
      {currentPage === 1 && (
        <div className="hero-content flex flex-col lg:flex-row">
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={400}
            height={600}
            className="shadow-3xl w-full max-w-sm rounded-xl"
          />
          <div>
            <h1 className="text-4xl font-bold">{products[0].name}</h1>
            <p className="py-4">{products[0].description}</p>
            <Link href={'/products/' + products[0].id} className="btn btn-secondary">
              BUY THIS
            </Link>
          </div>
        </div>
      )}
      <div className="xl:grid-cold-3 my-4 grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {totalPages > 1 && <PaginationBar currentPage={currentPage} totalPages={totalPages} />}
    </div>
  );
}
