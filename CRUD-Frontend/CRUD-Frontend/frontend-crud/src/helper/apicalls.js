export const getusers = () =>{
    return fetch(`http://localhost:4000/allentics/getusers`,{method:'GET'})
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const signup = (user) =>{
    return fetch(`http://localhost:4000/allentics/postuser`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(user),
    })
    .then((response) =>{
        return response.json()
    })
    .catch((err) => console.log(err))
}

export const deleteuser = (userid) =>{
    return fetch(`http://localhost:4000/allentics/deleteuser`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(userid),
    })
    .then((response) =>{
        console.log(response)
        return response.json()
    })
    .catch((err) => console.log(err))
}

export const updateuser = (user) =>{
    return fetch(`http://localhost:4000/allentics/updateuser`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(user),
    })
    .then((response) =>{
        console.log(response)
        return response.json()
    })
    .catch((err) => console.log(err))
}