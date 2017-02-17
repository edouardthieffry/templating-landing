(function () {
    //firebase config-------------------------------------------------------------------------------------------------------
    let config = {
        apiKey: "AIzaSyBPDGAaUMql43KclToTWddkvZnYSuhblAg",
        authDomain: "templating-f0351.firebaseapp.com",
        databaseURL: "https://templating-f0351.firebaseio.com",
        storageBucket: "templating-f0351.appspot.com",
        messagingSenderId: "239269448680"
    };
    firebase.initializeApp(config);

    let database = firebase.database().ref('templates');
    let templateList = database.child('templateList');
    let context=[];
    templateList.on('value', snap =>{
        let contexte = snap.val();
        context.push(contexte);
    });
    console.log(context);

    var i;
    var j;

    function loadTemplate() {
        $.get('views/header.mst', function(template) {
            var rendered = Mustache.render(template);
            $('#header').html(rendered);
        });

        for(i=0;i<=context.length-1;i++){
            console.log(i);
            $('#main').append('<div id="'+context[i].type+i+'"></div>');
        }

    }
    loadTemplate();

})(jQuery);