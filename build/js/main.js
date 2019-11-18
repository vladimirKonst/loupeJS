class screenZoomer {
    constructor (btn, defaultStyled = false) {
        this.btn = btn;
        this.defaultStyled = defaultStyled;
        this.switchLoupe();
    }

    loupeInit() {
        //создаем фрагмент для вставки
        let fragment = new DocumentFragment();
        let loupBox = document.createElement('div');
        let loupHand = document.createElement('div');
        let loupViewPort = document.createElement('div');

        loupBox.className = 'loup-box';
        loupHand.className = 'loup-box__hand';
        loupViewPort.className = 'loup-box__view';
        // добавляем элементы в фрагмент и после препендим его  в бади
        loupBox.append(loupHand, loupViewPort);
        fragment.append(loupBox);
        document.querySelector('body').prepend(fragment);
        // подключил библиотеку делающую скрин документа в canvas 
        // npm install html2canvas
        // перед включением лупы делаю скрин странички и добавляю ее в область лупы
        html2canvas(document.body).then(function(canvas) {
            document.querySelector('.loup-box__view').appendChild(canvas);
        });
        document.addEventListener('mousemove', this.LoupeMoving);
        this.addDefaultStyles();
    }

    switchLoupe() {
        document.querySelector(this.btn).addEventListener('click', () => {
            // задаем стэйт лупы вкл или выкл
            let state = document.querySelector(this.btn).innerHTML === '"TheLoup" ON' ? '"TheLoup" OFF' :'"TheLoup" ON';
            // иниициируем лупу если она еще не проинициализирована
            if(!document.querySelector('.loup-box')) {
                this.loupeInit();
            }
            // в зависимости от стейта кнопки скрываем или показываем лупу
            if(state === '"TheLoup" ON') {
                document.querySelector('.loup-box').style.cssText += 'display:block';
                document.querySelector('section').style.cursor = 'none';
            } else {
                document.querySelector('.loup-box').style.cssText += 'display:none';
                document.querySelector('section').style.cursor = 'auto';
            }
            // меняем стейт кнопки
            document.querySelector(this.btn).innerHTML = state;
        })
    }

    LoupeMoving(e) {
        // меняю положение лупы при изменении положения мыши
        document.querySelector('.loup-box').style.cssText += `left:${e.clientX - 425}px; top:${e.clientY - 175}px`;
        // прокручиваю canvas
        document.querySelector('canvas').setAttribute('style',`
            position:relative;
            z-index:-10;
            transform:translateX(${(-e.clientX + 175 - 15) * 1.3 + 115}px) translateY(${(-e.clientY + 175 - 15) * 1.3 + 100}px) scale(1.3);
        `);
    }

    addDefaultStyles() {
        // если this.defaultStyled true то добавляю дефолтные стили для лупы, если не тру то пользователь сам стилизует через CSS
        if(this.defaultStyled) {
            document.querySelector('.loup-box').setAttribute('style', `
                width:600px;
                height:600px;
                position:fixed;
                z-index:1000;
                pointer-events:none;
                display:none;
            `);
            document.querySelector('.loup-box__view').setAttribute('style', `
                width:350px;
                height:350px;
                border-radius:50%;
                position:absolute;
                left:250px;
                box-sizing:border-box;
                border:15px solid black;
                overflow:hidden;
                background: #00ffef1a;
            `);
            document.querySelector('.loup-box__hand').setAttribute('style', `
                width:350px;
                height:30px;
                border-radius:10px;
                position:absolute;
                left:250px;
                box-sizing:border-box;
                background:black;
                transform: rotate(-45deg);
                left: 10px;
                top: 400px;
            `);
        }
    }
}

new screenZoomer('.controls__btn', true);