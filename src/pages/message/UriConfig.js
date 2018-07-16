export const config = {
    baseURL:'http://localhost:8080/message/',
    params:{
        UID :sessionStorage.getItem('uid')
    }
}