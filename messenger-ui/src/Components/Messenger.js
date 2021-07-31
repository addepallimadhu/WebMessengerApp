import React, {Component} from 'react';
import ReactDOM from 'react';
import '../App.css';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../Utils/RefreshToken';

const clientId =
  '1006529598178-qes2svv7q1t0a6pfgq01gq1te9fosee6.apps.googleusercontent.com';

const apiUrl = () => { if (process.env.REACT_APP_API_URL === undefined) 
				return window.location.protocol + "//" + window.location.host + "/api";
			else 
				return process.env.REACT_APP_API_URL;	
		       }

// var otherUser;

class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = { otherUser : '', text: '', userName : '', users: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
// 

  render() {
 //   console.log(apiUrl()); 
  //  console.log(process.env.REACT_APP_API_URL);	
    const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
   console.log(res.profileObj.email);
   refreshTokenSetup(res);
   
   this.setState( { userName : res.profileObj.email
		});

 fetch(`${apiUrl()}/user/`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
      body : JSON.stringify({
       username:  res.profileObj.email,
       userdisplayname: res.profileObj.name,

    })
    }
    )

  fetch(`${apiUrl()}/user/otherUsers/${this.state.userName}`,
   {
     method: 'GET',
     headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.authToken
          }
   }
   )
       	 .then(resp => (resp.json()))
                   .then (resp_json => (this.setState({
			users : resp_json ,
			otherUser : resp_json[0].username	})
		));
 //this.setState ({ otherUser: this.state.users[0]
//		});

   
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 `
    );
  };

 const onLogoutSuccess = () => { 
    this.setState( { otherUser : '', text: '', userName : '', users: []
		});	
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };


 const handleChange = (event) => {
  this.setState({ otherUser : event.target.value
		})
 //otherUser =  event.target.value;
 // alert(event.target.value);
   }

const userOption = (obj) => 
        {
         //         console.log(obj);
	return  <option>{obj.username}</option>;
          }
 //  console.log('INSIDE MESSENGER RENDER');
  // console.log(this.state)

    return (
      <div>
        <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      /><b>Logged in as : {this.state.userName}</b><br/>
      <select id="users" name="users" onChange={handleChange}> 
          {this.state.users.map(userOption)} 
      </select> 
        <TodoList  userName={this.state.userName} otherUser={this.state.otherUser}/> 
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            Enter your message here...
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Send
          </button>
	
        </form>
	<GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onLogoutSuccess}
      ></GoogleLogout>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };

    console.log(newItem.text);

    fetch(`${apiUrl()}/message/`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.authToken
    },
      body : JSON.stringify({
        sender:  this.state.userName,
        receiver: this.state.otherUser,
        message: newItem.text
    })
    }
    )
    .then (() => {console.log("MESSAGE SENT")})
 /*   this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));*/
  }
}

class TodoList extends React.Component {

    constructor(props) {
      super(props);
      this.state = { messages: [] };
   //   this.state = { seconds: 0 };
    }
  
    tick() {
      var newMessages = [];

// console.log(this.props.userName);

      fetch(`${apiUrl()}/message/?sender=${this.props.userName}&receiver=${this.props.otherUser}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.authToken
          }
      
      }
      )
      .then(resp => resp.json())
      .then(messages => {
        this.setState({
         messages: messages
        })
      })


     
    }
  
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
      console.log("Inside did Mount");
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
  
 
  render() {
    
    return (
  /*    <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      */
     <div className = "Messages-box">
         {this.state.messages.map(item => (
       
       <div className = "Message-element">  {item.message}</div>
        ))}
     
     </div>

    );
  }
}


export default Messenger;


//