import React from 'react'


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId} from "./../config"


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


function Signout() {
    return auth.currentUser && (
        <button className="btn btn-primary" onClick={() => auth.signOut()}>Sign Out</button>
      )
}

export default Signout
