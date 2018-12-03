var imagens = [
    'img/memo/1.png',
    'img/memo/1.png',
    'img/memo/2.png',
    'img/memo/2.png',
    'img/memo/3.png',
    'img/memo/3.png',
    'img/memo/4.png',
    'img/memo/4.png',
    'img/memo/5.png',
    'img/memo/5.png',
    'img/memo/6.png',
    'img/memo/6.png',
    'img/memo/7.png',
    'img/memo/7.png',
    'img/memo/8.png',
    'img/memo/8.png',
    'img/memo/9.png',
    'img/memo/9.png',
    'img/memo/10.png',
    'img/memo/10.png',
    'img/memo/11.png',
    'img/memo/11.png',
    'img/memo/12.png',
    'img/memo/12.png'
];

var selectedcard = '';
var esperando = false;
var paresacertados = 0;

function getimagem() {
    var random = Math.floor(Math.random() * imagens.length);
    return imagens.splice(random, 1)[0];
}

function criarjogo() {
    var jogomemoria = document.getElementById('jogomemoria');
    var i;
    var j = 0;
    for (i = 0; i < 24; i++) {
        var cartadiv = document.createElement('div');
        cartadiv.className = 'carta-div';
        cartadiv.id = i + 'cartadiv';

        if (j == 6 || j == 12 || j == 18) {
            cartadiv.style.clear = 'left';
        }

        var carta = document.createElement('div');
        carta.className = 'carta';

        var cartaverso = document.createElement('div');
        cartaverso.className = 'carta-verso';

        var cartafrente = document.createElement('div');
        cartafrente.className = 'carta-frente';

        var verso = document.createElement('img');
        verso.src = 'img/memo/back.png';

        var frente = document.createElement('img');
        frente.id = cartadiv.id + 'img';
        frente.src = getimagem();

        cartadiv.style.cursor = 'pointer';
        cartadiv.onclick = function() { cartaclick(this.id); };

        cartaverso.appendChild(verso);
        cartafrente.appendChild(frente);

        carta.appendChild(cartaverso);
        carta.appendChild(cartafrente);

        cartadiv.appendChild(carta);

        jogomemoria.appendChild(cartadiv);

        j++;
    }
}

function cartaclick(cartadivid) {
    if (selectedcard !== cartadivid && !esperando) {
        document.getElementById(cartadivid).getElementsByClassName('carta')[0].style.transform = 'rotateY(180deg)';
        if (selectedcard === '') {
            selectedcard = cartadivid;
        } else if (document.getElementById(selectedcard + 'img').src === document.getElementById(cartadivid + 'img').src) {
            esperando = true;
            setTimeout(function esperar() {
                document.getElementById(cartadivid).style.visibility = 'hidden';
                document.getElementById(selectedcard).style.visibility = 'hidden';
                selectedcard = '';
                paresacertados++;
                if (paresacertados === 12) {
                    document.getElementById('jogomemoria').innerHTML = '<a href="memoria.html"><img src="img/memo/fim.png" /></a>';
                }
                esperando = false;
            }, 0800);
        } else {
            esperando = true;
            setTimeout(function esperar() {
                document.getElementById(cartadivid).getElementsByClassName('carta')[0].style.transform = 'rotateY(0deg)';
                document.getElementById(selectedcard).getElementsByClassName('carta')[0].style.transform = 'rotateY(0deg)';
            }, 1500);

            setTimeout(function esperar2() {
                selectedcard = '';
                esperando = false;
            }, 1600);
        }
    }
}

function evaclick(evaid) {
    var eva = document.getElementById(evaid);

    if (eva.getElementsByTagName('img')[0].style.transform != 'translate(0px, 580px)') {
        eva.getElementsByTagName('img')[0].style.transform = 'translate(0px, 580px)';
        eva.getElementsByTagName('img')[1].style.transform = 'translate(0px, -580px)';
    } else {
        eva.getElementsByTagName('img')[0].style.transform = 'translate(0px, 0px)';
        eva.getElementsByTagName('img')[1].style.transform = 'translate(0px, 0px)';
    }
}