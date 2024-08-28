import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ReactQueryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        retry: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
