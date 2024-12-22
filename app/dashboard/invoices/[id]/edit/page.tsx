import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { updateInvoice } from '@/app/lib/actions';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

// 📝 Genera metadatos dinámicos para la página
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const invoice = await fetchInvoiceById(params.id);

  if (!invoice) {
    return {
      title: 'Invoice Not Found - MyApp',
      description: 'The requested invoice does not exist.',
    };
  }

  return {
    title: `Edit Invoice #${invoice.id} - MyApp`,
    description: `Update details for invoice #${invoice.id}.`,
  };
}

// 📝 Página principal
export default async function Page({ params }: Props) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
