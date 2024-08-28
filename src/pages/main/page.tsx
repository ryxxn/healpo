import React from 'react';
import { Card } from '../../components/card';
import { ICONS, TABLE } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../route';
import { motion } from 'framer-motion';
import { useIndexedDB } from '../../providers';
import { uuidv4 } from '../../utils';
import { IExercise } from '../../types';
import { ExerciseCard } from './ui';

const recomendedSet = [
  {
    id: '1',
    title: '5 X 5 세트',
    iconId: '1',
  },
  {
    id: '2',
    title: 'Interval\n트레이닝',
    iconId: '2',
  },
  {
    id: '3',
    title: '10 X 10 세트',
    iconId: '3',
  },
];

const Page = () => {
  const navigate = useNavigate();

  const { addData, getAllData } = useIndexedDB();

  const [mySet, setMySet] = React.useState<IExercise[]>([]);

  const handleAddData = async () => {
    const id = uuidv4();
    const data: IExercise = {
      id,
      title: '',
      iconId: null,
      sets: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await addData<IExercise>(TABLE.EXERCISE, data);

    return id;
  };

  const handleClick = async () => {
    if (window.confirm('추가하시겠습니까?') === false) return;

    const id = await handleAddData();
    navigate(PATH.detail(id));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getAllData<IExercise[]>(TABLE.EXERCISE);
      setMySet(data);
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="sticky top-0 left-0 h-8 p-4">healpo</header>
      <main className="container p-4">
        <article className="mt-8">
          <h1 className="text-3xl font-bold">헬뽀 추천 세트</h1>
          <section className="flex gap-4 overflow-x-auto">
            {recomendedSet.map((set, index) => (
              <ExerciseCard
                key={index}
                id={set.id}
                title={set.title}
                iconId={set.iconId}
              />
            ))}
          </section>
        </article>
        <article className="mt-8">
          <h1 className="text-3xl font-bold">내 운동 세트</h1>
          <section className="flex gap-4 overflow-x-auto">
            <Card
              className="mt-4 p-4 min-w-32 w-32 h-40 flex flex-col justify-between"
              onClick={handleClick}
            >
              <p>추가</p>
            </Card>
            {mySet.map((set, index) => (
              <ExerciseCard
                key={index}
                id={set.id}
                title={set.title}
                iconId={set.iconId}
              />
            ))}
          </section>
        </article>
      </main>
    </motion.div>
  );
};

export default Page;
