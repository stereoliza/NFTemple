function saveLink() {
    let links = document.getElementsByClassName("link");
    let i =   links.length - 1;

    while (i >= 0){
        let checkbox = links.item(i).getElementsByTagName("input").item(0).checked;
        if (checkbox == true){
            let link = links.item(i).getElementsByTagName("input").item(1).value;
            let k = links.item(i).getElementsByTagName("input").item(0).name;
            sessionStorage.setItem(k, link);

        }
        i = i - 1;

    }
    window.open('room.html', '_blank');
}
let count = 1;
function addItem() {

    let check = document.createElement("input");
    check.type = "checkbox";
    check.name = "item"+count;
    check.value = "0";

    var textnode = document.createTextNode("IPFS Item:");

    let input = document.createElement("input");
    input.type = "text";
    input.value = "val";

    let form = document.createElement("form");
    form.onclick = "saveLink()";
    form.className = "link";

    form.appendChild(check);
    form.appendChild(textnode);
    form.appendChild(input);

    document.getElementById("list").appendChild(form);

    count += 1;
}