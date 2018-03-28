import { initializeApp } from 'firebase'
import * as GeoFire from 'geofire'
import VueFire from 'vuefire'

const app = initializeApp({
  apiKey: 'AIzaSyAhAwfqUa7HW3E1scdMW9hIbT0yGD7AvTE',
  authDomain: 'test-geofire-d6849.firebaseapp.com',
  databaseURL: 'https://test-geofire-d6849.firebaseio.com',
  projectId: 'test-geofire-d6849',
  storageBucket: 'test-geofire-d6849.appspot.com',
  messagingSenderId: '175334014800'
})

export const db = app.database()
export const treeRef = db.ref('treephoto')
export const locationRef = db.ref('locations')
export const geoFire = new GeoFire(locationRef)
// export const AUTH = db.auth()

export default ({ app, router, Vue }) => {
  // Vue.prototype.$auth = AUTH
  Vue.use(VueFire)
}
