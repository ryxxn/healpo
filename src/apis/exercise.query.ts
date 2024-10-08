import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { queryKeys } from './query-key-factory';
import { useIndexedDB } from '../providers';
import { TABLE } from '../constants';
import { uuidv4 } from '../utils';
import { IExercise } from '../types';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../route';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------------

type UseQueryProps = Omit<UseQueryOptions, 'queryKey'>;
type UseMutationProps<T = any> = Omit<
  UseMutationOptions<any, any, T>,
  'mutationKey'
>;

// ----------------------------------------------------------------------

// GET
export const useExerciseList = (options?: UseQueryProps) => {
  const db = useIndexedDB();

  return useQuery({
    queryKey: queryKeys.exercise.list,
    queryFn: async () => db.getAllData(TABLE.EXERCISE),
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  }) as UseQueryResult<IExercise[], Error>;
};

export const useExercise = ({
  id,
  ...options
}: { id: string } & UseQueryProps) => {
  const db = useIndexedDB();

  return useQuery({
    queryKey: queryKeys.exercise.detail(id),
    queryFn: async () => db.getData(TABLE.EXERCISE, id),
    ...options,
  }) as UseQueryResult<IExercise, Error>;
};

// ----------------------------------------------------------------------

// POST
export const useAddExercise = (props?: UseMutationProps<void>) => {
  const db = useIndexedDB();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const id = uuidv4();
      const data = {
        id,
        title: '',
        iconId: null,
        sets: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await db.addData(TABLE.EXERCISE, data);

      return id;
    },
    onSuccess: (id) => navigate(PATH.detail(id)),
    onError: (error) => toast.error('운동 생성에 실패했습니다.'),
    ...props,
  });
};

// ----------------------------------------------------------------------

// PUT
export const useUpdateExercise = (props?: UseMutationProps<IExercise>) => {
  const db = useIndexedDB();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IExercise) => db.updateData(TABLE.EXERCISE, data),
    onSuccess: () => {
      toast.success('저장되었습니다.');
      queryClient.invalidateQueries({ queryKey: queryKeys.exercise.list });
    },
    onError: () => toast.error('저장에 실패했습니다.'),
    ...props,
  });
};

// ----------------------------------------------------------------------

// Delete
export const useDeleteExercise = (props?: UseMutationProps<string>) => {
  const db = useIndexedDB();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (id: string) => db.deleteData(TABLE.EXERCISE, id),
    onSuccess: () => {
      toast.success('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: queryKeys.exercise.list });
      navigate(PATH.main);
    },
    onError: () => toast.error('삭제에 실패했습니다.'),
    ...props,
  });
};
