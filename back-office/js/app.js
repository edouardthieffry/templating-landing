(function () {

    const context = {
        items: [
            {
                type:'video',
                img:'video.jpeg',
                formInfo:{
                    title:'titleVideo',
                    type:'video',
                    url:'url'
                }
            },
            {
                type:'doubleArticle',
                img:'video.jpeg',
            },
            {
                type:'tripleArticle',
                img:'tripleArticle.jpeg',
            },
            {
                type:'newsletter',
                img:'newsletter.png'
            }
        ]
    };

    const source   = $("#templateType").html();
    const template = Handlebars.compile(source);
    const html    = template(context);

    $('#listeType').append(html);

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

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword =document.getElementById('txtPassword');
    const loginIn = document.getElementById('btnLogin');

    loginIn.addEventListener('click', e => {
        console.log('click event');
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,password);
        promise.catch(e => console.log(e.message));
    });
    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser){
            console.log('user cool');
            $('form').addClass('hide');

        }else{
            console.log('not user');
            $('#backoffice').removeClass('hide');
        }
    });

    const preObject = document.getElementById('object');


    //function
    const objectGenerator = function(target){
        let html;
        switch (target){
            case 'video':
                 html = '<form class="video"><input id="textTitleVideo" type="text" placeholder="Title Video" required><input id="url" type="url" placeholder="Url Video" required><div class="add-template-button" data-target="'+target+'">add template to landing</div></form>';
                $('#formContainer').html(html);
                break;
            case 'doubleArticle':
                 html = '<form class="doubleArticle"><input id="titleSection" type="text" placeholder="titre de la section" required>';
                for(let i=0 ; i<2 ; i=i+1){
                    console.log(i);
                    html +='<input id="textTitre'+i+'" type="texte" placeholder="titre article '+i+'" required>';
                    html +='<input id="textParagraphe'+i+'" type="texte" placeholder="titre paragraphe'+i+'" required>';
                }
                html+='<div class="add-template-button" data-target="'+target+'">add template to landing</div>';
                html+='</form>';
                $('#formContainer').html(html);
                break;
            case 'tripleArticle':
                 html = '<form class="tripleArticle"><input id="titleSection" type="text" placeholder="titre de la section" required>';
                for(let i=0 ; i<3 ; i=i+1){
                    html +='<input id="textTitre'+i+'" type="texte" placeholder="titre article '+i+'" required>';
                    html +='<input id="textParagraphe'+i+'" type="texte" placeholder="titre paragraphe'+i+'" required>';
                }
                html+='<div class="add-template-button" data-target="'+target+'">add template to landing</div>';
                html+='</form>';
                $('#formContainer').html(html);
                break;
        }
    };

    const createTemplateInDataBase = function (target) {
        let object ={};
        switch (target){
            case 'video':
                const titleVideo = document.getElementById('textTitleVideo');
                const urlVideo =document.getElementById('url');
                const titre = titleVideo.value;
                const videoUrl = urlVideo.value;
                console.log('click');
                object = {
                    type: 'video',
                    title:''+titre+'',
                    url:''+videoUrl+''
                };
                console.log(object);
               templateList.push(object);
                break;
            case 'doubleArticle':
                let texttitre1 = document.getElementById('textTitre0');
                let texttitre2 =document.getElementById('textTitre1');
                let textparagraphe1 =document.getElementById('textParagraphe0');
                let textparagraphe2 =document.getElementById('textParagraphe1');
                let a = texttitre1.value;
                let b = texttitre2.value;
                let d = textparagraphe1.value;
                let e = textparagraphe2.value;
                object={
                    type:'doubleArticle',
                    titleSection:'titre de la section',
                    articles: {
                        article1:{
                            titre:''+a+'',
                            paragraphe:''+d+''
                        },
                        article2:{
                            titre:''+b+'',
                            paragraphe: ''+e+''
                        }
                    }
                };
                console.log(object);
                templateList.push(object);
                break;
            case 'tripleArticle':
                let texttitre11 = document.getElementById('textTitre0');
                let texttitre22 =document.getElementById('textTitre1');
                let texttitre33 =document.getElementById('textTitre2');
                let textparagraphe11 =document.getElementById('textParagraphe0');
                let textparagraphe22 =document.getElementById('textParagraphe1');
                let textparagraphe33 =document.getElementById('textParagraphe2');
                let aa = texttitre11.value;
                let bb = texttitre22.value;
                let cc = texttitre33.value;
                let dd = textparagraphe11.value;
                let ee = textparagraphe22.value;
                let ff = textparagraphe33.value;
                object={
                    type:'tripleArticle',
                    titleSection:'titre de la section',
                    articles: {
                        article1:{
                            titre:''+aa+'',
                            paragraphe:''+dd+''
                        },
                        article2:{
                            titre:''+bb+'',
                            paragraphe: ''+ee+''
                        },
                        article3:{
                            titre:''+cc+'',
                            paragraphe: ''+ff+''
                        }
                    }
                };
                templateList.push(object);
                break;
            case 'newsletter':
                break;
        }

    };

    const body = $('body');

    body.on('click','#listeType>div',function () {
        let target=$(this).data('target');
        console.log(target);
        objectGenerator(target);
    })
    body.on('click','.add-template-button',function () {
        let target=$(this).data('target');
        createTemplateInDataBase(target);
    })



})();