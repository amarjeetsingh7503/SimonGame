let gameSeq = [];
let userSeq = [];
let btns = ['btnOne', 'btnTwo', 'btnThree', 'btnFour'];
let level = 0;
let started = false;
let h2 = document.querySelector('h2');
let startBtn = document.querySelector('.startBtn');

startBtn.addEventListener('click', function() {
    startBtn.style.display = 'none';
    if (started == false) {
        started = true;
        levelUp();
        gameButtonPress();
    }
});

function btnFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function() {
        btn.classList.remove('flash');
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randBtnId = btns[randIdx];
    let randBtn = document.querySelector(`#${randBtnId}`);
    gameSeq.push(randBtnId);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 400);
        }
    } else {
        h2.innerHTML = `Game Over! Score: ${level}<br>Press 'Restart' button to restart`;
        startBtn.innerText = 'Restart';
        startBtn.style.display = 'inline';
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = '#FFEC9E';
        }, 500);
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    
    let userBtn = btn.getAttribute('id');
    userSeq.push(userBtn);
    checkAns(userSeq.length - 1);
}

function gameButtonPress() {
    let allBtns = document.querySelectorAll('.btn')
    for (const btn of allBtns) {
        btn.addEventListener('click', btnPress);
    }
}

function resetGame() {
    started = false;
    gameSeq = [];
    level = 0;
}
