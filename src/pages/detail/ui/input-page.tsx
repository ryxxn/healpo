import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IExercise, ISet } from '../../../types';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys, useExercise } from '../../../apis';
import { ChevronLeft } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  setId: string | null;
}

const InputPage = ({ open, onClose, setId }: Props) => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data } = useExercise({ id: id!, enabled: false });

  const [values, setValues] = React.useState<ISet>({name:'', time: 0} as ISet);
  const [isNewSet, setIsNewSet] = React.useState(false);

  const onChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setValues((prev) => ({ ...prev, [key]: value }));
    };

  const onSave = () => {
    if (!setId) return;

    const sets = data?.sets ?? [];
    const index = sets.findIndex((s) => s.id === values.id);

    if (index === -1) {
      sets.push({
        ...values,
        id: setId,
        order: sets.length,
      });
    } else {
      sets[index] = { ...sets[index], ...values };
    }

    const newData = { ...data, sets };
    queryClient.setQueryData(queryKeys.exercise.detail(id!), newData);
    onClose?.();
  };

  const onDeleteSet = () => {
    const sets = data?.sets?.filter((set) => set.id !== setId) ?? [];

    queryClient.setQueryData(
      queryKeys.exercise.detail(id!),
      (prev: IExercise) => ({
        ...prev,
        sets,
      })
    );

    onClose?.();
  };

  React.useEffect(() => {
    if (!setId) return;

    const set = data?.sets.find((s) => s.id === setId);
    setValues(set ?? ({} as ISet));
    setIsNewSet(!set);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setId]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="input-page"
          className="max-w-md mx-auto fixed top-0 z-10 size-full"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.2 }}
        >
          <header className="sticky h-16 p-4 flex justify-between bg-gray-100">
            <button onClick={onClose}>
              <ChevronLeft />
            </button>
            {!isNewSet && <button onClick={onDeleteSet}>삭제</button>}
          </header>
          <main className="container p-4 size-full bg-gray-100">
            <div className="flex flex-col gap-2">
              <label htmlFor="">어떤 종류인가요?</label>
              <input
                type="text"
                value={values.name}
                onChange={onChange('name')}
                className="p-2 rounded-none bg-transparent border-b border-gray-400"
                placeholder="휴식 또는 세트"
              />
            </div>
            <div className="flex flex-col mt-12 gap-2">
              <label htmlFor="">운동 시간을 입력해주세요.</label>
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full p-2 rounded-none bg-transparent border-b border-gray-400"
                  value={values.time}
                  inputMode="decimal"
                  onChange={onChange('time')}
                />
                <span className="absolute right-0 top-0 bottom-0 flex items-center pr-2 text-gray-500">
                  초
                </span>
              </div>
            </div>
          </main>
          <div className="w-full max-w-md fixed bottom-0 flex">
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
