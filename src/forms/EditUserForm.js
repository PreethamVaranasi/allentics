import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)
  const [FirstnameErr,setFirstnameErr] = useState({})
	const [LastnameErr,setLastnameErr] = useState({})
  const [EmaiaddressErr,setEmaiaddressErr] = useState({})
  
  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

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
    
    //console.log(fields["username"],"User Name from input")

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
    
    //console.log(value,"Unique user validation")
		setFirstnameErr(FirstnameErr)
		setLastnameErr(LastnameErr)
		//setUsernameErr(UsernameErr)
		setEmaiaddressErr(EmaiaddressErr)
		return formIsValid;
	  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        if(validateForm()){props.updateUser(user.id, user)}
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
			<label>Email Address</label>
			<input type="text" name="emaiaddress" value={user.emaiaddress} onChange={handleInputChange} />
      {Object.keys(EmaiaddressErr).map((keys,index)=>{
				return <div 
				style={{color:"red"}}
				key={index}
				>{EmaiaddressErr[keys]}</div>
			})}
      <button>Update user</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditUserForm
