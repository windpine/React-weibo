export const getConfig = () => {
    return {
        baseURL: 'http://localhost:8080/message',
        params: {
            UID: sessionStorage.getItem('uid')
        }
    }
}
export const deleteConfig = (messageID) =>{
    return{
        baseURL:'http://localhost:8080/message',
        params:{
            UID:sessionStorage.getItem('uid'),
            messageID:messageID,
        }
    }
}