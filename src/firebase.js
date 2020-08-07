import app from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyDqonoBKE0k-ESrzlr1a1L_JnivVMbDNOM",
    authDomain: "reactapp-9c551.firebaseapp.com",
    databaseURL: "https://reactapp-9c551.firebaseio.com",
    projectId: "reactapp-9c551",
    storageBucket: "reactapp-9c551.appspot.com",
    messagingSenderId: "953361247296",
    appId: "1:953361247296:web:20e354e7505e9bbb7bc3a5",
    measurementId: "G-248PSJL6Z2"
  };
  

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.app = app.database()
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    async register(nome, email, password) {
       await app.auth().createUserWithEmailAndPassword(email, password)

       const uid = app.auth().currentUser.uid

       return app.database.ref('usuarios').child(uid).set({
           nome: nome
       })
    }

    isInitialized() {
        return new Promise((resolve, reject) => {
            app.auth().onAuthStateChanged(resolve)
        })
    }

    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email
    }

}


export default new Firebase()