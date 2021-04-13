import React,{ useRef, useState }  from 'react'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId} from "../config"


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({

    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId

 
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function ChatApp() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
          <div className="row">
         <div className="col-9">
         <h1>⚛️🔥💬</h1>
         </div>
         <div className="col-3"> 
         <SignOut/>
         </div>
          </div>
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </div>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="btn btn-danger my-3" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<div>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>
      <div className="row">
          <div className="col-9">
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice"  className="form-control"/>
          </div>
          <div className="col-3 d-grid">
          <button type="submit" className="btn btn-primary"disabled={!formValue}>Send</button>
          </div>
      </div>


    </form>
  </div>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<div>
    <div>
      <div className={`row my-2 message ${messageClass}`} style={{}}>
         <div className="col-1">
         <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} width="50px"  height="50px" style={{borderRadius: "50%"}}/>
         </div>

         <div className="col-11">
         <p>{text}</p>
         </div>
      </div>
    </div>
  </div>)
}


export default ChatApp;
