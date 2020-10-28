import React, { useState } from 'react'

const AddUserForm = props => {
	const initialFormState = { id: null, firstname: '', lastname: '' ,username:'',emaiaddress:''}
	const [ user, setUser ] = useState(initialFormState)
	const [FirstnameErr,setFirstnameErr] = useState({})
	const [LastnameErr,setLastnameErr] = useState({})
	const [UsernameErr,setUsernameErr] = useState({})
	const [EmaiaddressErr,setEmaiaddressErr] = useState({})

	//const {FirstNameErr,LastnameErr,UsernameErr,EmaiaddressErr} = props

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	const validateForm = ()=> {
		//console.log(user,"From Validation Form")
		let fields = user;
		let formIsValid = true;
		const FirstnameErr = {}
		const LastnameErr = {}
		const UsernameErr = {}
		const EmaiaddressErr = {}

		if (!fields["username"]) {
			UsernameErr.emptyUsername = "Please enter your username."
		  formIsValid = false;
		}
		
		if (!fields["firstname"]) {
			FirstnameErr.emptyUsername = "Please enter your firstname."
		  formIsValid = false;
		}
	
		if (!fields["lastname"]) {
			LastnameErr.emptyUsername = "Please enter your lastname."
		  formIsValid = false;
		}
	
		if (!fields["emaiaddress"]) {
			EmaiaddressErr.emptyEmailAddress = "Please enter your email-ID."
		  formIsValid = false;
		}
		let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

  		if (!pattern.test(fields["emaiaddress"])) {
			EmaiaddressErr.emailValidation = "Please enter valid email-ID."
			formIsValid = false;
		}

		const value = props.users.some(element => element.username === fields["username"])
		console.log(value,"Unique Usename Validation")
		if(value){
			UsernameErr.uniqueUserName = "User with this username exists.Please try new username"
		  formIsValid = false;
		}
		setFirstnameErr(FirstnameErr)
		setLastnameErr(LastnameErr)
		setUsernameErr(UsernameErr)
		setEmaiaddressErr(EmaiaddressErr)
		return formIsValid;
	  }

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if(validateForm()){
					props.addUser(user)
					setUser(initialFormState)
				}
			}}
		>
			<label>First Name</label>
			<input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} />
			{Object.keys(FirstnameErr).map((keys,index)=>{
				return <div style={{color:"red"}}key={index}>{FirstnameErr[keys]}</div>
			})}
			<label>Last Name</label>
			<input type="text" name="lastname" value={user.lastname} onChange={handleInputChange} />
			{Object.keys(LastnameErr).map((keys,index)=>{
				return <div style={{color:"red"}}key={index}>{LastnameErr[keys]}</div>
			})}
			<label>Username</label>
			<input type="text" name="username" value={user.username} onChange={handleInputChange} />
			{Object.keys(UsernameErr).map((keys,index)=>{
				return <div style={{color:"red"}}key={index}>{UsernameErr[keys]}</div>
			})}
			<label>Email Address</label>
			<input type="text" name="emaiaddress" value={user.emaiaddress} onChange={handleInputChange} />
			{Object.keys(EmaiaddressErr).map((keys,index)=>{
				return <div 
				style={{color:"red"}}
				key={index}
				>{EmaiaddressErr[keys]}</div>
			})}
			<button>Add new user</button>
		</form>
	)
}

export default AddUserForm
