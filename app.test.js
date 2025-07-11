const request = require('supertest');
const app = require('./app');

describe('User API', () => {
  // Test for API 1: Get all users
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/api/users');
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  // Test for API 2: Get user by ID
  describe('GET /api/users/:id', () => {
    it('should return a user if valid ID is provided', async () => {
      const res = await request(app).get('/api/users/1');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('email');
    });

    it('should return 404 if invalid ID is provided', async () => {
      const res = await request(app).get('/api/users/999');
      
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });

  // Test for API 3: Create a new user
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com'
      };
      
      const res = await request(app)
        .post('/api/users')
        .send(userData);
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name', userData.name);
      expect(res.body).toHaveProperty('email', userData.email);
    });

    it('should return 400 if name or email is missing', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Incomplete User' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Name and email are required');
    });
  });

  // Test for API 4: Update a user
  describe('PUT /api/users/:id', () => {
    it('should update an existing user', async () => {
      const userData = {
        name: 'Updated User',
        email: 'updated@example.com'
      };
      
      const res = await request(app)
        .put('/api/users/1')
        .send(userData);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('name', userData.name);
      expect(res.body).toHaveProperty('email', userData.email);
    });

    it('should return 404 if user does not exist', async () => {
      const userData = {
        name: 'Non-existent User',
        email: 'nonexistent@example.com'
      };
      
      const res = await request(app)
        .put('/api/users/999')
        .send(userData);
      
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should return 400 if name or email is missing', async () => {
      const res = await request(app)
        .put('/api/users/1')
        .send({ name: 'Incomplete Update' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Name and email are required');
    });
  });

  // Test for API 5: Delete a user
  describe('DELETE /api/users/:id', () => {
    it('should delete an existing user', async () => {
      const res = await request(app).delete('/api/users/2');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', 2);
      
      // Verify the user is actually deleted
      const checkRes = await request(app).get('/api/users/2');
      expect(checkRes.statusCode).toBe(404);
    });

    it('should return 404 if user does not exist', async () => {
      const res = await request(app).delete('/api/users/999');
      
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });
});