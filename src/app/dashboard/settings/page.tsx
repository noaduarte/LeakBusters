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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/page-header';
import { Settings as SettingsIcon, Database, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { AppSettings } from '@/lib/types';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  databaseConnectionString: z.string().min(1, 'La cadena de connexió és requerida.'),
  modelDataUri: z.string().min(1, "L'URI del model és requerit."),
});

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useLocalStorage<AppSettings>('app-settings', {
    databaseConnectionString: '',
    modelDataUri: '',
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: settings,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSettings(values);
    toast({
      title: 'Configuració desada',
      description: 'La teva configuració s\'ha desat correctament.',
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Configuració"
        description="Gestiona la configuració de la teva aplicació."
        icon={<SettingsIcon />}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Connexió a la Base de Dades</CardTitle>
              <CardDescription>
                Proporciona la cadena de connexió per a la teva base de dades de consum d'aigua.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="databaseConnectionString"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className='flex items-center gap-2'>
                        <Database className="size-4" />
                        Cadena de Connexió
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Introdueix la teva cadena de connexió" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model de Predicció de Fuites</CardTitle>
              <CardDescription>
                Proporciona l'URI de dades per al teu model d'aprenentatge automàtic entrenat (format .keras).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="modelDataUri"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                       <div className='flex items-center gap-2'>
                        <Bot className="size-4" />
                        URI de Dades del Model
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="data:application/octet-stream;base64,..." {...field} />
                    </FormControl>
                     <FormDescription>
                      Assegura't que l'URI de dades estigui correctament formatat.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
             <CardFooter>
              <Button type="submit">Desar Configuració</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
