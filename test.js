var spawn = require("child_process").spawn, child;

child = spawn("powershell.exe");

var get = false;
child.stdout.on("data", function (data) {
    get = true;
    console.log("Powershell Data: " + data);
});

child.stderr.on("data", function (data) {
    console.log("Powershell Errors: " + data);
});

child.on("exit", function () {
    console.log("Powershell Script finished");
});

setInterval(() => {
    if (get) {
        get = false;
        child.stdin.write("Get-Date\n");
    }
}, 1000);
