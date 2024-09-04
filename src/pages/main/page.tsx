import { Card } from '../../components/card';
import { ExerciseCard } from './ui';
import { useAddExercise, useExerciseList } from '../../apis';
import { recommendedSets } from '../../constants';

const Page = () => {
  const { data: mySet } = useExerciseList();

  const addMutation = useAddExercise();

  const handleClick = () => {
    if (window.confirm('추가하시겠습니까?') === false) return;

    addMutation.mutate();
  };

  return (
    <div className="max-w-md mx-auto">
      <header className="sticky top-0 left-0 h-16 p-4 text-primary">
        healpo
      </header>
      <main className="container">
        <article className="p-4">
          <h1 className="text-3xl font-bold">헬뽀 추천 세트</h1>
          <section className="flex gap-4 overflow-x-auto">
            {recommendedSets.map((set, index) => (
              <ExerciseCard
                key={index}
                id={set.id}
                title={set.title}
                iconId={set.iconId}
                isRecommended
              />
            ))}
          </section>
        </article>
        <article className="mt-4 p-4">
          <h1 className="text-3xl font-bold">내 운동 세트</h1>
          <section className="flex gap-4 overflow-x-auto">
            <Card
              className="mt-4 p-4 min-w-32 w-32 h-40 flex flex-col justify-between cursor-pointer animated-button"
              onClick={handleClick}
            >
              <p>추가</p>
            </Card>
            {mySet?.map((set, index) => (
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
    </div>
  );
};

export default Page;
