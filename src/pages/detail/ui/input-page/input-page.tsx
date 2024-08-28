import React from 'react';
import { UseInputPage } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { ISet } from '../../../../types';

interface Props extends Partial<UseInputPage> {
  set: ISet | null;
  setSet: (set: ISet) => void;
}

const InputPage = ({ open, onClose, set, setSet, ...other }: Props) => {
  const [values, setValues] = React.useState<ISet>(set ?? ({} as ISet));

  const onChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setValues((prev) => ({ ...prev, [key]: value }));
    };

  const onSave = () => {
    setSet(values);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="max-w-md mx-auto fixed top-0 left-0 z-10 size-full"
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          exit={{ x: '100vw' }}
          transition={{ duration: 0.15 }}
        >
          <header className="sticky top-0 left-0 h-8 p-4 flex justify-between bg-white">
            <button onClick={onClose}>뒤로</button>
            <button>삭제</button>
          </header>
          <main className="container p-4 size-full bg-white">
            <div className="flex flex-col mt-8">
              <label htmlFor="">어떤 종류인가요?</label>
              <input
                type="text"
                value={values.name}
                onChange={onChange('name')}
                className="border-b border-gray-400"
                placeholder="휴식 또는 세트"
              />
            </div>
            <div className="flex flex-col mt-8">
              <label htmlFor="">운동 시간을 입력해주세요.</label>
              <input
                type="text"
                className="border-b border-gray-400"
                value={values.time}
                onChange={onChange('time')}
              />
            </div>
          </main>
          <div className="fixed bottom-0 left-0 w-full flex">
            <button className="p-4 bg-primary grow text-white" onClick={onSave}>
              저장
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InputPage;
