import React from 'react';
import type { UseInputPage } from './types';

export const useInputPage = (): UseInputPage => {
  const [open, setOpen] = React.useState(false);

  const onOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const onOpenChange = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return {
    open,
    setOpen,
    //
    onOpen,
    onClose,
    onOpenChange,
  };
};
