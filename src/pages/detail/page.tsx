import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InputPage } from './ui';
import { uuidv4 } from '../../utils';
import { PATH } from '../../route';
import { useExercise, useUpdateExercise } from '../../apis';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Page = () => {
  const { id } = useParams();

  const { data } = useExercise({ id: id!, enabled: !!id });
  const updateMutation = useUpdateExercise();

  const [selectedSetId, setSelectedSetId] = React.useState<string | null>(null);

  const [title, setTitle] = React.useState(data?.title ?? '');

  const navigate = useNavigate();

  const onSave = async () => {
    updateMutation.mutate({
      ...data!,
      title,
    });
  };

  const onSelectSet = (setId: string) => {
    setSelectedSetId(setId);
  };

  const onAddSet = () => {
    const id = uuidv4();
    setSelectedSetId(id);
  };

  const getStackedTime = (index: number) => {
    const stackedTime = data!.sets
      ?.slice(0, index + 1)
      .reduce((acc, cur) => acc + Number(cur.time), 0);

    return `${stackedTime}`;
  };

  React.useEffect(() => {
    if (!data) return;
    setTitle(data.title ?? '');
  }, [data]);

  return (
    <div className="max-w-md mx-auto size-full overflow-x-hidden">
      <header className="sticky h-16 p-4 flex justify-between">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <button onClick={() => navigate(PATH.play(id!))}>play</button>
      </header>
      <main className="container">
        <article className="p-4">
          <section>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl">어떤 운동을 하시나요?</h2>
              <input
                type="text"
                className="p-2 rounded-none bg-transparent border-b border-gray-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ex) 스쿼트"
              />
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xl">세트를 추가해보세요!</h2>
            <div className="mt-4 flex flex-col gap-4">
              {data?.sets?.map((set, index) => (
                <div className="mt-2 flex flex-col gap-2" key={index}>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => onSelectSet(set.id)}
                  >
                    <p>{set.name}</p>
                    <div className="flex gap-2 items-center">
                      <span>{set.time} s</span> <ChevronRight size="16" />
                    </div>
                  </div>
                  <div className="text-center text-gray-400 grid grid-cols-3 items-center text-xs">
                    <div className="w-full h-px bg-gray-300" />
                    <div>{getStackedTime(index)}s 후 알림</div>
                    <div className="w-full h-px bg-gray-300" />
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-8 w-full p-4 rounded-lg border border-primary"
              onClick={onAddSet}
            >
              세트 추가
            </button>
          </section>
        </article>
        <InputPage
          open={!!selectedSetId}
          onClose={() => setSelectedSetId(null)}
          setId={selectedSetId}
        />
      </main>
      <div className="w-full max-w-md fixed bottom-0 flex">
        <button className="p-4 bg-primary grow text-white" onClick={onSave}>
          저장
        </button>
      </div>
    </div>
  );
};

export default Page;
