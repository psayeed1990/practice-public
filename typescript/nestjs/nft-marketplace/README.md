<h1>Marketplace for polygon NFT</h1>
<p>
    This is a marketplace for polygon NFTs.
</p>
<p>
    The marketplace is a smart contract that allows you to buy and sell NFTs.
    You can also create your own NFTs and sell them.
</p>
<h3>How to deploy</h3>
Clone this rtepository with SSH

<h2>Backend</h2>

<p>Go to backend folder and run...</p>
<code>yarn</code>
<p>Change <em>.env.example</em> to <em>.env</em> and then run...</p>
<code>yarn build</code>
With pm2 you can run the server with:
<code>pm2 start dist/main.js --name "backend"</code>

<h2>Frontend</h2>
<p>Go to frontend folder and run...</p>
<code>yarn</code>
<p>Create .env.local in root with this code in it</p>
<code>https://nft.smartx.finance/</code>
<p>Then run...</p>
<code>yarn build</code>

<p>With pm2 you can run the server with:
<code>pm2 start yarn --name "frontend" -- start</code>

<h2>Project Architecture</h2>
Blockchain - Polygon
Database: mongodb
Storage: s3 and IPFS
Backend: NestJS
Frontend: React, NextJS
Language: Typescript