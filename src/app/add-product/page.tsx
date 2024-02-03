import FormSubmitButton from '@/components/SubmitButton';
import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Add Product - Budol Shop',
};

async function addProduct(formData: FormData) {
  'use server';

  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error('Missing required fields');
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect('/');
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-4 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          type="text"
          name="name"
          placeholder="Name"
          className="input-border input mb-4 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-4 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-border input mb-4 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="Number"
          className="input-border input mb-4 w-full"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
