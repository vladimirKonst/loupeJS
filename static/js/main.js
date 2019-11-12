class screenZoomer {
    constructor (btn) {
        this.btn = btn;
        this.loupeInit();
    }

    loupeInit() {
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

new screenZoomer('.controls__btn');