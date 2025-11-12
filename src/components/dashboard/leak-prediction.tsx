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
        'Si us plau, proporcioneu una cadena de connexió a la base de dades i un URI de dades del model a la pàgina de configuració abans de predir fuites.'
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
          Predicció de Risc de Fuites
        </CardTitle>
        <CardDescription>
          Utilitza IA per analitzar el teu consum i predir possibles fuites.
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
            <AlertTitle>Avaluació d'IA</AlertTitle>
            <AlertDescription>{result}</AlertDescription>
          </Alert>
        ) : (
          <div className="text-center text-muted-foreground p-4 bg-muted/50 rounded-lg flex flex-col items-center justify-center h-full">
            <ShieldCheck className="size-10 mb-2 text-primary" />
            <p>El teu sistema sembla funcionar correctament. Fes clic a continuació per executar una nova anàlisi.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handlePredictLeak} disabled={isPending} className="w-full">
          {isPending ? 'Analitzant...' : 'Comprovar si hi ha Fuites'}
        </Button>
      </CardFooter>
    </Card>
  );
}
