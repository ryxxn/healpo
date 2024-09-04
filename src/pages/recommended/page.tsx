import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../../route';
import { ChevronLeft } from 'lucide-react';
import { recommendedSets } from '../../constants';

const Page = () => {
  const { id } = useParams();

  const data = recommendedSets.find((set) => set.id === id);

  const navigate = useNavigate();

  const getStackedTime = (index: number) => {
    const stackedTime = data!.sets
      ?.slice(0, index + 1)
      .reduce((acc, cur) => acc + Number(cur.time), 0);

    return `${stackedTime}`;
  };

  return (
    <>
      <div className="max-w-md mx-auto size-full overflow-x-hidden">
        <header className="sticky h-16 p-4 flex justify-between">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft />
          </button>
          <button onClick={() => navigate(PATH.recommendedPlay(id!))}>
            play
          </button>
        </header>
        <main className="container">
          <article className="p-4">
            <section>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl">추천 운동</h2>
                <div className="p-2 rounded-none bg-transparent border-b border-gray-400">
                  {data?.title ?? ''}
                </div>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-xl">세트</h2>
              <div className="mt-4 flex flex-col gap-4">
                {data?.sets?.map((set, index) => (
                  <div className="mt-2 flex flex-col gap-2" key={index}>
                    <div className="flex justify-between items-center">
                      <p>{set.name}</p>
                      <div className="flex gap-2 items-center">
                        <span>{set.time} s</span>
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
            </section>
          </article>
        </main>
      </div>
    </>
  );
};

export default Page;
