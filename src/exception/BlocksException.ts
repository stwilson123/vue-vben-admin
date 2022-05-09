export class BlocksException<T> {
  public static isBlocksException<T>(exception: BlocksException<T>) {
    if (exception && exception.code) return true;
  }
  code: string;
  message: string;
  content: T;
  constructor(code: string, message: string, content: T) {
    this.code = code;
    this.message = message;
    this.content = content;
  }
}
