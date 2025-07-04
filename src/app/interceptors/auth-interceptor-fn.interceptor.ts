import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWYyYjMzZTU3MzJlYTczNThiNjc1Zjc1MDUwZjRmNyIsIm5iZiI6MTcxMTc1OTU3NC4xMTIsInN1YiI6IjY2MDc2MGQ2YTZkZGNiMDEzMDQ0MjQ5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5uKfDXXgZ98oR2SJgVy6fyYf3M2KLj8qOi-2XLLcUM';
  const cloned = req.clone({
    setHeaders: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return next(cloned);
};
