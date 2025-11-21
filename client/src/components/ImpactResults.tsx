import { useImpactResults } from '@/lib/impactResults';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Download } from 'lucide-react';

export function ImpactResults() {
  const { results, clearResults } = useImpactResults();

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Use the chatbot to calculate impact and your results will appear here.</p>
      </div>
    );
  }

  const downloadResults = () => {
    const csv = [
      ['Impact Results', new Date().toLocaleDateString()],
      [],
      ...results.map(r => [
        r.title,
        JSON.stringify(r.data),
        r.narrative.substring(0, 100)
      ])
    ];
    const csvContent = csv.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `4S-impact-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Your Impact Calculations</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadResults}
            className="flex items-center gap-2"
            data-testid="button-download-results"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearResults}
            className="flex items-center gap-2 text-destructive hover:text-destructive"
            data-testid="button-clear-results"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow" data-testid={`card-result-${idx}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-primary">{result.title}</CardTitle>
              {result.timestamp && (
                <p className="text-xs text-muted-foreground">
                  {result.timestamp.toLocaleDateString()} {result.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="bg-muted/50 rounded p-2 space-y-1">
                {Object.entries(result.data).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="font-medium">{key.replace(/_/g, ' ').toUpperCase()}:</span>
                    <span className="text-primary font-semibold">{String(value)}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{result.narrative}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
