export interface IExercise {
  id: string;
  title: string;
  iconId: string | null;
  sets: ISet[];
  createdAt: number;
  updatedAt: number;
}

export interface ISet {
  id: string;
  name: string;
  time: number;
  order: number;
}
