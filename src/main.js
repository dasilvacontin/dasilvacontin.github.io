import request from 'request-promise'
import { load, parse } from 'gh-emoji'
import { Howl } from 'howler'

const hypnoClip = new Howl({
  urls: ['snd/hypnotoad.mp3'],
  loop: true,
  volume: 0.4
})
let hypnoPlaying = false

const repoReq = request({
  uri: 'https://api.github.com/users/dasilvacontin/repos',
  qs: { 'per_page': 100 },
  headers: {
    'User-Agent': 'request-promise'
  },
  json: true
})

function renderRepo (r) {
  let emojiTags = ''
  r.description = r.description.replace(/^((?::[^:]+:)+)(.+)/g, (_, emoji, rest) => {
    emojiTags = parse(emoji)
    return rest.trim()
  })

  return `<a class="repo" href="${r.url}">` +
  `<div class="repo--emoji">${emojiTags}</div>` +
  `<p><span class="repo--name" data-stars="${r.stars ? `${r.stars}★` : ''}">${r.name}</span><br>` +
  `${r.description}</p>` +
  '</a>'
}

var linkTimeout = null
function patchClipLoop () {
  linkTimeout = setTimeout(() => {
    hypnoClip.pos(1)
    patchClipLoop()
  }, 9 * 1000)
}

const avatar = document.getElementById('avatar')
function linkMouseEnter (e) {
  if (hypnoPlaying) return
  // disable if it gets too annoying when watching a game gif
  // if (this.dataset.game) return
  clearTimeout(linkTimeout)
  hypnoPlaying = e.target

  const gif = this.dataset.gif
  if (!gif) {
    hypnoClip.play()
    patchClipLoop()
    return
  }
  avatar.style.backgroundImage = `url(${gif})`
  if (this.dataset.cinema) return
  avatar.className += 'cinema'
}
function linkMouseLeave (e) {
  if (e.target !== hypnoPlaying) return
  clearTimeout(linkTimeout)
  hypnoPlaying = false
  hypnoClip.stop()

  avatar.style.backgroundImage = avatar.className = ''
}

const repoContainer = document.getElementById('repos')
function renderRepos (repos) {
  repoContainer.innerHTML = repos.map(renderRepo).join('')
  repoContainer.style.opacity = 1

  const links = Array.from(document.getElementsByTagName('a'))
  links.forEach(link => {
    link.addEventListener('mouseenter', linkMouseEnter)
    link.addEventListener('mouseleave', linkMouseLeave)
  })
}

load()
.then(() => repoReq)
.then(repos => {
  return repos
  .filter(repo => !repo.fork && (repo.description || '').match(/:.+:/))
  .map(r => ({
    name: r.name,
    description: r.description,
    stars: r.stargazers_count,
    url: r.html_url
  }))
  .sort((r1, r2) => r1.stars >= r2.stars ? -1 : 1)
})
.then(renderRepos)
.catch(err => console.error(err))
