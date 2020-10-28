import React, { useState, Fragment, useEffect } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import { getusers,signup,deleteuser,updateuser } from './helper/apicalls'
import UserTable from './tables/UserTable'
const App = () => {

	const initialFormState = { id: null, lastname:'',username: 'floppydiskette' ,emaiaddress:''}

	// Setting state
	const [ users, setUsers ] = useState([])
	//const [ err, setErrors ] = useState({firstname: "", lastname: "", username: "", emaiaddress: ""})
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)
	const [ reload, setReload ] = useState(false)
	

	const loadAllUsers = ()=>{
        getusers()
        .then(data => {
            if(data.status === 0){
                console.log("Error Ocuured")
            }else {
				console.log(data.data)
				setUsers(data.data)
            }
        })
        .catch(err => console.log(err))
	}
	

    useEffect(() => { loadAllUsers() }, [reload])

	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
		console.log(user,"Add User Function")
		signup(user)
		setReload(!reload)
	}

	const deleteUser = id => {
		setEditing(false)
		deleteuser({"userid":id})
		setReload(!reload)
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)
		console.log(updatedUser)
		updateuser(updatedUser)
		setReload(!reload)
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, firstname: user.firstname, lastname: user.lastname, username:user.username, emaiaddress:user.emaiaddress })
	}

	return (
		<div className="container">
			<h1>CRUD App Using React And Node</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
								users={users}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm 
							addUser={addUser}
							users={users}
							/>
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default App
