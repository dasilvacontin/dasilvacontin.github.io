import request from 'request-promise'
import { load, parse } from 'gh-emoji'
import { Howl } from 'howler'

const hypnoClip = new Howl({
  urls: ['snd/hypnotoad.mp3'],
  loop: true,
  volume: 0.4
})
let hypnoPlaying = false

let linkTimeout = null
function patchClipLoop () {
  linkTimeout = setTimeout(() => {
    hypnoClip.pos(1)
    patchClipLoop()
  }, 9 * 1000)
}

const avatar = document.getElementById('avatar')
function linkMouseEnter (e) {
  if (hypnoPlaying) return
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

function addListenersInContainer (node) {
  const links = Array.from(node.getElementsByTagName('a'))
  links.forEach(link => {
    link.addEventListener('mouseenter', linkMouseEnter)
    link.addEventListener('mouseleave', linkMouseLeave)
  })
}

function getRepos ({ base = [], page = 1, progress = () => {} }) : Promise {
  progress(base)
  return new Promise((resolve, reject) => {
    request({
      uri: 'https://api.github.com/users/dasilvacontin/repos',
      qs: { page, 'per_page': 100 },
      headers: {
        'User-Agent': 'request-promise'
      },
      json: true,
      resolveWithFullResponse: true
    })
    .then(response => {
      const repos = base.concat(response.body)
      return response.headers.link.match('rel="next"')
        ? getRepos({ base: repos, page: page + 1, progress })
        : repos
    })
    .then(resolve, reject)
  })
}

function filterRepos (repos) {
  return repos
  .filter(repo => !repo.fork && (repo.description || '').match(/:.+:/))
  .map(r => ({
    name: r.name,
    description: r.description,
    stars: r.stargazers_count,
    url: r.html_url
  }))
  .sort((r1, r2) => r1.stars >= r2.stars ? -1 : 1)
}

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

const repoContainer = document.getElementById('repos')
function renderRepos (repos) {
  repos = filterRepos(repos)
  console.log(`rendering ${repos.length} repos`, new Date())
  repoContainer.innerHTML = repos.map(renderRepo).join('')
  repoContainer.style.opacity = 1
  addListenersInContainer(repoContainer)
}

addListenersInContainer(document)

load()
getRepos({ progress: renderRepos })
.then(renderRepos)
.catch(console.error.bind(console))
