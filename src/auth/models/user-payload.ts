export interface UserPayload {
  sub: number;
  cpf: string;
  name: string;
  iat?: number;
  exp?: number;
}
