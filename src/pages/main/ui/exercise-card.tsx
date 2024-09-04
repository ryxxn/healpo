import React from 'react';
import { Card } from '../../../components/card';
import { IExercise } from '../../../types';
import { ICONS } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../route';

interface Props extends Pick<IExercise, 'id' | 'title' | 'iconId'> {
  isRecommended?: boolean;
}

const ExerciseCard = ({ id, title, iconId, isRecommended = false }: Props) => {
  const navigate = useNavigate();

  const getIcon = (iconId: string | null) => {
    if (!iconId) return null;
    const icon = ICONS.find((icon) => icon.id === iconId);
    return icon ?? null;
  };

  const handleClick = () => {
    if (isRecommended) {
      navigate(PATH.recommended(id));
      return;
    }
    navigate(PATH.detail(id));
  };

  const icon = getIcon(iconId);

  return (
    <Card
      role="button"
      className="mt-4 p-4 min-w-32 w-32 h-40 flex flex-col justify-between animated-button"
      onClick={handleClick}
    >
      <p>{title}</p>
      {icon && <img className="self-end" src={icon.src} alt={icon.name} />}
    </Card>
  );
};

export default ExerciseCard;
