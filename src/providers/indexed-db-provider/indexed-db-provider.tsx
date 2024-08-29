import React from 'react';
import { openDatabase } from './utils';

export const IndexedDBContext = React.createContext<IDBDatabase | undefined>(
  undefined
);

const IndexedDBProvider = ({ children }: React.PropsWithChildren) => {
  const [db, setDB] = React.useState<IDBDatabase | undefined>(undefined);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const initialize = async () => {
    try {
      const database = await openDatabase('healpo', [
        // store names
        'user',
        'exercise',
      ]);
      setDB(database);
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to open database:', error);
    }
  };

  React.useEffect(() => {
    initialize();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <IndexedDBContext.Provider value={db}>{children}</IndexedDBContext.Provider>
  );
};

export default IndexedDBProvider;
