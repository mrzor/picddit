var counter = localStorage.getItem("loadcounter") || 0;
counter = parseInt(counter) + 1;
console.log("picddit | %s | load #%i", (new Date).toTimeString(), counter);
localStorage.setItem("loadcounter", counter);