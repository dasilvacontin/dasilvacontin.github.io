
var avatar = document.getElementById("avatar");
avatar.onclick = function () {
    window.open("https://www.youtube.com/watch?v=SEOscGdcXZU", "_blank");
};

var projectContainer = document.getElementById("projects");
var stuffContainer = document.getElementById("stuff");

var projectTmpl = document.getElementById("project-tmpl").innerHTML;
Mustache.parse(projectTmpl);

function loadProjectInto(obj, container) {

	var node = document.createElement("div");
	node.className = "project";
	node.innerHTML = Mustache.render(projectTmpl, obj);
	container.appendChild(node);

}

//So that I can order the projects moving a single line:

var projectList = [
    "Kipos",
    "LudumPad",
    "ld48-29",
    "rule#34",
    "pzero",
    "enitor",
    "cellvorsum"
];

var stuffList = [
    "subclass-error",
    "CanvasDye",
    "Eximo.js"
];

function reqListener () {

    var database = JSON.parse(this.responseText);

    projectList.forEach(function (projectName) {
        loadProjectInto(database[projectName], projectContainer);
    });

    stuffList.forEach(function (smthName) {
        loadProjectInto(database[smthName], stuffContainer);
    });

}

var dbReq = new XMLHttpRequest();
dbReq.onload = reqListener;
dbReq.open("get", "/js/projects.json", true);
dbReq.send();

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// http://www.sitepoint.com/javascript-generate-lighter-darker-color/
function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
}

var signature = document.getElementById("signature");
var wololo = new Audio("snd/wololo.mp3");
signature.onclick = function () {
    
    wololo.play();
    wololo = new Audio("snd/wololo.mp3");
    
    //random chance of rick roll ftw
    if (Math.random() < 0.05) {
        console.log("goes");
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        return;
    }
    
    var color = getRandomColor();
    document.body.style.background = color;
    jss.set("h1, h2, h3, p", {
        "color": "white"
    });
    jss.set("a", {
        "color": ColorLuminance(color, 0.5),
        "text-decoration": "none"
    });
    jss.set("a:hover, .links .a:hover", {
        "color": ColorLuminance(color, 0.7),
        "text-decoration": "none"
    });
    
}
