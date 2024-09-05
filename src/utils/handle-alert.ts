import { handleAlert, handleConfirm } from 'react-handle-alert';

export const customAlert = (message: string) => {
  return handleAlert(message, {
    style: {
      minWidth: '300px',
      paddingTop: '2rem',
      gap: '2rem',
    },
    button: {
      text: '확인',
      style: { flex: 1, textAlign: 'center', backgroundColor: '#D23F47' },
    },
  });
};

export const customConfirm = (message: string) => {
  return handleConfirm(message, {
    style: {
      minWidth: '300px',
      paddingTop: '2rem',
      gap: '2rem',
    },
    cancelButton: {
      text: '아니요',
      style: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'transparent',
        outline: '1px solid #D23F47',
        color: '#D23F47',
      },
    },
    confirmButton: {
      text: '네',
      style: { flex: 1, textAlign: 'center', backgroundColor: '#D23F47' },
    },
  });
};
