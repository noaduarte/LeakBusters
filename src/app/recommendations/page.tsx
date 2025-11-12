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
import { Bot, Lightbulb, ListChecks, TrendingDown, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  dailyConsumption: z.coerce.number().min(1, 'Must be greater than 0'),
  monthlyConsumption: z.coerce.number().min(1, 'Must be greater than 0'),
  location: z.string().min(2, 'Location is required'),
  householdSize: z.coerce.number().int().min(1, 'Must be at least 1'),
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
        title="Consumption Recommendations"
        description="Get personalized AI-powered recommendations to reduce your water usage."
        icon={<Lightbulb />}
      />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                Provide your details to get tailored advice.
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
                        <FormLabel>Avg. Daily Consumption (gal)</FormLabel>
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
                        <FormLabel>Avg. Monthly Consumption (gal)</FormLabel>
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
                        <FormLabel>Location (City, State)</FormLabel>
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
                        <FormLabel>Household Size</FormLabel>
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
                    {isPending ? 'Generating...' : 'Get Recommendations'}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        <div className="lg:col-span-2">
            <Card className="h-full">
                 <CardHeader>
                    <CardTitle className='flex items-center gap-2'><Bot className='size-6' /> AI-Powered Insights</CardTitle>
                    <CardDescription>Here are your personalized results.</CardDescription>
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
                                {result.comparisonToAverage.includes('below') || result.comparisonToAverage.includes('lower') ? <TrendingDown className='text-accent' /> : <TrendingUp className='text-destructive' />}
                                Consumption Comparison
                            </h3>
                            <p className='text-muted-foreground'>{result.comparisonToAverage}</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                             <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><ListChecks className='text-primary'/> Recommended Actions</h3>
                            <ul className='space-y-2 list-disc pl-5 text-muted-foreground'>
                                {result.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground p-8 flex flex-col items-center justify-center h-full bg-muted/50 rounded-lg">
                        <p>Your recommendations will appear here.</p>
                    </div>
                )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
