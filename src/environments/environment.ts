declare const require: any;

let localEnv: any = {};

try {
  localEnv = require('./environment.local').environment;
} catch {
  console.warn('⚠️ No se encontró environment.local.ts, usando configuración por defecto.');
}

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  KEY: '',
  IV: '',
  ...localEnv
};

