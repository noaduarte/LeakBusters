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
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LeakPredictionDatePicker } from './leak-prediction-date-picker';

export function LeakPrediction() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [result, setResult] = useState<'leak' | 'no-leak' | null>(null);

  const handlePredictLeak = () => {
    setResult(null);
    if (!selectedDate) {
      return;
    }

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth(); // 0 = Gener, 3 = Abril

    // For demonstration, April 15 to 24 will trigger a leak alert.
    if (month === 3 && day >= 15 && day <= 24) {
      setResult('leak');
    } else {
      setResult('no-leak');
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <AlertTriangle className="size-6 text-primary" />
          Predicció de Risc de Fuites
        </CardTitle>
        <CardDescription>
          Selecciona una data per simular una comprovació de fuites.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium">Data per Analitzar</p>
           <LeakPredictionDatePicker date={selectedDate} onDateChange={setSelectedDate} />
        </div>
        
        {result === 'leak' && (
          <Alert variant="destructive" className="flex-grow flex flex-col justify-center text-center">
             <div className="flex justify-center mb-2">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <AlertTitle className="text-lg font-bold">Alerta de Fuita!</AlertTitle>
            <AlertDescription>
              S'ha detectat un risc de fuita potencial. Es recomana revisar la instal·lació.
            </AlertDescription>
          </Alert>
        )}
        {result === 'no-leak' && (
          <Alert className="flex-grow flex flex-col justify-center text-center">
            <div className="flex justify-center mb-2">
              <ShieldCheck className="h-8 w-8 text-green-600" />
            </div>
            <AlertTitle className="text-lg font-bold">Sense Risc de Fuita</AlertTitle>
            <AlertDescription>
              No s'ha detectat cap anomalia en el consum per a la data seleccionada.
            </AlertDescription>
          </Alert>
        )}
        {result === null && (
             <div className="text-center text-muted-foreground p-4 bg-muted/50 rounded-lg flex flex-col items-center justify-center h-full">
                <p>Selecciona una data i fes clic a "Comprovar" per analitzar el risc.</p>
            </div>
        )}

      </CardContent>
      <CardFooter>
        <Button onClick={handlePredictLeak} className="w-full" disabled={!selectedDate}>
          Comprovar si hi ha Fuites
        </Button>
      </CardFooter>
    </Card>
  );
}
