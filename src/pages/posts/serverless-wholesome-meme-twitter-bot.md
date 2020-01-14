---
title: Serverless Wholesome Meme Twitter Bot
subtitle: 'Spreading those wholesome memes with a .NET Core C# bot'
date: 2020-01-14T13:05:14.547Z
thumb_img_path: /images/CJwTxnqz_400x400.jpg
template: post
---
I've been working in my spare time to diversify my server-side languages beyond just PHP & Node, so I've been tackling some fun projects in .NET Core / C#. The latest is a [wholesome meme bot](https://twitter.com/daily_wholesome) that grabs memes from Reddit's json and tweets a random meme from that list. This is scheduled in CloudWatch to run every 4 hours.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">You can do it<br> <a href="https://twitter.com/hashtag/wholesomememes?src=hash&amp;ref_src=twsrc%5Etfw">#wholesomememes</a> <a href="https://twitter.com/hashtag/memes?src=hash&amp;ref_src=twsrc%5Etfw">#memes</a> <a href="https://twitter.com/hashtag/memesdaily?src=hash&amp;ref_src=twsrc%5Etfw">#memesdaily</a> <a href="https://twitter.com/hashtag/dankmemes?src=hash&amp;ref_src=twsrc%5Etfw">#dankmemes</a> <a href="https://t.co/P30WucOBnh">pic.twitter.com/P30WucOBnh</a></p>&mdash; Wholesome Memes Daily (@daily_wholesome) <a href="https://twitter.com/daily_wholesome/status/1216308266789228544?ref_src=twsrc%5Etfw">January 12, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

In the spirit of wholesome memes, I wanted the bot to hopefully do a little good in the world, so I provided a donation link in the description to [St Jude's Children's Hopsital](https://www.stjude.org/donate/donate-to-st-jude.html). I will probably have the bot tweet out a link to that donation link as well a few times a month as the follower count grows.

You can find the source code here: https://github.com/christopherarter/DotNetTwitterBot
