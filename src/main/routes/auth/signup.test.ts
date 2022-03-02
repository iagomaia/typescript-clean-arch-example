import app from "../../config/app"

describe('Signup Route', () => {
  test('Should return an User on success', async () => {
    const response = await app.inject({
      method: "post",
      url: "/auth/signup",
      payload: {
        name: 'Test User',
        email: 'user@test.com',
        password: 'user@test123',
        passwordConfirmation: 'user@test123'
      },
    })

    expect(response.statusCode).toBe(201)
  })
})
