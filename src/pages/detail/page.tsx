import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InputPage, useInputPage } from './ui';
import { motion } from 'framer-motion';
import { useIndexedDB } from '../../providers';
import { IExercise, ISet } from '../../types';
import { TABLE } from '../../constants';
import { uuidv4 } from '../../utils';
import { PATH } from '../../route';

const Page = () => {
  const { id } = useParams();

  const { getData, updateData } = useIndexedDB();

  const [data, setData] = React.useState<IExercise>({} as IExercise);
  const [selectedSet, setSelectedSet] = React.useState<ISet | null>(null);

  const navigate = useNavigate();

  const { open, onOpen, onClose } = useInputPage();

  const onChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setData((prev) => ({ ...prev, [key]: value }));
    };

  const onSave = async () => {
    await updateData<IExercise>(TABLE.EXERCISE, data);
    alert('저장되었습니다.');
  };

  const onSelectSet = (set: ISet) => {
    setSelectedSet(set);
    onOpen();
  };

  const onAddSet = () => {
    const id = uuidv4();
    setSelectedSet({
      id,
      name: '',
      time: 30,
      order: data.sets.length,
    });
    onOpen();
  };

  const setSet = (set: ISet) => {
    if (!selectedSet) return;

    const sets = data.sets ?? [];
    const index = sets.findIndex((s) => s.id === set.id);

    if (index === -1) {
      sets.push(set);
    } else {
      sets[index] = set;
    }

    setData((prev) => ({ ...prev, sets }));
    setSelectedSet(null);
    onClose();
  };

  const getStackedTime = (index: number) => {
    const stackesTime = data.sets
      ?.slice(0, index + 1)
      .reduce((acc, cur) => acc + Number(cur.time), 0);

    return `${stackesTime}`;
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const data = await getData<IExercise>(TABLE.EXERCISE, id);
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <motion.div
        className="max-w-md mx-auto size-full"
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        exit={{ x: '-100vw' }}
        transition={{ duration: 0.5 }}
      >
        <header className="sticky top-0 left-0 h-8 p-4 flex justify-between">
          <button onClick={() => navigate(-1)}>뒤로</button>
          <button onClick={() => navigate(PATH.play(id!))}>play</button>
        </header>
        <main className="container p-4">
          <article className="mt-8">
            <section>
              <div className="flex flex-col">
                <label htmlFor="">어떤 운동을 하시나요?</label>
                <input
                  type="text"
                  className="border-b border-gray-400"
                  value={data.title}
                  onChange={onChange('title')}
                />
              </div>
            </section>

            <section className="mt-4">
              <div className="flex flex-col gap-4">
                {data.sets?.map((set, index) => (
                  <div className="flex flex-col gap-2">
                    <div
                      key={index}
                      className="flex justify-between items-center"
                      onClick={() => onSelectSet(set)}
                    >
                      <p>{set.name}</p>
                      <p>{set.time}</p>
                    </div>
                    <time className="text-right">
                      {getStackedTime(index)}초 후 알림
                    </time>
                  </div>
                ))}
              </div>
              <button
                className="mt-8 w-full p-4 rounded-lg border border-primary"
                onClick={onAddSet}
              >
                분기 추가
              </button>
            </section>
          </article>
        </main>
        <div className="fixed bottom-0 left-0 w-full flex">
          <button className="p-4 bg-primary grow text-white" onClick={onSave}>
            저장
          </button>
        </div>
      </motion.div>

      <InputPage
        key={open.toString()}
        open={open}
        onClose={onClose}
        set={selectedSet}
        setSet={setSet}
      />
    </>
  );
};

export default Page;
