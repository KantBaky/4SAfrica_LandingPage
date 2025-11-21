import { createContext, useContext, useState } from 'react';

export interface ResultData {
  type: 'impact' | 'investment' | 'recommendation' | 'text';
  title: string;
  data: Record<string, string | number | Record<string, string | number>>;
  narrative: string;
  timestamp?: Date;
}

interface ImpactContextType {
  results: ResultData[];
  addResult: (result: ResultData) => void;
  clearResults: () => void;
}

const ImpactContext = createContext<ImpactContextType | undefined>(undefined);

export function ImpactProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<ResultData[]>([]);

  const addResult = (result: ResultData) => {
    setResults(prev => [{ ...result, timestamp: new Date() }, ...prev]);
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <ImpactContext.Provider value={{ results, addResult, clearResults }}>
      {children}
    </ImpactContext.Provider>
  );
}

export function useImpactResults() {
  const context = useContext(ImpactContext);
  if (!context) {
    throw new Error('useImpactResults must be used within ImpactProvider');
  }
  return context;
}
