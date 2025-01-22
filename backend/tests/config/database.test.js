import config from '../../src/config/database';

describe('Database Config Tests', () => {
  it('should load the database configuration', () => {
    expect(config).toHaveProperty('username');
    expect(config).toHaveProperty('password');
    expect(config).toHaveProperty('database');
  });
});
