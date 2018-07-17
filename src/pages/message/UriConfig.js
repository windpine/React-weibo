export const config = () => {
    return {
        baseURL: 'http://localhost:8080/message/',
        params: {
            UID: sessionStorage.getItem('uid')
        }
    }
}