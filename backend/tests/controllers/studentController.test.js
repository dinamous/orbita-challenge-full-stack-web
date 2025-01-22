import request from 'supertest';
import app from '../../src/server';

// Mock do modelo Student
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
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  it('should create a student successfully', async () => {
    // Configura o mock para o método create
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
      { id: '1', name: 'Ana Pereira', email: 'ana.pereira@example.com', ra: '34567' },
      { id: '2', name: 'João Souza', email: 'joao.souza@example.com', ra: '45678' },
    ]);

    const response = await request(app).get('/student/all');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe('Ana Pereira');
    expect(response.body[1].name).toBe('João Souza');
  });

  it('should return 404 for a non-existent student', async () => {
    Student.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/student/list/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Student not found');
  });
});
