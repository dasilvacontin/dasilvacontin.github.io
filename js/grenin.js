var avatar = document.getElementById("avatar");
        avatar.onclick = function () {
            window.open("https://www.youtube.com/watch?v=SEOscGdcXZU", "_blank");
        };

		var projectTemplate = document.getElementById("project-tmpl").innerHTML;
		Mustache.parse(projectTemplate);
		var projects = document.getElementById("projects");
		var stuff = document.getElementById("stuff");
        var signature = document.getElementById("signature");

		function loadProject(container, obj) {

			var node = document.createElement("div");
			node.className = "project";
			node.innerHTML = Mustache.render(projectTemplate, obj);
			container.appendChild(node);

		}
        
        var database = {
            "ld48-29": {
                name: "ld48-29",
                img: "img/ld48-29.jpg",
                desc: "Unfinished game jam entry for the 29th LudumDare. Made with pixi.js in less than 15h. Graphics generated via code.</p><p>It will become a turn based game where players play locally on a big screen and send a sequence of actions from their smartphone.</p><p>You can test some placeholder actions: 'WASD' for movement, 'QE' for rotation, 'O' for shooting, 'P' for shockwave.",
                website: {
                    url: "http://dasilvacont.in/ld48-29/",
                    cleanUrl: "dasilvacont.in/ld48-29"
                },
                players: "10+ players using ludumpad",
                github: {
                    url: "https://github.com/dasilvacontin/ld48-29",
                    cleanUrl: "github.com/dasilvacontin/ld48-29"
                }
            },
            "rule#34": {
                name: "rule#34",
                img: "img/rule34.jpg",
                desc: "Game created in 0 hours for the 0h game jam. My random topic was 'rule #34'. I was very tempted to re-roll.</p><p>It has become one of my favorite own games. I absolutely love the tension when it has been a while since the last pink picture.</p><p>I've ported the game to Swift (in less than a day) and, after some finishing touches, I'll publish it on the App Store. The Swift version has music, sound effects, it was made using SpriteKit and has GameCenter support, with achievements and highscores.",
                website: {
                    url: "http://dasilvacont.in/rule-34/",
                    cleanUrl: "dasilvacont.in/rule-34"
                },
                players: "1 player",
                github: {
                    url: "https://github.com/dasilvacontin/rule-34",
                    cleanUrl: "github.com/dasilvacontin/rule-34"
                }
            },
            "pzero": {
                name: "pzero",
                img: "img/pzero.jpg",
                desc: "WIP racing game for Pebble, inspired in F-Zero. Made in C. I'm looking forward make a Swift and a JS port.",
                players: "1 player",
                github: {
                    url: "https://github.com/dasilvacontin/pzero",
                    cleanUrl: "github.com/dasilvacontin/pzero"
                }
            },
            "enitor": {
                name: "enitor",
                img: "img/enitor-small.jpg",
                desc: "A game I made during 2013's summer for playing with my cousins.</p><p>I'm looking forward to improve the game and make some ports.",
                website: {
                    url: "http://bluecodestudio.com/enitor",
                    cleanUrl: "bluecodestudio.com/enitor"
                },
                players: "1-9 players w/ gamepad support",
                github: {
                    url: "https://github.com/dasilvacontin/enitor",
                    cleanUrl: "github.com/dasilvacontin/enitor"
                }
            },
            "LudumPad": {
                name: "LudumPad",
                img: "img/lp.jpg",
                desc: "LudumPad is an open-source library that lets you use mobile devices as controllers for your game with just a few lines of code.</p><p>In general, it lets you connect any device to your app/game. I've shown the prototype to a lot of people and all of them were excited about the experience.</p><p>I'm working on a release version with <a href='http://www.jorgeglez.me/' target='_blank'>Glez</a>, a friend who currently works at <a href='http://thenextweb.com/' target='_blank'>TNW</a>.",
                website: {
                    url: "http://ludumpad.com/",
                    cleanUrl: "ludumpad.com"
                },
                github: {
                    url: "https://github.com/dasilvacontin/ludumpad-client",
                    cleanUrl: "github.com/dasilvacontin/ludumpad-client"
                }
            },
            "Kipos": {
                name: "Kipos",
                img: "img/kipos.jpg",
                desc: "Kipos is an unfinished iOS game I developed for my highschool research project. The game is about taking care of creatures with which you play minigames.</p><p>I still update it whenever I have enough free time, and I look forward to completing it someday. Music by Filippo Vicarelli, Sound Effects by Torley.",
                website: {
                    url: "https://itunes.apple.com/us/app/kipos-virtual-pet-simulator/id494638587?mt=8",
                    cleanUrl: "Kipos on the App Store"
                },
                players: "1 player",
                downloads: "Over 80,000 downloads on the App Store, and a rating average of 4,5/5 stars"
            },
            "cellvorsum": {
                name: "cellvorsum",
                img: "img/cellvorsum.jpg",
                desc: "Game jam entry for the 26th Ludum Dare.",
                website: {
                    url: "http://bluecodestudio.com/airrider3-ludumdare26/",
                    cleanUrl: "bluecodestudio.com/airrider3-ludumdare26"
                },
                players: "1 player w/ gamepad support"
            },
            "subclass-error": {
                name: "subclass-error",
                desc: "JS workaround for subclassing errors. Both instanceof and stack are functional.",
                github: {
                    url: "https://www.npmjs.org/package/subclass-error",
                    cleanUrl: "npmjs.org/package/subclass-error"
                },
                downloads: "Over 190 downloads on npm"
            },
            "CanvasDye": {
                name: "CanvasDye",
                desc: "A simple function to tint PNG images using Javascript, very useful for projects/games using HTML5 Canvas.",
                github: {
                    url: "https://github.com/dasilvacontin/CanvasDye",
                    cleanUrl: "github.com/dasilvacontin/CanvasDye"
                }
            },
            "Eximo.js": {
                name: "Eximo.js",
                desc: "SpriteSheet loader for HTML5 canvas (compatible with TexturePacker). It currently lacks support for spritesheets that are trimmed and/or have rotated sprites.",
                website: {
                    url: "http://bluecodestudio.com/html5-game-sample/",
                    cleanUrl: "Example"
                },
                github: {
                    url: "https://github.com/dasilvacontin/Eximo.js",
                    cleanUrl: "github.com/dasilvacontin/Eximo.js"
                }
            }
        }; //end of database
        
        
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
        
        projectList.forEach(function (projectName) {
            loadProject(projects, database[projectName]);
        });
        
        stuffList.forEach(function (smthName) {
            loadProject(stuff, database[smthName]);
        });
        
        var wololo = new Audio("snd/wololo.mp3");
        signature.addEventListener("mouseover", function () {
            
            wololo.play();
            wololo = new Audio("snd/wololo.mp3");
            
            //random chance of rick roll ftw
            if (Math.random() < 0.05) {
                console.log("goes");
                window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
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
            jss.set("a:hover, .inline-button:hover", {
                "color": ColorLuminance(color, 0.7),
                "text-decoration": "none"
            });
            
        });