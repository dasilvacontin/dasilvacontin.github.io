
fs = require 'fs'
window.jss = jss = require 'jss-browserify'
Handlebars = require 'handlebars'


# So that I can order the projects moving a single line:

projectList = [
    "Kipos",
    "L8RYO",
    "LudumPad",
    "ld48-29",
    "rule#34",
    "pzero",
    "enitor",
    "cellvorsum"
]

stuffList = [
    "Mocha",
    "subclass-error",
    "CanvasDye",
    "Eximo.js"
]


avatar = document.getElementById 'avatar'
avatar.onclick = ->
    window.open 'https://www.youtube.com/watch?v=SEOscGdcXZU', '_blank'

projectsTemplateSource = fs.readFileSync 'hbs/projectsTemplate.hbs', 'utf-8'
projectsTemplate = Handlebars.compile projectsTemplateSource

projectContainer = document.getElementById 'projects'
stuffContainer = document.getElementById 'stuff'

reqListener = ->
    database = JSON.parse @responseText
    
    projectList = (database[projectName] for projectName in projectList)
    stuffList = (database[projectName] for projectName in stuffList)
        
    projectContainer.innerHTML = projectsTemplate projectList
    stuffContainer.innerHTML = projectsTemplate stuffList

    new WOW()
    .init()

dbReq = new XMLHttpRequest()
dbReq.onload = reqListener
dbReq.open 'get', '/js/projects.json', true
dbReq.send()

getRandomColor = () ->
    letters = '0123456789ABCDEF'.split ''
    color = '#'
    for i in [0..5]
        color += letters[Math.floor(Math.random() * 16)]
    color

# http://www.sitepoint.com/javascript-generate-lighter-darker-color/
ColorLuminance = (hex, lum = 0) ->
    hex = String(hex).replace /[^0-9a-f]/gi, ''
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2] if hex.length < 6
    rgb = '#'
    for i in [0..2]
        c = parseInt (hex.substr i*2, 2), 16
        c = Math.round(Math.min(Math.max(0, c + c*lum), 255)).toString(16)
        rgb += ('00' + c).substr c.length
    rgb

preloadedSound = (src) ->
    audio = new Audio src
    audio.preload = true
    audio

wololo = preloadedSound 'snd/wololo.mp3'
signature = document.getElementById 'signature'
signature.onclick = () ->
    
    wololo.play()
    wololo = preloadedSound 'snd/wololo.mp3'
    
    #random chance of rick roll ftw
    if Math.random() < 0.05
        console.log 'goes'
        window.open 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'
        return
        
    color = getRandomColor()
    document.body.style.background = color
    jss.set 'h1, h2, h3, p, li',
        color: 'white'
    jss.set 'a, .links a',
        color: ColorLuminance color, 0.5
        'text-decoration': 'none'
    jss.set 'a:hover, .links a:hover',
        color: ColorLuminance color, 0.7
        'text-decoration': 'none'

doUp = ->
    jss.set '.dc-fadeIn',
        transition: 'opacity 1s'
        '-webkit-transition': 'opacity 1s'
        opacity: '1'

    jss.set '.moveUp',
        transition: 'transform 3s'
        '-webkit-transition': '-webkit-transform 3s'
        transform: 'translateY(0px)'
        '-webkit-transform': 'translateY(0px)'

    jss.set '#avatar',
        opacity: '0'

showLogo = ->
    jss.set '#avatar',
        transition: 'opacity 1s'
        '-webkit-transition': 'opacity 1s'
        opacity: '1'

immediate = (cb) -> setTimeout cb, 1
(->
    elapsed = 0
    logo_wait = 750
    up_wait = 1100
    loaded = false

    window.onload = ->

        return if loaded
        loaded = true

        doUp()

        elapsed = +new Date - elapsed
        
        if elapsed < logo_wait
            setTimeout showLogo, logo_wait - elapsed
        else
            showLogo()

    # in case your browser is a turtle
    setTimeout window.onload, 2000

    immediate ->
        elapsed = +new Date
        jss.set '.loader',
            transition: 'transform 1s ease-out, background-color 1s'
            '-webkit-transition': '-webkit-transform 1s ease-out, background-color 1s'
            transform: 'scale(1)'
            '-webkit-transform': 'scale(1)'
            'background-color': 'black'
)()
