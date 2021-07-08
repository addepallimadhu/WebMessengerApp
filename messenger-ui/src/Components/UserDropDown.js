import React, {Component} from 'react';
import ReactDOM from 'react';
import {userName} from './Login';

var otherUser;

function UserDropDown() {

var users = [];


 fetch(`http://localhost:8080/api/message/otherUsers/${userName}`)
       	 .then(resp => (resp.json()))
                   .then (resp_json => (users = resp_json));
          //        .then(() => console.log(users));
     

console.log(users);

users.map(function(obj) 
	{
	   console.log(obj);
		
	});

 const handleChange = (event) => {
   var otherUser =  event.target.value;
  alert(otherUser);
   }


const userOption = (obj) => 
        {
                  console.log(obj);
	return  <option>{obj}</option>;
          }
    
return (
      <div>
   <select onChange={handleChange}>
	<option>A</option>
	<option>B</option>
	</select>
      
  
      </div>
    );


}




//       <select id="users" name="users" onChange={handleChange}> 
//      {users.map(userOption)} 
 //        </select> 

//     {users.map(function(obj) 
//	{
//	    return <p>{obj}</p>;
		
//	}) }

export {otherUser};
export default UserDropDown;