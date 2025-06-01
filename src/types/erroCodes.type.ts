export class ErrorCode {
  private code: number

  constructor(code: number) {
    this.code = code
  }
  getCode(): number {
    return this.code
  }
}
