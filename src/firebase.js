import app from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

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

        //Referenciando a database para acessar em outros locais.
        this.app = app.database()
        this.storage = app.storage()
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout() {
        return app.auth().signOut()
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

    getCurrentUid() {
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    async getUserName(callback) {
        if (!app.auth().currentUser) {
            return null
        }

        const uid = app.auth().currentUser.uid
        await app.database().ref('usuarios').child(uid)
        .once('value')
        .then(callback)
    }

}


export default new Firebase()