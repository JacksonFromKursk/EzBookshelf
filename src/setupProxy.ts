//@ts-nocheck
export function proxy(app) {
    app.get(/^\/$/, (_req, res) => res.redirect('/discover'))


    app.head(/^\/list$/, (_req, res) => res.status(200).end())
}




