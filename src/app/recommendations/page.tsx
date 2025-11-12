'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ConsumptionRecommendationsOutput } from '@/ai/flows/consumption-insights-and-recommendations';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getRecommendationsAction } from '@/app/actions';
import { PageHeader } from '@/components/page-header';
import { Bot, Lightbulb, ListChecks, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  dailyConsumption: z.coerce.number().min(1, 'Ha de ser superior a 0'),
  monthlyConsumption: z.coerce.number().min(1, 'Ha de ser superior a 0'),
  location: z.string().min(2, 'La ubicació és requerida'),
  householdSize: z.coerce.number().int().min(1, 'Ha de ser com a mínim 1'),
});

export default function RecommendationsPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ConsumptionRecommendationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dailyConsumption: 120,
      monthlyConsumption: 3600,
      location: 'Austin, TX',
      householdSize: 2,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    setError(null);
    startTransition(async () => {
      const { data, error } = await getRecommendationsAction(values);
      if (error) {
        setError(error);
      }
      if (data) {
        setResult(data);
      }
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Recomanacions de Consum"
        description="Obté recomanacions personalitzades amb IA per reduir el teu consum d'aigua."
        icon={<Lightbulb />}
      />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>La teva Informació</CardTitle>
              <CardDescription>
                Proporciona les teves dades per obtenir consells a mida.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="dailyConsumption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consum Diari Mitjà (gal)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="120" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthlyConsumption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consum Mensual Mitjà (gal)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="3600" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ubicació (Ciutat, Estat)</FormLabel>
                        <FormControl>
                          <Input placeholder="Austin, TX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="householdSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mida de la Llar</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? 'Generant...' : 'Obtenir Recomanacions'}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        <div className="lg:col-span-2">
            <Card className="h-full">
                 <CardHeader>
                    <CardTitle className='flex items-center gap-2'><Bot className='size-6' /> Anàlisis amb IA</CardTitle>
                    <CardDescription>Aquí tens els teus resultats personalitzats.</CardDescription>
                </CardHeader>
                <CardContent>
                {isPending ? (
                    <div className='space-y-4'>
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                ) : error ? (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : result ? (
                    <div className="space-y-6">
                        <div className="p-4 bg-muted/50 rounded-lg">
                             <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                                {result.comparisonToAverage.includes('below') || result.comparisonToAverage.includes('lower') || result.comparisonToAverage.includes('sota') ? <TrendingDown className='text-accent' /> : <TrendingUp className='text-destructive' />}
                                Comparació de Consum
                            </h3>
                            <p className='text-muted-foreground'>{result.comparisonToAverage}</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                             <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><ListChecks className='text-primary'/> Accions Recomanades</h3>
                            <ul className='space-y-2 list-disc pl-5 text-muted-foreground'>
                                {result.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground p-8 flex flex-col items-center justify-center h-full bg-muted/50 rounded-lg">
                        <p>Les teves recomanacions apareixeran aquí.</p>
                    </div>
                )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
