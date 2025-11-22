'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function LeakPrediction() {
  const [prediction, setPrediction] = useState<{ risk: 'low' | 'high', percentage: number } | null>(null);

  const handlePredictLeak = () => {
    // Generates a random low-risk percentage for "today"
    const randomPercentage = Math.floor(Math.random() * 11); // 0-10%
    setPrediction({ risk: 'low', percentage: randomPercentage });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Zap className="size-6 text-primary" />
          Predicció Ràpida de Fuites
        </CardTitle>
        <CardDescription>
          Fes una comprovació ràpida del risc de fuita per al dia d'avui.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        {prediction && (
           <Alert className="text-center">
             <div className="flex justify-center mb-2">
               <ShieldCheck className="h-8 w-8 text-green-600" />
             </div>
             <AlertTitle className="text-lg font-bold">Risc Baix: {prediction.percentage}%</AlertTitle>
             <AlertDescription>
               La predicció per avui no mostra anomalies significatives.
             </AlertDescription>
           </Alert>
        )}
         {!prediction && (
             <div className="text-center text-muted-foreground p-4 bg-muted/50 rounded-lg flex flex-col items-center justify-center h-full">
                <p>Fes clic al botó per obtenir una predicció instantània.</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handlePredictLeak} className="w-full">
          Predeix-me avui
        </Button>
      </CardFooter>
    </Card>
  );
}
