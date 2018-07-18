export function ContentSplit(content){
    const arr=content.split(" ")
    const format=[]
    arr.map((item)=>{
        if(item.charAt(0)==="@"){
            const user={type:"user",data:item}
            format.push(user)
        }
        else if(item.charAt(0)==="@"){
            const topic={type:"topic",data:item}
            format.push(topic)
        }
        else{
            const text={type:"text",data:item}
            format.push(text)
        }
    })
    return format
}

export function formatTime(time) {
    var d=new Date(time);
    d.setHours(d.getHours()-5)
    var times=d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate() + ' ' + d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds();
    return times
}
