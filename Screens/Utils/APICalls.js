export default async function GetUserInfo(api, packet){
    console.log("Packet: ", packet)
    try{
        const response = await fetch('https://medchatse.herokuapp.com/'+api, {
        method: 'POST',
        headers:{
            'Content-type' : 'application/json',
        },
        body: JSON.stringify(packet)
        })
        const respJson = await response.json()
        // console.log(`${api}:  ${respJson}`)
        console.log(respJson)
        // The response was channel list
        if(!respJson.message){
            return respJson;
            // if(api=='channels/getUserChannels'){                
            // }else if(api=='login/profile'){
            //     setUser(respJson)
            // }else if(api=='channels/getChannels'){
            //     setChannels(respJson)
            // }
        }
        // Response has an error attached to it
        else{
            console.log(`Error in ${api}: , ${respJson}`)
            alert(response.message)
        }
    }
    catch(error){
        alert(error)
    }
}
