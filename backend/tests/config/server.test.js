import request from 'supertest';
import app from '../../src/server';

jest.mock('../../src/models/Student.js', () => ({

  findAll: jest.fn(),
}));

import Student from '../../src/models/Student.js';
describe('Server Tests', () => {
  it('should start the server and respond to a health check', async () => {
    Student.findAll.mockResolvedValue([
      { id: '1', name: 'João Silva', email: 'joao.silva@example.com', ra: '12345' },
    ]);
    const response = await request(app).get('/student/all');

    expect(response.status).toBe(200);
    // expect(response.body.message).toBe('Server is running');
  });
});
