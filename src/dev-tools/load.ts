//@ts-nocheck
function loadDevTools(callback) {

    const url = new URL(window.location)
    const setInUrl = url.searchParams.has('dev-tools')
    const urlEnabled = url.searchParams.get('dev-tools') === 'true'
    if (setInUrl) {
        if (urlEnabled) {
            return go()
        } else {
            return callback()
        }
    }


    const localStorageValue = window.localStorage.getItem('dev-tools')
    const setInLocalStorage = localStorageValue != undefined
    const localStorageEnabled = localStorageValue === 'true'
    if (setInLocalStorage) {
        if (localStorageEnabled) {
            return go()
        } else {
            return callback()
        }
    }


    if (window.Cypress) return callback()


    if (process.env.NODE_ENV === 'development') return go()

    return callback()

    function go() {

        import('./dev-tools')
            .then(devTools => devTools.install())
            .finally(callback)
    }
}

export { loadDevTools }

/*
eslint
  eqeqeq: "off",
*/
