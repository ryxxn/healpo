export const PATH = {
  root: '/',
  main: '/main',
  detail: (id: string) => `/exercise/${id}`,
  play: (id: string) => `/exercise/${id}/play`,
  recommended: (id: string) => `/recommended/${id}`,
  recommendedPlay: (id: string) => `/recommended/${id}/play`,
};
