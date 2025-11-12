import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Bill } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';

type BillsTableProps = {
  data: Bill[];
};

export function BillsTable({ data }: BillsTableProps) {
  const getStatusVariant = (status: Bill['status']) => {
    switch (status) {
      case 'Paid':
        return 'default';
      case 'Due':
        return 'secondary';
      case 'Overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const translateStatus = (status: Bill['status']) => {
    switch (status) {
      case 'Paid':
        return 'Pagat';
      case 'Due':
        return 'Pendent';
      case 'Overdue':
        return 'Vençut';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Facturació</CardTitle>
        <CardDescription>Un registre de les teves factures mensuals d'aigua.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Factura</TableHead>
              <TableHead>Mes</TableHead>
              <TableHead>Import</TableHead>
              <TableHead>Data de Venciment</TableHead>
              <TableHead>Estat</TableHead>
              <TableHead className="text-right">Acció</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell className="font-medium">{bill.id}</TableCell>
                <TableCell>{bill.month}</TableCell>
                <TableCell>${bill.amount.toFixed(2)}</TableCell>
                <TableCell>{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(bill.status)} className={cn(getStatusVariant(bill.status) === 'default' && 'bg-accent text-accent-foreground')}>
                    {translateStatus(bill.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <a href={bill.statementUrl} aria-label={`Descarregar extracte per a ${bill.month}`}>
                      <Download className="size-4" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
