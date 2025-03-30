<div style="margin-top: 2em;"></div>

## Group Chat Investing App Turned Crypto Multisig

When I was back in Belfast over summer in 2021, I met up with Peter and he showed me a cool prototype for an app he’d built which let friends propose trades and buy stocks from a group chat. I thought it was an interesting idea and seen it as something I would use, so decided I’d join him to try to build it into a product. Peter quit his job that summer and I quit a few months after to go full time on the project, my first serious attempt to build an app. It was originally called Socii and over 3 years it would actually pivot (a few times) into what became Onit. 
<div style="margin-bottom: 2em;"></div>

### Into Apps
<div style="margin-bottom: 1em;"></div>
The app was built mostly in Typescript using React and it took me an embarrassingly long time to get the hang of it. Most of my coding had been in C (stuff for EE in uni and a couple of Arduino projects), VB (some work in RPA when I was an automation engineer at a startup called Roboyo), and a limited amount of Python. I wasn’t familiar with anything UI based and made a mess of handling state in React. It was all made worse by the fact that I basically hadn’t coded at all for the 2 years before joining. At Roboyo I moved out of engineering and into managed operations, and I spent all my spare time on design work building lamps (link).
<div style="margin-bottom: 1em;"></div>

We built out the MVP then applied to Y Combinator and got an interview, but in the end they ‘weren’t bullish on social investing’; feedback we considered but in the end disagreed with, so kept building. Turns out it is quite hard to get started building a financial app — we were limited to ‘paper trading’ on a test environment and would have had to pay over 100k to get a licence to start touching real money, then we’d need other licences to trade in other countries. We didn’t have any money and needed to validate the idea before committing to anything like that. 
<div style="margin-bottom: 2em;"></div>


### Into Crypto
<div style="margin-bottom: 1em;"></div>

This was around December 2021 when crypto markets were going crazy and almost impossible to ignore. If you were in crypto the year before this was when you made money, sadly for me it just meant that network fees to make transactions were up to $100, and that I couldn’t afford to buy most things cause I was out of work and everything was sitting at all time high prices. Whatever I did try to get into was almost instantly lost (damn you Olympus lol), but even then we really backed the underlying principles, and seen value in the structure of some of the projects we’d read about (shout out Safe and Party DAO). 
<div style="margin-bottom: 1em;"></div>

We decided that pivoting to build in crypto was a good direction for the app because:
- It would be easier, avoiding the regulation issues above
- ‘Decentralised Autonomous Organisations (DAOs) were kinda like internet native investment clubs
- It unlocked a demographic of people who were willing to try new things and experiment, 
- It seemed obvious that traditional investments would start to move onchain eventually 
<div style="margin-bottom: 1em;"></div>

We didn’t know anything about blockchain development, or anyone in the space, so we went about learning what we could, and reading into DAO projects who were building similar ideas. Since Peter was getting good at building the UI and I still broke most things I touched in the app, it made sense that I would have a go at picking up the new language for blockchain stuff. 
<div style="margin-bottom: 1em;"></div>

Thankfully in early 2022 the technical side of crypto was just as exciting as the market side, and it was basically free to get involved in. New token standards and protocols were appearing and trying to understand them while seeing them gain traction in the crazy market was fun. Researching common token standards to consider ways that we could represent ownership of our group members assets was cool because there was no parallel in tradFi. In crypto ownership of assets was tracked onchain and the transparency of that made investment group management better. 
<div style="margin-bottom: 2em;"></div>

### Making Money
<div style="margin-bottom: 1em;"></div>

The first revenue we made as a company came in the form of about $400 from a game which let users mint NFTs which would become their profile pics in the app. It was a very cool mechanism, but also a very major distraction from building the actual product we were trying to validate. To make things worse, we actually felt kinda bad that the app itself wasn’t ready for them to use, and when we changed our plans we ended up refunding them the money — probably the only NFT project of that era to un-scam users. 
<div style="margin-bottom: 1em;"></div>

By mid 2022 we had experimented with a few ways for groups to manage a group portfolio in crypto, or to pool funds together to buy an NFT and own a fractional share each. We were getting to the point where we had a reasonable product to start getting users onboarded, and timed things perfectly with a complete market crash of 50%. Interest in crypto died off and any hopes of fundraising were gone. This was over half a year after leaving work and I’d basically ran out of money, so to get by we’d both end up doing medical trails. They usually involved spending a week or so in a clinic taking some new drug and doing a number of tests. Things weren’t the most comfortable, but you got wifi, 3 meals a day, and were paid at the end of it, so it was the best option to continue working on the app full time. The market crash and medical trials made for a good period to slow down and research some new areas that were just emerging, but looked promising. 
<div style="margin-bottom: 2em;"></div>

### Account Abstraction
<div style="margin-bottom: 1em;"></div>

One of the main ideas of building the investing into the group chat was that you would be able to onboard friends into investing in an easy way. This was obviously something we wanted to keep in the new crypto direction, but the awkward thing was that crypto was not at all user friendly in 2022. Getting onchain meant making an Externally Owned Account (EOA) which involved writing down a 12 word seed phrase that if you lost, you lost everything you owned in crypto. Something that was hard for new users to understand, and uncomfortable for them to expect in a world of traditional banking where you could just call support to get your account unlocked. There were a couple of articles from argent and vitalk about something called account abstraction (AA) which seemed to solve some of those problems. 