'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [_, setStoredUsername] = useLocalStorage('username', '');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredUsername(username);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Icons.logo className="size-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Inicia Sessió</CardTitle>
          <CardDescription>Introdueix les teves credencials per accedir al teu panell de consum.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'usuari</Label>
              <Input
                id="username"
                type="text"
                placeholder="p. ex. usuari123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contrasenya</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
             <Button type="submit" className="w-full mt-4">
              Entra
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
