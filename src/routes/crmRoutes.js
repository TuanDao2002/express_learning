import { addNewContact } from '../controllers/crmController'

const routes = (app) => {
    app.route('/contact') // can chain many endpoints into a single route
        .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next() // use next() to pass to the next function of this GET endpoint
        }, (req, res, next) => {
            res.send('GET request sucsessfully!')
        })

        .post(addNewContact); // the POST endpoint will call the "addNewContact" method from Controller

    app.route('/contact/:contactID') // this route has a path variable
        .put((req, res) =>
        res.send('PUT request successfully!'))

        .delete((req, res) =>
        res.send('DELETE request successfully!'))
}

export default routes;