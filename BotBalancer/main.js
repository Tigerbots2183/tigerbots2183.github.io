
//start//////////////////Thanks to mkwpaul on github for the following code!/////////////////////////
function convert() {
    let mac = document.getElementById("mac").value;
    let log = document.getElementById("log");
    let converted = mac.trim().split(':').map(x => String.fromCharCode(parseInt(x, 16))).reverse().join('');
    console.log(converted);
    document.getElementById("result").innerHTML = escape_unprintable(converted);
    return converted;
}

function copyToClipboard() {
    const el = document.createElement("textarea");
    let value = convert();
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Copied \"" + value + "\" to clipboard!");
}

function escape_unprintable(str) {
    return str.replace(/[\u0000-\u001F\u007F-\u009F]/g, function (c) {
        return "\\u" + ("000" + c.charCodeAt(0).toString(16)).slice(-4);
    });
}
//end//////////////////////////////////////////////////////////////////////////////////////////////////

async function startConnection() {
    const device = await navigator.hid.requestDevice({ filters: [] });
    
}