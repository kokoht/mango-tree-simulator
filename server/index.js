const cron = require('node-cron')
const firebase = require('firebase')

var config = {
  databaseURL: "https://kanban-firebase.firebaseio.com",
  projectId: "kanban-firebase"
}

firebase.initializeApp(config)
var db = firebase.database()
var manggoAge = 0
var manggoHeight = 0
var manggoFruits = 0
var manggoHarvested = 0

function grow () {
  db.ref('manggo').set({
    age: manggoAge + 1,
    height: manggoHeight + Math.floor((Math.random() * 10)),
    fruits: manggoFruits + Math.floor(Math.random() * 10)/100,
    manggoHarvested: manggoHarvested
  })
}

function harvest () {
  db.ref('manggo').child('manggoHarvested').set(manggoFruits)
  db.ref('manggo').child('fruits').set(0)
}

db.ref('manggo').on('value', function (snapshot) {
  console.log(snapshot.val());
  manggoAge = snapshot.val().age
  manggoHeight = snapshot.val().height
  manggoFruits = snapshot.val().fruits
  manggoHarvested = manggoHarvested + snapshot.val().manggoHarvested
})

cron.schedule('0 */6 * * *', function () {
  console.log(`grow 6 jam sekali!`);
  grow()
})

cron.schedule('0 */18 * * *', function () {
  console.log(`harvest tiap 18 jam sekali!`);
  harvest()
})

// cron.schedule('*/5 * * * * *', function () {
//   console.log(`jalan 5 detik sekali!`);
//   grow()
// })
//
// cron.schedule('*/30 * * * * *', function () {
//   console.log(`jalan tiap 30 detik sekali!`);
//   harvest()
// })
