import functions from 'firebase-functions'

export default function() {
  functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!')
  })
}
