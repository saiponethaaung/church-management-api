import { randomBytes } from 'crypto';

export class SecretGenerator {
  private static readonly DEFAULT_LENGTH = 32;
  private static readonly DEFAULT_CHARSET =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  /**
   * Generates a cryptographically secure random string
   * @param length The length of the string to generate (default: 32)
   * @param charset The characters to use in the string (default: alphanumeric)
   * @returns A random string
   */
  static generate(
    length: number = this.DEFAULT_LENGTH,
    charset: string = this.DEFAULT_CHARSET,
  ): string {
    const randomBytesNeeded = Math.ceil(length * 2); // Get more bytes than needed to avoid modulo bias
    const randomBytesArray = randomBytes(randomBytesNeeded);
    let result = '';

    for (
      let i = 0;
      i < randomBytesArray.length && result.length < length;
      i++
    ) {
      const randomIndex = randomBytesArray[i] % charset.length;
      result += charset.charAt(randomIndex);
    }

    return result;
  }

  /**
   * Generates a Keycloak-compatible client secret
   * @returns A random string suitable for use as a Keycloak client secret
   */
  static generateKeycloakSecret(): string {
    return this.generate();
  }
}
