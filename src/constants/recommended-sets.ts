import type { IExercise } from '../types';
import { ICONS } from './icons';

export const recommendedSets: IExercise[] = [
  {
    id: '1',
    title: '5 X 5 세트',
    iconId: ICONS[9].id,
    sets: [
      {
        id: '1',
        name: '세트 1 (1rep)',
        time: 2,
        order: 1,
      },
      {
        id: '2',
        name: '세트 1 (2rep)',
        time: 2,
        order: 2,
      },
      {
        id: '3',
        name: '세트 1 (3rep)',
        time: 2,
        order: 3,
      },
      {
        id: '4',
        name: '세트 1 (4rep)',
        time: 2,
        order: 4,
      },
      {
        id: '5',
        name: '세트 1 (5rep)',
        time: 2,
        order: 5,
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '2',
    title: 'Interval 트레이닝',
    iconId: ICONS[3].id,
    sets: [
      {
        id: '1',
        name: '세트 1',
        time: 60,
        order: 1,
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '3',
    title: '10 X 10 세트',
    iconId: ICONS[11].id,
    sets: [
      {
        id: '1',
        name: '세트 1',
        time: 60,
        order: 1,
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];
