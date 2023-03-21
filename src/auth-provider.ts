import { User, UserInput } from './types.d';



const localStorageKey = '__auth_provider_token__'

async function getToken() {

    return window.localStorage.getItem(localStorageKey)
}

function handleUserResponse({ user }: { user: User }) {
    window.localStorage.setItem(localStorageKey, user.token)
    return user
}

async function login({ username, password }: UserInput) {
    const result = await client('login', { username, password });
    return handleUserResponse(result);
}

async function register({ username, password }: UserInput) {
    const res = await client('register', { username, password });
    return handleUserResponse(res);
}

async function logout() {
    window.localStorage.removeItem(localStorageKey)
}

const authURL = process.env.REACT_APP_AUTH_URL

async function client(endpoint: string, data: Object) {
    const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }

    return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
        const res = await response.json()
        if (response.ok) {
            return res
        } else {
            return Promise.reject(res)
        }
    })
}

export { getToken, login, register, logout, localStorageKey }
