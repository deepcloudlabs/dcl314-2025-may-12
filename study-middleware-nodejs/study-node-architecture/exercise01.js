function fun(){
    console.log("Hello Mars");
    gun();
}

function gun(){
    console.log("Hello Jupiter");
    sun();
}

function sun(){
    console.log("Hello Saturn");
}

fun();
// Call Stack: fun -> gun -> sun