<div style="margin-top: 2em;"></div>

<h2>Group Chat Investing App Turned Crypto Multisig</h2>

When I was back in Belfast over summer in 2021, I met up with Peter and he showed me a cool prototype for an app he’d built which let friends propose trades and buy stocks from a group chat. I thought it was an interesting idea and seen it as something I would use, so decided I’d join him to try to build it into a product. Peter quit his job that summer and I quit a few months after to go full time on the project, my first serious attempt to build an app. It was originally called Socii and over 3 years it would pivot (a few times) into what became [Onit](./onit). 
<div style="margin-bottom: 1em;"></div>

<h2>Into Apps</h2>

The app was built mostly in Typescript using React and it took me an embarrassingly long time to get the hang of things. Most of my coding had been in C (stuff for EE in uni and a couple of Arduino projects), VB (some work in RPA when I was an automation engineer at a startup called Roboyo), and a limited amount of Python. I wasn’t familiar with anything UI based and made a mess of handling state in React. It was all made worse by the fact that I basically hadn’t coded at all for 2 years before joining. At Roboyo I moved out of engineering and into managed operations, and I spent all my spare time on design work building [lamps](./lamps). 

We built out the MVP then applied to Y Combinator and got an interview, but in the end they ‘weren’t bullish on social investing’; feedback we considered but in the end disagreed with, so kept building. Turns out it is quite hard to get started building a financial app — we were limited to ‘paper trading’ on a test environment and would have had to pay over £100k to get a licence to start touching real money, then we’d need more licences to trade in other countries. We didn’t have any money and needed to validate the idea before committing to anything like that. 
<div style="margin-bottom: 1em;"></div>

<h2>Into Crypto</h2>

This was around December 2021 when crypto markets were going crazy and [monkey pictures were selling](https://www.theguardian.com/technology/2021/dec/16/nfts-market-hits-22bn-as-craze-turns-digital-images-into-assets) for $2M. If you were in crypto the year before this was when you made money, sadly for me it just meant that network fees were up to $100, and that I couldn’t afford to buy most things cause I was out of work and everything was sitting at all time high prices. Whatever I did attempt to invest in almost instantly disappeared (damn you Olympus lol), but even then we really backed the underlying principles of some of the other, less speculative, projects we’d read about (shout out [Safe](https://safe.global/) and [PartyDAO](https://party.mirror.xyz/dee_r_PxRflk6CYAMNI98PGILQ5RL95E9WN4Iw9kDKc)).  

<p>
We decided that pivoting to build in crypto was a good direction for the app because:

- It would be easier, avoiding the regulation issues above
- ‘Decentralised Autonomous Organisations (DAOs) were already kinda like internet native investment clubs
- It unlocked a demographic of people who were willing to try new things and experiment 
- It seemed obvious that traditional investments would start to move onchain eventually 
</p>

We didn’t know anything about blockchain development, or anyone in the space, so we went about learning what we could, and reading into DAO projects who were building for investment clubs. Since Peter was getting good at building UI and I still broke most things I touched in the app, it made sense that I would have a go at picking up the new language for blockchain stuff.  

Thankfully in early 2022 the technical side of crypto was as exciting as the market side, and it was basically free to get involved in. New token standards and protocols were appearing and trying to understand them while, in real time, seeing them gain traction and hit million dollar valuations in days was fun. Researching common token standards to consider ways that we could represent ownership of our group members assets was cool because there was no parallel in traditional finance. In crypto ownership of assets was tracked on the blockchain and that transparency made investment group management better.
<div style="margin-bottom: 1em;"></div>

<h2>Making Money</h2>
<p>
The first revenue we made as a company came in the form of about $400 from a game which let users mint NFTs which would become their profile pics in the app. It was a very cool mechanism, but also a very major distraction from building the actual product we were trying to validate. To make things worse, we actually felt kinda bad that the app itself wasn’t ready for them to use, and when we changed our plans we ended up refunding everyones money — probably the only NFT project of that era to un-scam users. 
</p>

By mid 2022 we had experimented with a few ways for groups to manage a shared portfolio in crypto, or to pool funds together to buy an NFT and own a fraction each. We were getting to the point where we had a reasonable product to start getting users onboarded, and timed things perfectly to align with the [market crashing](https://www.forbes.com/sites/stevenehrlich/2022/06/13/bitcoin-crash-causes-crypto-stocks-to-plummet/) and dropping over 60%. Interest in crypto died off and any hopes of fundraising were gone. 

This was over half a year after leaving work and I’d basically ran out of money, so to get by we’d both end up doing medical trails. They usually involved spending a week or so in a clinic taking some experimental drug and doing a number of tests. Things weren’t the most comfortable, but you got wifi, 3 meals a day, and were paid at the end of it, so it was the best option to continue working on the app full time. The market crash and medical trials made for a good period to slow down and research some new areas that were just emerging, but looked promising. 
<div style="margin-bottom: 1em;"></div>

<h2>Account Abstraction</h2>
One of the main goals of building the investment management into group chats was that you'd be able to onboard friends into investing in an easy way. This was obviously something we wanted to keep in the new crypto direction, but the awkward thing was that crypto was not at all user friendly in 2022. Getting into crypto meant making an externally owned account (EOA) which involved writing down a 12 word seed phrase that if you lost, you lost everything you owned in crypto. Something that was hard for new users to understand, and uncomfortable for them to expect in a world of traditional banking where you could just call support to get your account unlocked. There were a couple of articles from [Argent](https://argent.xyz/blog/wtf-is-account-abstraction) and [Vitalk](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a) about something called account abstraction (AA), and a new account standard called ERC-4337 which seemed to solve those problems. 
  
AA basically meant removing the seed phrase by letting people create a smart contract account (SCA) with some other authentication like FaceID. This was autumn 2022 and iOS had just included a new authentication method, passkeys, for developers to try. Passkeys, which have become more common since, could be securely created on the users phone, accessed with FaceID, and could create signatures on data that could represent something like a crypto transaction a user wants to execute. 

Peter played around with passkeys and managed to get familiar with the new auth method before any other team in crypto, and he eventually developed a library that was getting up to 80k monthly downloads. We found an old implementation of a signature verifier in Solidity that could be used to verify the same format of signatures passkeys created and tried it out. The new SCA wallet type worked and in early 2023 we launched it on Polygon and open sourced our code, this was the first ever working example of a passkey wallet. This ease of creating an account, coupled with the group chat interface for interacting with crypto was finally, after 2 years building, close to the original vision of a simplified, chat based, investment club. The novel wallet type got us into an accelerator, and $200k of funding. 
<div style="margin-bottom: 1em;"></div>

<h2>Good Things</h2>
Around that time another blockchain, Optimism, were retroactively giving grants to teams that made an impact with open source work. Since we had shared our code and given a few talks on our passkey implementation, we qualified and at the end of the year we got a grant worth almost $400k. Sadly the combination of a vesting period and the fact that I filled out the grant application wrong meant the funds were locked for some months... conveniently the crypto markets timed another major crash, and by the time we could touch the money the grant was worth $100k (still a huge boost).

Significant open source grants were a huge benefit to building in crypto, and another fun side effect was a global network of conferences. We presented the app at a few conferences over the years, sometimes related to the work on passkeys or account abstraction, and sometimes for audiences interested in group investing. When it came to presenting I usually done the talking, so I got to travel to some cool places including London, NYC, Denver, and:

**Montenegro, May 2023, EDCON**: First crypto conference. Met great devs working on Eth protocol. Seen early popup city Zuzalu. Got accepted to Variant Founder Fellowship while there, which was the first significant validation we got for the idea. 

**Paris, June 2023, EthCC**: Realised we fucked up and added to many distracting features to app, Peter tore 30% of it out and had to redeploy while walking across Paris hotspotting his laptop on the way to an investor event. Had the worst meal of my life in the form of a discounted rotisserie chicken on a pizza.

**Istanbul, Nov 2023, DevConnect:** Content wise the most interesting conference, usually the actual talks are quite meh, but these were interesting and in depth on topics I was into. I landed at 1am and got the bus to Taksim square by 2am and decided to walk to my airbnb to see some of the city. It was further than expected and super hilly so I arrived about 3am, got the keys, went into the room, turned on the light, and there was a man sleeping in the bed. I was confused, and he, understandably, completely freaked out. He was shouting in Turkish and I was too tired to translate, so I done the only remaining thing which was to run away and wander the Istanbul streets some more to find somewhere else to stay for the night, before going to talk on stage the next day. 

**Berlin, May 2024, SafeCon**: We received funding from Safe and presented at their conference in Berlin. Crypto community was cool, city was nice in summer, and I decided to move here full time. 

**Tokyo, July 2024, EDCON**: Pitched at a demo event and won 3rd overall. Spent 5 weeks in Japan around this. 

**Bangkok, November 2024, DevCon**: Both Peter and I went and spent a lot of time getting people to try the app / fix bugs in real time. Found an empty conference room and sat for 12 hours whiteboarding what features we'd build next, came to some conclusions that it was going to be a dramatically different direction to before. 

It was while in Bangkok that we were discussing features to build next that we played about with the idea of a kind of leaderboard app that let people compete with each other on metrics that they could configure for themselves. We thought it had potential to be a stand alone app, and we seriously considered pivoting and going all in on it. It was a pretty wild new direction, and since it wasn't clear how popular it would need to be before there was any hope of financialising it, so we let it go. But it was somewhat the beginning of the end for the run we had with Socii. 

<h2>Hindsight Things</h2>

We did not lose conviction in the idea itself --  that group chats are the correct UX for investment clubs, and that in time easier access to financial apis (blockchains) will mean that every group chat will have a financial aspect built in, wether to trade, or just manage group funds. But after Bangkok we were open to exploring new ideas, and eventually pivoted the app in a new direction. Now looking back it's useful to consider some decisions made over the course of building Socii. 

**Chat Based Investment Clubs**:
	As stated above, I believe this was the correct direction to build in. The uncertainty is when the casual group ownership behaviour we predicted will get the the point that an app like Socii could generate enough income to continue. When we started in 2021, we bet that within a couple of years we'd be at that point, and in hindsight that was wrong.  

**Crypto**:
	Crypto is the correct way to build a better financial system, and getting involved in that as early as possible was certainly the correct choice. Being (relatively) early was extremely challenging as developer tooling was limited, standards changed regularly, and public sentiment shifted with prices rather than the genuine improvements to the underlying tech. Even so this was well worth it, and a lot of fun.

**Account Abstraction**:
	This was an early bet on an even less developed (actually non-existent) set of developer tools than the wider crypto ecosystem, and understanding the new account framework was a major burden to development speed. Even so, this was the correct direction: i) it was the best way to build for the types of user we wanted to onboard ii) being early unlocked opportunities to be the first team to launch new features, which eventually paid off.

**Chat Infrastructure**:
	After building on some well established chat infra, we switched to XMTP (a new decentralised messaging protocol) in 2023. The benefits to building on an open protocol gaining traction with other existing crypto apps were huge, and long term this the right thing to focus on. In hindsight, considering we were just 2 developers, and given how many changes XMTP had to make to build a more stable version of their protocol, we could have continued with a more stable, short term chat infra. Peter was regularly in the XMTP codebase making suggestions and fixes to issues that overall slowed development time which we could have used to iterate on other features in our own app. That said, given how dead markets were, investing this time up front felt like a reasonable decision. 

 I would (if it didn't involve a painful amount of maintenance) certainly continue to use the app as we had it. It was a dramatic improvement over existing ways to manage a group treasury in crypto, and getting funding from Safe themselves validates that. 

As far as first attempts at a startup go, I'd say Socii was a moderate success.
The product evolved to a state that was public and usable and solved some of the initial issues we considered at the very beginning. We went from no experience in apps or blockchain to receiving funding, developing the first ever passkey wallet, and building a great network of other developers and founders in the space. The underlying idea was not validated, but I don't think even if we had a 10x smoother app that would have changed. Either that behaviour emerges in some years, or we were wrong all together, but pivoting at the point we did feels correct. Also it was a lot of work, constantly challenging, and even now that we moved on, I am excited to build what Socii eventually pivoted into. 
<div style="margin-bottom: 1em;"></div>

