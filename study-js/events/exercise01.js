setInterval(()=>{
    console.log(`event is handled.`);

} , 1000);
// Event Queue -> Event: System, User -> Single Execution Thread
//                registered callback -> async
//                Event Loop
