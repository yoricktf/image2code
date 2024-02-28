import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: 'AIzaSyAbKlo2XmeAXNg13xt91YxlZjti0Y7i62Q',
	authDomain: 'ticketevent-cms.firebaseapp.com',
	databaseURL: 'https://ticketevent-cms-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'ticketevent-cms',
	storageBucket: 'ticketevent-cms.appspot.com',
	messagingSenderId: '280062038362',
	appId: '1:280062038362:web:a181a8f39753b120416363',
	measurementId: 'G-51TEEZTG4W',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export default app
