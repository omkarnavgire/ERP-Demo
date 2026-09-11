import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/api/Auth/login')) {
    return next(req);
  }

  if (req.url.startsWith('https://leadapis.ciitstudent.com/')) {
    console.log('Lead API request without JWT:', req.url);
    return next(req);
  }

  const token = localStorage.getItem('accessToken');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};