class screenZoomer {
    constructor (btn, defaultStyled = false) {
        this.btn = btn;
        this.defaultStyled = defaultStyled;
        this.loupeInit();
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
        // если true то добавляю дефолтные стили для лупы, если не тру то пользователь сам стилизует через CSS
        if(this.defaultStyled) {
            document.querySelector('.loup-box').setAttribute('style', `
                width:600px;
                height:600px;
                position:fixed;
                z-index:1000;
                pointer-events:none;
            `);
            document.querySelector('.loup-box__view').setAttribute('style', `
                width:350px;
                height:350px;
                border-radius:50%;
                position:absolute;
                left:250px;
                box-sizing:border-box;
                border:15px solid black;
                background: #10f8de3d;
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

        this.switchLoupe();
        
    }

    switchLoupe() {
        document.querySelector(this.btn).addEventListener('click', () => {
            let state = document.querySelector(this.btn).innerHTML === '"TheLoup" ON' ? '"TheLoup" OFF' :'"TheLoup" ON';

            if(state === '"TheLoup" ON') {
                // this.showLoupe();
                console.log('showLoupe')
            } else {
                // this.hideLoupe();
                console.log('hideLoupe')
            }
            document.querySelector(this.btn).innerHTML = state;
        })
    }
}

new screenZoomer('.controls__btn', true);