'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { AppSettings } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/page-header';
import { Settings } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  databaseConnectionString: z.string().min(1, 'La cadena de connexió és requerida.'),
  modelDataUri: z.string().min(1, 'El Data URI del model és requerit.').url('Ha de ser un Data URI vàlid.'),
});

export default function SettingsPage() {
  const [settings, setSettings] = useLocalStorage<AppSettings>('app-settings', {
    databaseConnectionString: '',
    modelDataUri: '',
  });

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: settings,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSettings(values);
    toast({
      title: 'Configuració Guardada',
      description: 'Els teus canvis s\'han guardat correctament.',
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Configuració"
        description="Configura les teves fonts de dades externes i models de predicció."
        icon={<Settings />}
      />
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Integració de Dades</CardTitle>
              <CardDescription>
                Connecta la teva base de dades de consum d'aigua i el model de predicció de fuites.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="databaseConnectionString"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cadena de Connexió de la Base de Dades</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="p. ex., postgresql://usuari:contrasenya@host:port/base_de_dades"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      La cadena de connexió per a la teva base de dades de consum d'aigua.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modelDataUri"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model de Predicció de Fuites</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="data:application/octet-stream;base64,..."
                        {...field}
                        className="font-code h-32"
                      />
                    </FormControl>
                    <FormDescription>
                      El Data URI per al teu model d'aprenentatge automàtic entrenat.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Guardar Configuració</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
