import Link from 'next/link';
import Image from 'next/image';
import logo from '/Projects/my-ecommerce-app/src/assets/logo.png';
import { redirect } from 'next/navigation';
import { getCart } from '@/lib/db/addToCart';
import CartButton from './CartButton';
import { getServerSession } from 'next-auth';

async function searchForProducts(formData: FormData) {
  'use server';

  const searchProduct = formData.get('search')?.toString();

  if (searchProduct) {
    redirect('/search?query=' + searchProduct);
  }
}

export default async function Navbar() {
  const cart = await getCart();

  return (
    <div className="sticky top-0 z-10 bg-base-100 px-2 drop-shadow-lg">
      <div className=" navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href={'/'} className="btn btn-ghost text-xl normal-case">
            <Image src={logo} height={40} width={40} alt={'Budol Shop logo'} />
            Budol Shop
          </Link>
        </div>
        <div className="flex-none">
          <form action={searchForProducts}>
            <div className="form-control">
              <input
                name="search"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
          <CartButton cart={cart} />
        </div>
      </div>
    </div>
  );
}
