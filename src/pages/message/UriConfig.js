export const getConfig = (type) => {
    return {
        baseURL: 'http://localhost:8080/message',
        params: {
            UID: sessionStorage.getItem('uid'),
            type:type
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