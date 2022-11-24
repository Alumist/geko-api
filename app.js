require("dotenv").config();
const express = require(`express`);
const app = express();
const port = process.env.PORT || 3001;

const {
    Connection,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    PublicKey,
} = require ('@solana/web3.js')

app.use(function (req, res, next) {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(
      `Access-Control-Allow-Methods`,
      `GET, POST, OPTIONS, PUT, PATCH, DELETE`
    );
    res.setHeader(
      `Access-Control-Allow-Headers`,
      `X-Requested-With,content-type`
    );
    res.setHeader(`Access-Control-Allow-Credentials`, true);
    next();
  });
  
app.listen(port, ()=> {
    console.log(`api is up at http://localhost:${port}`)
})

app.get(`/`, (req,res) => {
    res.send('mom said get yo money up.')
})


app.get(`/getWalletBalance/:address`, async (req,res) => {
    res.send ({
        balance: await getWalletBalance(req.params.address)
    })
})


const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");


async function getWalletBalance(address){
    try {
        return (await connection.getBalance(new PublicKey(address)))/LAMPORTS_PER_SOL
    } catch (error) {
        return 0;
    }
};