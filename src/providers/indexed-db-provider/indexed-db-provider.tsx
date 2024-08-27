import React from 'react';
import { openDatabase } from './utils';

export const IndexedDBContext = React.createContext<IDBDatabase | undefined>(
  undefined
);

const IndexedDBProvider = ({ children }: React.PropsWithChildren) => {
  const [db, setDB] = React.useState<IDBDatabase | undefined>(undefined);

  const initialize = async () => {
    try {
      const database = await openDatabase('healpo', [
        // store names
        'user',
        'exercise',
      ]);
      setDB(database);
    } catch (error) {
      console.error('Failed to open database:', error);
    }
  };

  React.useEffect(() => {
    initialize();
  }, []);

  return (
    <IndexedDBContext.Provider value={db}>{children}</IndexedDBContext.Provider>
  );
};

export default IndexedDBProvider;
