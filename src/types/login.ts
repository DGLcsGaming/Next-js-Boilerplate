import type { Tokens } from './tokens';
import type { User } from './user';

export interface LoginQuery {
  email: string;
  password: string;
}

export interface LoginResult {
  tokens: Tokens;
  user: User;
}
