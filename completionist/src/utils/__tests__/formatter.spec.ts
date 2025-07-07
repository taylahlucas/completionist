import {
  capitalize,
  getFormattedSearchString,
  getLocationString,
} from '@utils/hooks';

describe('capitalize', () => {
  it('capitalizes a single word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('capitalizes each word in a sentence', () => {
    expect(capitalize('hello world')).toBe('Hello World');
  });

  it('handles empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('handles already capitalized words', () => {
    expect(capitalize('Hello World')).toBe('Hello World');
  });

  it('handles mixed case', () => {
    expect(capitalize('hELlo wORld')).toBe('HELlo WORld');
  });
});

describe('getFormattedSearchString', () => {
  it('removes special characters and lowercases input', () => {
    expect(getFormattedSearchString('Hello, World!')).toBe('hello world!');
  });

  it('handles empty string', () => {
    expect(getFormattedSearchString('')).toBe('');
  });

  it('preserves alphanumeric characters and spaces', () => {
    expect(getFormattedSearchString('ABC 123')).toBe('abc 123');
  });

  it('removes a wide range of special characters', () => {
    expect(getFormattedSearchString(`test@string#$%^&*()_+`)).toBe(
      'test@string^_',
    );
  });
});

describe('getLocationString', () => {
  it('returns location if hold is empty', () => {
    expect(getLocationString({ hold: '', location: 'New York' })).toBe(
      'New York',
    );
  });

  it('returns hold if location is empty', () => {
    expect(getLocationString({ hold: 'Warehouse', location: '' })).toBe(
      'Warehouse',
    );
  });

  it('combines location and hold if both are present', () => {
    expect(getLocationString({ hold: 'Shelf A', location: 'Storage' })).toBe(
      'Storage - Shelf A',
    );
  });

  it('returns empty string if both are empty', () => {
    expect(getLocationString({ hold: '', location: '' })).toBe('');
  });

  it('handles undefined props', () => {
    expect(getLocationString({})).toBe('');
  });
});
