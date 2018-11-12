var pos = 'resources/scene1/';
var image_id = 1;
var image = document.getElementById('pnl');
var b = [document.getElementById('b0'), 
         document.getElementById('b1'), 
         document.getElementById('b2')];

function onClick(id){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            onGotDir(id, this.responseText.split('\n'));
        }
    };
    xhttp.open("GET", pos + 'master.txt', true);
    xhttp.send();
}

function onGotDir(id, files) {
    var max_id = 0;
    var candidate;
    for (var i = 1; i < files.length; i++) {
        if (files[i].includes('.jpg')) {
            candidate = Number(files[i].substring(0, files[i].length - 4));
            max_id = Math.max(candidate, max_id);
        }
    }
    // Got the max image id
    var hold = false;
    if (image_id === max_id) {
        // Next folder
        if (files.includes('logic.txt')) {
            // Choice available
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    lines = this.responseText.split('\n');
                    enter(lines[lines.indexOf(b[id].innerHTML) - 1]);
                    updateButton(pos.substring(pos.length-3,pos.length-1) == '4-' ? true:false);
                    updateImage();
                }
            };
            xhttp.open("GET", pos + "logic.txt", true);
            xhttp.send();
            hold = true;
        }
        image_id = 1;
    } else {
        image_id ++;
    }
    if (! hold) {
        updateImage();
        updateButton(image_id === max_id);
    }
    console.log(`${pos} ${image_id}`);
}

function updateImage() {
    image.src = `${pos}${image_id}.jpg`
}
function updateButton(is_max) {
    if (is_max) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText.includes('logic.txt')) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            var lines = this.responseText.split('\n');
                            var n_choices = lines.length / 2;
                            for (let i = 0; i < 3; i++) {
                                if (i < n_choices) {
                                    b[i].innerHTML = lines[i*2 + 1];
                                    b[i].style.display = "Block";
                                } else {
                                    b[i].style.display = "None";
                                }
                            }
                        }
                    };
                    xhttp.open("GET", pos + "logic.txt", true);
                    xhttp.send();
                } else {
                    var lines = this.responseText.split('\n');
                    var ending = true;
                    for (let i=0; i < lines.length; i++) {
                        if (!(lines[i].includes('.jpg') || lines[i].includes('master') || lines[i].includes('DS_Store'))) {
                            if (! lines[i].includes())
                            ending = false;
                            break;
                        }
                    }
                    if (ending) {
                        b[0].style.display = "None";
                        b[1].style.display = "None";
                        b[2].style.display = "None";
                    }
                }
            }
        };
        xhttp.open("GET", pos + "master.txt", true);
        xhttp.send();
        return;
    }
    b[1].style.display = "None";
    b[2].style.display = "None";
    b[0].style.display = "Block";
    b[0].innerHTML = '>';
}

function enter(child) {
    if (child === '..') {
        pos = pos.split('/').slice(0, -2).join('/') + '/';
    } else {
        pos += child + '/';
    }
}
