const tasks = document.getElementsByName('task')
const NV = document.getElementById('nValue')
const EV = document.getElementById('eValue')
const DV = document.getElementById('dValue')
const Status = document.getElementById('Status')
const input = document.getElementById('input')
const output = document.getElementById('output')
const process = document.getElementById('process')


function isPrime(nbr) {
    x = Math.sqrt(nbr)
    x = Math.floor(x)
    if (nbr % 2 === 0 && nbr != 2) {
        return false
    }
    for (i = 3; i <= x; i += 2) {
        if (nbr % i === 0) {
            return false
        }
    }
    return true;
}


function extendedEuclide(a, b) {
    let x = 1, xx = 0, y = 0, yy = 1, q = 0, tmp = 0;
    while (b != 0) {
        q = Math.floor(a / b)
        tmp = a
        a = b
        b = (b + tmp) % b
        tmp = xx
        xx = x - q * xx
        x = tmp
        tmp = yy
        yy = y - q * yy
        y = tmp
    }
    return [a, x, y]
}

function modularInverse(a, n) {
    res = extendedEuclide(a, n)
    if (res[0] != 1) {
        return 0
    } else {
        return (n + res[1]) % n
    }
}

function fastPower(x, k, n) {
    pow = 1
    while (k > 0) {
        if (k % 2 != 0) {
            pow = (pow * x) % n
        }
        x = x * x % n
        k = Math.floor(k / 2)
    }
    return pow
}

function rsa(msg, key, n, action) {
    let nbr, cnbr;
    let new_msg = ''
    // Cipher
    for (var i = 0; i < msg.length; i++) {
        nbr = (msg.charCodeAt(i))
        cnbr = (fastPower(nbr, key, n)) 
        new_msg += String.fromCharCode(cnbr)
    }
    return new_msg;
}

tasks[0].addEventListener('click', () => {
    if (tasks[0].checked == true) {
        DV.disabled = true
        EV.disabled = false
    }
})
tasks[1].addEventListener('click', () => {
    if (tasks[1].checked == true) {
        DV.disabled = false
        EV.disabled = true
    }
})

process.addEventListener('click', () => {
    const message = String(input.value)
    const N = parseInt(NV.value)
    let key = 0, action = 1;

    if (tasks[0].checked == true) {
        key = parseInt(EV.value)
        action = 1
    } else {
        key = parseInt(DV.value)
        action = -1
    }

    output.innerText = rsa(message, key, N, action)
})