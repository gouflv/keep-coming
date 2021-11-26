export const ENV: 'development' | 'production' =
  (process.env.NODE_ENV as any) || 'production'
