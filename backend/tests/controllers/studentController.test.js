import request from 'supertest';
import app from '../../src/server';

jest.mock('../../src/models/Student.js', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

import Student from '../../src/models/Student.js';

describe('Student Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a student successfully', async () => {
    Student.create.mockResolvedValue({
      id: '1',
      name: 'Carlos Silva',
      email: 'carlos.silva@example.com',
      ra: '56789',
    });

    const response = await request(app).post('/student/create').send({
      name: 'Carlos Silva',
      email: 'carlos.silva@example.com',
      cpf: '12345678901',
      ra: '56789',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Student created successfully');
    expect(Student.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Carlos Silva',
        email: 'carlos.silva@example.com',
        ra: '56789',
      })
    );
  });

  it('should return validation error for missing fields', async () => {
    const response = await request(app).post('/student/create').send({
      email: 'maria.oliveira@example.com',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('All fields are required: name, email, cpf, ra');
  });

  it('should return error for invalid email format', async () => {
    const response = await request(app).post('/student/create').send({
      name: 'Joana Santos',
      email: 'email-invalido',
      cpf: '98765432100',
      ra: '12345',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email format');
  });

  it('should fetch all students', async () => {
    Student.findAll.mockResolvedValue([
      { id: '1', name: 'João Silva', email: 'joao.silva@example.com', ra: '12345' },
    ]);

    const response = await request(app).get('/student/all');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'João Silva', email: 'joao.silva@example.com' }),
      ])
    );
  });

  it('should return 404 for a non-existent student', async () => {
    Student.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/student/list/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Student not found');
  });
});
