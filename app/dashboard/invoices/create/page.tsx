import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

/**
 * a server component, asynchronous and making a call
 * @returns react tsx
 */
export default async function Page() {
    const customers = await fetchCustomers();
    return (
        <main>
            <Breadcrumbs 
                breadcrumbs={[
                    { label: "Invoices", href: "/dashboard/invoices" },
                    {
                        label: "Create Invoice",
                        href: "/dashboard/invoices/create",
                        active: true
                    }
                ]}
            />
            <Form customers={customers} />
        </main>
    );
}