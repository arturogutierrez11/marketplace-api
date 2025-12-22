export interface IMegatoneAuthRepository {
  getAccessToken(): Promise<string>;
}
