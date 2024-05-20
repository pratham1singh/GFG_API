const express = require('express');
const getUserData = require('./Scrap');

const app = express();

app.get("/",(req,res)=>{
  res.send("Welcome to GFG_API,made by Pratham singh")
})

app.get('/:userName', async (req, res) => {
  try {
    const userName=req.params.userName;
    const data = await getUserData(userName);
    if(!data)
        res.send("User name not found !")
    // console.log(data)
    else
      res.send(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(3000||process.env.PORT, () => {
  console.log('Example app listening on port 3000!');
});
