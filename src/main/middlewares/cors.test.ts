import app from "../config/app"

describe('CORS Middleware', () => {
  test('Should enable cors', async () => {
    app.get('/cors_test', async (req, rep) => {
      rep.send()
    })

    const response = await app.inject({
      method: "GET",
      url: "/cors_test"
    })

    expect(response.headers['access-control-allow-origin']).toBe('*')
  })
})
