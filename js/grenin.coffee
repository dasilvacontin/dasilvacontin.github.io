
fs = require 'fs'
window.jss = jss = require 'jss-browserify'
Handlebars = require 'handlebars'



# lists so that I can order the projects easily:

projectList = [
    "animus",
    "Kipos",
    "KairosHacks",
    "LudumPad",
    "ld48-29",
    "L8RYO",
    "rule#34",
    "pzero",
    "enitor",
    "cellvorsum"
]

stuffList = [
    "mocha",
    "mustache.js",
    "subclass-error",
    "eximo.js"
]



# link to df video

avatar = document.getElementById 'avatar'
avatar.onclick = ->
    window.open 'https://www.youtube.com/watch?v=SEOscGdcXZU', '_blank'



# generate html for projects

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

dbReq = new XMLHttpRequest()
dbReq.onload = reqListener
dbReq.open 'get', '/js/projects.json', true
dbReq.send()



# w0l0l0 button color change / rickroll / etc

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
        reqyo 'RICKROLLD'
        window.open 'https://www.youtube.com/watch?v=BROWqjuTM0g', '_blank'
        return

    color = ColorLuminance getRandomColor(), 0
    document.body.style.background = color
    jss.set 'h1, h2, h3, p, li',
        color: 'white'
    jss.set 'a, .links a',
        color: ColorLuminance color, 0.5
        'text-decoration': 'none'
    jss.set 'a:hover, .links a:hover',
        color: ColorLuminance color, 0.7
        'text-decoration': 'none'



# avatar intro animation

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
    setTimeout ->
        jss.set '.loader',
            transition: 'opacity 0.5s'
            '-webkit-transition': 'opacity 0.5s'
            opacity: '0'
    , 500

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

replaceHTML = (id, lambda) ->
    document.getElementById id
    .innerHTML = lambda()



# random name

getRandomName = ->
    rnd = Math.random()
    if rnd > 0.75
        return 'デイビッド'
    'dasilvacontin'

getRandomLabel = ->
    labels[Math.floor(Math.random() * labels.length)]

replaceHTML 'say-my-name', getRandomName



# yo notication request

reqyo = (action) ->
        req = new XMLHttpRequest
        req.open 'GET', 'http://kipos.me:8083/' + action, true
        req.send null

reqyo 'STALKD'
