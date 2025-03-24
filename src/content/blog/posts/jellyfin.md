---
title: jellyfin two ways
date: 2025-03-23
author: Nancy Cantu
description: I installed jellyfin. And then I did it again.
tags: [homelab]
---

# jellyfin, one way

I first installed Jellyfin running on a Docker container on my big "server" machine. This box had been running a couple of other, smaller, much less computationally intensive services for months then. It has a huge hard drive. It seemed like a great idea!

It was not. It turns out using the same computer as a Linux frankengaming PC and a server is a terrible idea. It turns out thinking "it won't happen to me" does not, in fact, make it impossible for it to happen to you. Three days later everything was down, even a simple `docker container ls` would hang forever, and I was 1000 km away from the machine itself.

Scrap that then.

# jellyfin, but better

I acquired (bought from a surly teenager at Canada Computers) a hard drive and plugged it into my raspberry pi. Like the frankengaming PC, the raspberry pi had been running services for a while. It's a lot more stable. I don't want to have to eat my words in a while, but this is *a lot* better. I'm also running it on the bare metal, which required only a tiny bit more configuration (namely, I had to give the `jellyfin` user read permissions for the directory media is in). I used [this](https://pimylifeup.com/raspberry-pi-jellyfin/) guide as a general reference where needed. 

# scattered thoughts

- The 1TB drive I bought is smaller than the raspberry pi housing. It had been a while since I bought physical media like that and the minituarization of components continues unabated. 

- I am now watching `The Haunting of Hill House`, which I ripped from DVDs I bought, running from my own server. I think this is as satisfying as the show itself.

- I want a Pebble watch quite badly, but I don't need one and if I'm not buying American strawberries it seems quite ridiculous to then go and spend the equivalent of many cases of strawberries on a something I want but don't need. I already own watches, and I already own things I like to tinker with. So this is just a complaint about nothing.