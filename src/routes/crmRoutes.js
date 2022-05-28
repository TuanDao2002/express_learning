import { addNewContact, 
        getContacts,
        getContactWithId,
        updateContact,
        deleteContact,
        deleteAllContact 
} from '../controllers/crmController'

const routes = (app) => {
    app.route('/contact') // can chain many endpoints into a single route
        .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next() // use next() to pass to the next function of this GET endpoint
        }, getContacts)

        .get((req, res) => console.log("this will be skipped without next() in previous middleware!!!"))

        .post(addNewContact) // the POST endpoint will call the "addNewContact" method from Controller

        .delete(deleteAllContact)

    app.route('/contact/:contactID') // this route has a path variable
        .get(getContactWithId)

        .put(updateContact)

        .delete(deleteContact)
}

export default routes;