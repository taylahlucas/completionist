import { isEmailValid, isPwValid, isNameValid } from '../hooks';

describe('isEmailValid', () => {
  it('returns true for valid email', () => {
    expect(isEmailValid('test@example.com')).toBe(true);
  });

  it('returns false for missing "@" symbol', () => {
    expect(isEmailValid('testexample.com')).toBe(false);
  });

  it('returns false for missing domain', () => {
    expect(isEmailValid('test@')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isEmailValid('')).toBe(false);
  });

  it('returns false for spaces', () => {
    expect(isEmailValid('test @example.com')).toBe(false);
  });
});

describe('isPwValid', () => {
  it('returns true for valid password', () => {
    expect(isPwValid('Password123')).toBe(true);
  });

  it('returns false for missing uppercase', () => {
    expect(isPwValid('password123')).toBe(false);
  });

  it('returns false for missing lowercase', () => {
    expect(isPwValid('PASSWORD123')).toBe(false);
  });

  it('returns false for missing number', () => {
    expect(isPwValid('Password')).toBe(false);
  });

  it('returns false for too short password', () => {
    expect(isPwValid('Pw1')).toBe(false);
  });
});

describe('isNameValid', () => {
  it('returns true for non-empty name', () => {
    expect(isNameValid('Alice')).toBe(true);
  });

  it('returns false for empty string', () => {
    expect(isNameValid('')).toBe(false);
  });

  it('returns true for one-character name', () => {
    expect(isNameValid('A')).toBe(true);
  });
});
