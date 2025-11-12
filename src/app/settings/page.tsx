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
  databaseConnectionString: z.string().min(1, 'Connection string is required.'),
  modelDataUri: z.string().min(1, 'Model Data URI is required.').url('Must be a valid data URI.'),
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
      title: 'Settings Saved',
      description: 'Your changes have been saved successfully.',
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Settings"
        description="Configure your external data sources and prediction models."
        icon={<Settings />}
      />
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Data Integration</CardTitle>
              <CardDescription>
                Connect your water consumption database and leak prediction model.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="databaseConnectionString"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Database Connection String</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., postgresql://user:password@host:port/database"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The connection string for your water consumption database.
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
                    <FormLabel>Leak Prediction Model</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="data:application/octet-stream;base64,..."
                        {...field}
                        className="font-code h-32"
                      />
                    </FormControl>
                    <FormDescription>
                      The data URI for your trained machine learning model.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Settings</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
