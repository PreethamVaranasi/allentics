const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

let usersData = [
    { id: 1, firstname: 'Preetham', lastname:"Varanasi",username: 'preethamvaranasi' ,emaiaddress:"varanasipreetham@gmail.com"},
    { id: 2, firstname: 'Vasu', lastname:"Varanasi",username: 'vasuvaranasi' ,emaiaddress:"vasuvaranasi@gmail.com"},
    { id: 3, firstname: 'Preethi', lastname:"Varanasi",username: 'preethivaranasi' ,emaiaddress:"preethivaranasi@gmail.com"}
]
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(bodyParser.json());




router.get('/allentics/getusers',(req,res) => {
    return res.status(200).json({
        success:1,
        data:usersData,
        message:"Users Data Recieved Successfully"
    })
});
router.post('/allentics/postuser',(req,res) => {
    try{
        const userDetails = req.body
        if(Object.keys(userDetails).length != 5){return res.status(500).json({success:0,data:[],message:"Invalid Payload"})}
        let idExists = "id" in userDetails;
        let firstnameExists = "firstname" in userDetails;
        let lastnameExists = "lastname" in userDetails;
        let usernameExists = "username" in userDetails;
        let emaiaddressExists = "emaiaddress" in userDetails;
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i); 
        if(Object.keys(userDetails).length != 5){return res.status(500).json({success:0,data:[],message:"Invalid Payload"})}
        if(!idExists){return res.status(500).json({success:0,data:[],message:"Id should be provides"})}
        if(!firstnameExists){return res.status(500).json({success:0,data:[],message:"Firstname should be provides"})}
        if(!lastnameExists){return res.status(500).json({success:0,data:[],message:"Lastname should be provides"})}
        if(!usernameExists){return res.status(500).json({success:0,data:[],message:"Username should be provides"})}
        if(!emaiaddressExists){return res.status(500).json({success:0,data:[],message:"Email address should be provides"})}
        if (!pattern.test(userDetails.emaiaddress)){return res.status(500).json({success:0,data:[],message:"Invalid Email Address"})}
        const value = usersData.some(element => element.username === userDetails.username)
		if(value){return res.status(500).json({success:0,data:[],message:"User With this username Exists please try with different username"})}
        usersData.push(userDetails)
        return res.status(201).json({
            success:1,
            data:usersData,
            message:"Created User"
        })
    }catch(e){
        return res.status(500).json({
            success:0,
            data:[],
            message:"Failed To create user"
        })
    }
});
router.post('/allentics/deleteuser',(req,res) => {
    try{
        const userID = req.body.userid
        if(Object.keys(req.body).length != 1){return res.status(500).json({success:0,data:[],message:"Invalid Payload"})}
        let userIdExists = "userid" in req.body;
        if(!userIdExists){return res.status(500).json({success:0,data:[],message:"UserId should be provides"})}
        const updateduserData = usersData.filter((user) => {
            if(user.id === userID){
              return false;
            }
        
            return true;
        });
        usersData = updateduserData
        return res.status(200).json({
            success:1,
            data:usersData,
            message:"User Deleted"
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:0,
            data:[],
            message:"Failed To delete user"
        })
    }
});

router.post('/allentics/updateuser',(req,res) => {
    try{
        const userDetails = req.body
        if(Object.keys(userDetails).length != 5){return res.status(500).json({success:0,data:[],message:"Invalid Payload"})}
        let idExists = "id" in userDetails;
        let firstnameExists = "firstname" in userDetails;
        let lastnameExists = "lastname" in userDetails;
        let usernameExists = "username" in userDetails;
        let emaiaddressExists = "emaiaddress" in userDetails;
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i); 
        if(Object.keys(userDetails).length != 5){return res.status(500).json({success:0,data:[],message:"Invalid Payload"})}
        if(!idExists){return res.status(500).json({success:0,data:[],message:"Id should be provides"})}
        if(!firstnameExists){return res.status(500).json({success:0,data:[],message:"Firstname should be provides"})}
        if(!lastnameExists){return res.status(500).json({success:0,data:[],message:"Lastname should be provides"})}
        if(!usernameExists){return res.status(500).json({success:0,data:[],message:"Username should be provides"})}
        if(!emaiaddressExists){return res.status(500).json({success:0,data:[],message:"Email address should be provides"})}
        if (!pattern.test(userDetails.emaiaddress)){return res.status(500).json({success:0,data:[],message:"Invalid Email Address"})}
        const userID = userDetails.id
        usersData.forEach((user,i) => {if(user.id === userID) usersData[i]= userDetails})
        //console.log(usersData)
        return res.status(200).json({
            success:1,
            data:usersData,
            message:"User Deleted"
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:0,
            data:[],
            message:"Failed To delete user"
        })
    }
});


// add router in the Express app.
app.use("/", router);
app.listen(4000,()=>{
    console.log('Sever is running on port:',4000 )
})