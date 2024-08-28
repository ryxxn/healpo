export interface UseInputPage {
  open: boolean;
  setOpen: (open: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
}
