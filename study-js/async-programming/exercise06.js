async function zun(n) {
    let sequence = [n];
    while (n > 1) {
        if (n % 2 === 0) {
           n = n / 2;
        } else {
           n = 3 * n + 1;
        }
        sequence.push(n);
    }
    return sequence;
}

function app1(){
    zun(17).then( result1 => {
        zun(21).then( result2 => {
           zun(47).then( result3 => {
               console.log(result1);
               console.log(result2);
               console.log(result3);
           })
        })
    })
}

async function app2() {
    let result1 = await zun(17);
    let result2 = await zun(21);
    let result3 = await zun(47);
}

async function app3() {
    return Promise.all([
        zun(17),
        zun(21),
        zun(47)
    ]);
}

app3().then( results => {
    for (let result of results) {
        console.log(result);
    }
})
