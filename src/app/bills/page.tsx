import { BillsTable } from '@/components/bills/bills-table';
import { PageHeader } from '@/components/page-header';
import { bills } from '@/lib/data';
import { FileText } from 'lucide-react';

export default function BillsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Billing & Statements"
        description="View your billing history and download past statements."
        icon={<FileText />}
      />
      <BillsTable data={bills} />
    </div>
  );
}
