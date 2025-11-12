'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, ShieldCheck, Bot } from 'lucide-react';
import { predictLeakAction } from '@/app/actions';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { AppSettings } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function LeakPrediction() {
  const [settings] = useLocalStorage<AppSettings>('app-settings', {
    databaseConnectionString: '',
    modelDataUri: '',
  });

  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredictLeak = () => {
    setError(null);
    setResult(null);

    if (!settings.databaseConnectionString || !settings.modelDataUri) {
      setError(
        'Please provide a database connection string and a model data URI in the settings page before predicting leaks.'
      );
      return;
    }

    startTransition(async () => {
      const { data, error } = await predictLeakAction({
        databaseConnectionString: settings.databaseConnectionString,
        modelDataUri: settings.modelDataUri,
      });

      if (error) {
        setError(error);
      }
      if (data) {
        setResult(data.leakRiskAssessment);
      }
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <AlertTriangle className="size-6 text-destructive" />
          Leak Risk Prediction
        </CardTitle>
        <CardDescription>
          Use AI to analyze your consumption and predict potential leaks.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isPending ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : result ? (
           <Alert>
            <Bot className="h-4 w-4" />
            <AlertTitle>AI Assessment</AlertTitle>
            <AlertDescription>{result}</AlertDescription>
          </Alert>
        ) : (
          <div className="text-center text-muted-foreground p-4 bg-muted/50 rounded-lg flex flex-col items-center justify-center h-full">
            <ShieldCheck className="size-10 mb-2 text-primary" />
            <p>Your system seems to be running smoothly. Click below to run a new analysis.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handlePredictLeak} disabled={isPending} className="w-full">
          {isPending ? 'Analyzing...' : 'Check for Leaks'}
        </Button>
      </CardFooter>
    </Card>
  );
}
