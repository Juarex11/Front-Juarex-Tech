import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { checkHealth } from '@/services/api/health';

// Página temporal de desarrollo para comprobar la conexión con la API (GET /health).
export function HealthPage() {
  const [result, setResult] = useState<string>('Sin probar todavía.');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);

    try {
      const data = await checkHealth();

      setResult(`OK\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`ERROR\n${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl space-y-4 p-8">
      <h1 className="text-xl font-semibold">Comprobar conexión con la API</h1>
      <Button onClick={handleCheck} disabled={loading}>
        {loading ? 'Probando...' : 'Probar /health'}
      </Button>
      <pre className="rounded-md bg-gray-100 p-4 text-sm whitespace-pre-wrap">{result}</pre>
    </main>
  );
}