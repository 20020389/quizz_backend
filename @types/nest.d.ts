declare type NestRequest = import('express').Request & {
  user?: import('firebase-admin/auth').DecodedIdToken;
};
