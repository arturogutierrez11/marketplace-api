export type OnCityHttpErrorType = 'RATE_LIMIT' | 'TIMEOUT' | 'SERVER' | 'UNKNOWN';

export class OnCityHttpError extends Error {
  public readonly statusCode: number | null;
  public readonly response: any;
  public readonly errorType: OnCityHttpErrorType;

  /**
   * ✔ Soporta:
   *   new OnCityHttpError(500, err, 'mensaje')
   *   new OnCityHttpError(500, err, 'SERVER', 'mensaje')
   */
  constructor(statusCode: number | null, response: any, messageOrType: string | OnCityHttpErrorType, message?: string) {
    // Si viene mensaje directo (forma vieja)
    if (message === undefined) {
      super(messageOrType as string);
      this.errorType = 'UNKNOWN';
    } else {
      // Forma nueva con errorType
      super(message);
      this.errorType = messageOrType as OnCityHttpErrorType;
    }

    this.statusCode = statusCode;
    this.response = response;
  }
}
