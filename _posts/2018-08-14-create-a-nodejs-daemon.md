---
layout: post
title: "Making an OSX daemon using&nbsp;JavaScript,<br> gotchas included"
date: 2018-08-14 21:14:00
categories: jekyll update
comments: true
---

How to force myself into going to sleep earlier? By making my laptop unusable after a certain time in the night, that’s how! That’s the project that got me into learning how to make a daemon for OSX. And obviously I used JavaScript, because that’s how you make the best dæmon.

In case you don’t know what I’m talking about, here’s a definition from Indiana University’s knowledge base:

> A daemon is a long-running background process that answers requests for services. The term originated with Unix, but most operating systems use daemons in some form or another. In Unix, the names of daemons conventionally end in "d". Some examples include inetd, httpd, nfsd, sshd, named, and lpd.

“But David, your program doesn’t answer requests for services, so it’s not really a daemon.”
I know, I know, that’s why you use JavaScript, to compensate the slight misuse of the word. Honestly, I needed some way to keep a script running in the background, and that it was somehow hard to stop it from running – I didn’t want to be able to simply fkill1 it and continue feeding my hot state desires.

Gosh, that sounds so wrong. I swear it’s just Rocket League and Netflix. Moving on.

You write your JavaScript script. Make sure to write a SHEBANG thing at the top – this thing: `#!/usr/bin/env node`. SHEBAAANG. Sounds nice, doesn’t it?
(that allows your script to become an executable. it also looks badass, like you are a pro or something. even if you don’t intend to make your script an executable, you can add it as well)

Here’s my `gotosleep.js` script, in case you are interested:

{% highlight javascript linenos %}
#!/usr/bin/env node
const { exec } = require('child_process')

const MS = 1
const SEC = 1000*MS
const MIN = 60*SEC
const LOGIC_INTERVAL = 1*MIN

const LATE_ENDS_AT = 4

function invertColors () {
    return new Promise (function (resolve, reject) {
        exec(`osascript -e 'tell application "System Events"' -e 'key code 28 using {control down, option down, command down}' -e 'end tell'`, (err, stdout, stderr) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

function sleepComputer () {
    exec('pmset sleepnow')
}

let wasLate = false
function logic () {
    const now = new Date()
    const isLate = (now.getHours() < LATE_ENDS_AT)
    if (isLate) {
        if (!wasLate) invertColors()
        else sleepComputer()
    }
    wasLate = isLate
}

setInterval(logic, LOGIC_INTERVAL)
{% endhighlight %}

Actually make the script file executable using `chmod`, like this: `chmod +x gotosleep.js`. Now you can use `./gotosleep.js` to run your script. Noice.

Create a `.plist` file whose name looks like a domain name reversed, similar to mine: `in.dasilvacont.gotosleep.plist`. This file is like the config file for your daemon; it defines how your script or program will be executed, with which arguments, when will it be executed, whether the computer will try to keep it alive (running), etc.

Fill the `.plist` file with your configuration. You can check the different configuration options at http://www.launchd.info/.

There’s some gotchas related to making Node.js scripts work that bit me hard, which is mainly what prompted me to write this article. To share those gotchas with you, to free you from the ~pain~.
]

stdout stderr gotcha

PATH gotcha

Move the `.plist` file over to `/Library/LaunchAgents/`, where it will live happily ever after with the rest of the deamon config files.


Also, if you wonder why these things are called “daemons”, head over to this english.stackexchange answer.

h/t to https://medium.com/@fahimhossain_16989/adding-startup-scripts-to-launch-daemon-on-mac-os-x-sierra-10-12-6-7e0318c74de1 for getting me partly there

1: I don’t actually use sindresorhus’ fkill. I use a function that uses fzf – I got it from its examples page. Here’s the definition:

{% highlight bash %}
fkill() {
  pid=$(ps -ef | sed 1d | fzf -m | awk '{print $2}')

  if [ "x$pid" != "x" ]
  then
    kill -${1:-9} $pid
  fi
}
{% endhighlight %}