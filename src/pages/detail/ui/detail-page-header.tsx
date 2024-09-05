import { ChevronLeft, Trash2, Play } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../../../route';
import { customConfirm } from '../../../utils';
import { useDeleteExercise } from '../../../apis';

const DetailPageHeader = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteMutation = useDeleteExercise();

  const onDelete = async () => {
    const answer = await customConfirm('정말 삭제하시겠습니까?');

    if (answer === true) {
      deleteMutation.mutate(id!);
    }
  };

  return (
    <header className="sticky h-16 p-4 flex justify-between">
      <button onClick={() => navigate(-1)}>
        <ChevronLeft />
      </button>
      <div className="flex gap-4 items-center">
        <button onClick={onDelete}>
          <Trash2 />
        </button>
        <button onClick={() => navigate(PATH.play(id!))}>
          <Play />
        </button>
      </div>
    </header>
  );
};

export default DetailPageHeader;
