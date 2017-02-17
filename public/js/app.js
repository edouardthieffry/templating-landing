$(function () {
    //firebase config-------------------------------------------------------------------------------------------------------
    var config = {
        apiKey: "AIzaSyBPDGAaUMql43KclToTWddkvZnYSuhblAg",
        authDomain: "templating-f0351.firebaseapp.com",
        databaseURL: "https://templating-f0351.firebaseio.com",
        storageBucket: "templating-f0351.appspot.com",
        messagingSenderId: "239269448680"
    };
    firebase.initializeApp(config);

    let database = firebase.database().ref('templates');
    let templateList = database.child('templateList');

    console.log(templateList);
});