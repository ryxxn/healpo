import React from 'react';
import { IndexedDBContext } from './indexed-db-provider';
import { addData, deleteData, getAllData, getData, updateData } from './utils';

export const useIndexedDB = () => {
  const db = React.useContext(IndexedDBContext);

  if (!db) {
    throw new Error('useIndexedDB must be used within a IndexedDBProvider');
  }

  return {
    addData: addData(db),
    getData: getData(db),
    getAllData: getAllData(db),
    updateData: updateData(db),
    deleteData: deleteData(db),
  };
};
