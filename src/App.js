import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './header/Header';
import Post from './post/Post';
import { auth, db } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

  const [posts, setPost] = useState([]);
  const [open, setOpen] = useState(false); //for modal - (modal is a pop-up window used for sing-in)
  
  const classes = useStyles(); //calling the styles for modal
  const [modalStyle] = React.useState(getModalStyle);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);

  //for sign in
  const [openSignIn, setOpenSingIn] = useState(false);

  useEffect(() => {
    //Listen for any single time an authentication change happens this executes
    const unsubscribe = auth.onAuthStateChanged((authUser)=> {
      if(authUser){
        //User has successfully logged in
        setUser(authUser);
      }
      else{
        // User has logged out
        setUser(null);
      }
    });
    return () => {
      //perform clean up action
      unsubscribe();
    };
  },[user, username]);


  // useEffect - runs a piece of code based on specific conditions
  useEffect(() => {
  //This is where the code runs
    db.collection('posts').onSnapshot(snapshot => {
      //Everytime a new post is added (or a change in related Database occurs), this code executes
      setPost(snapshot.docs.map(doc => ({
        id : doc.id,       //Document ID (middle col in firebase)
        post : doc.data()  // Document data (Last col data)
      })));
    })
  }, []); 

  
// THIS IS THE SIGN UP SETUP AND AUTHENTICATION !!! WTF !!!! 
  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  }

  //Sign in function
  const signIn = (event) =>{
    event.preventDefault();
    
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));
  
    setOpenSingIn(false);
  }

  return (
    <div className="app">
      
      {/* Modal copied from materials-ui */}
      <Modal
      open={open}
      onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </center>
          <form className="app__signup">
            <Input 
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      {/* This modal is for sign in */}
      <Modal
      open={openSignIn}
      onClose={() => setOpenSingIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </center>
          <form className="app__signup">
            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <Header />
      
      
      { user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ):(
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSingIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}

      

      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
      
    </div>
  );
}

export default App;
