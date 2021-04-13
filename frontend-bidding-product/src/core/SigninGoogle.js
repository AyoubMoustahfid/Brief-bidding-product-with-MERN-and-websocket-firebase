import React from 'react'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId} from "./../config"


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


function SigninGoogle() {

    const [user] = useAuthState(auth);
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
      }
    
      return (
        <div>
          <button className="btn btn-primary" onClick={signInWithGoogle}>Sign in with Google</button>
          <p>Do not violate the community guidelines or you will be banned for life!</p>
        </div>
      )
    
}

export default SigninGoogle
