import app from './config/app'

app.listen(5050)
  .then(() => {
    console.log("Server listening on http://localhost:5050/")
  })
  .catch(err => {
    console.error(err)
  })