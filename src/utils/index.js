export const apiCall = async (endpoint, {body, ...customConfig} = {}) => {
    const token = localStorage.getItem('token')
    const headers = {'Content-Type': 'application/json'}

    if(token) {
        headers.Authorization = `Bearer ${token}`
    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers
        }
    }

    if(body) {
        config.body = JSON.stringify(body)
    }

    const req = await fetch(`${process.env.REACT_APP_API_BACKEND_URL}${endpoint}`, config)
    
    const res = await req.json()
    
    return res
    
}