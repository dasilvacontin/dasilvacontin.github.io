jss = require 'jss-browserify'



# link to df video

avatar = document.getElementById 'avatar'
avatar.onclick = ->
    window.open 'https://www.youtube.com/watch?v=SEOscGdcXZU', '_blank'



# w0l0l0 button / rickroll / etc

preloadedSound = (src) ->
    audio = new Audio src
    audio.preload = true
    audio

wololoSrc = '/snd/wololo.mp3'
wololo = preloadedSound wololoSrc
signature = document.getElementById 'signature'
signature.onclick = () ->

    wololo.play()
    wololo = preloadedSound wololoSrc

    #random chance of rick roll ftw
    if Math.random() < 0.05
        console.log 'goes'
        reqyo 'RICKROLLD'
        window.open 'https://www.youtube.com/watch?v=BROWqjuTM0g', '_blank'
        return



# random name

getRandomName = ->
    rnd = Math.random()
    if rnd > 0.75
        return 'デイビッド'
    'dasilvacontin'

getRandomLabel = ->
    labels[Math.floor(Math.random() * labels.length)]

replaceHTML = (id, lambda) ->
    document.getElementById id
    .innerHTML = lambda()

replaceHTML 'say-my-name', getRandomName



# yo notication request

reqyo = (action) ->
        req = new XMLHttpRequest
        req.open 'GET', 'http://kipos.me:8083/' + action, true
        req.send null

reqyo 'STALKD'
