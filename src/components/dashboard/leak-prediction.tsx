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
      // Opcionalment, mostrar un error si no s'ha seleccionat data
      return;
    }

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth(); // 0 = Gener, 3 = Abril

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
          <AlertTriangle className="size-6 text-destructive" />
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
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Alerta de Fuita!</AlertTitle>
            <AlertDescription>
              S'ha detectat un risc de fuita potencial basat en la data seleccionada. Es recomana revisar la instal·lació.
            </AlertDescription>
          </Alert>
        )}
        {result === 'no-leak' && (
          <Alert>
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Sense Risc de Fuita</AlertTitle>
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
