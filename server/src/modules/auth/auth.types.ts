export type JWTPayload = {
  id: string;
  fname: string;
  lname: string;
  nickname: string;
  email: string;
};

export enum AuthEnvKey {
  AccessTokenSecret = "JWT_ACCESS_SECRET",
  RefreshTokenSecret = "JWT_REFRESH_SECRET",
}
