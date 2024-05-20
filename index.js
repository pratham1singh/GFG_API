const express = require('express');
const getUserData = require('./Scrap');

const app = express();


app.get('/',(req,res)=>{
  res.send('Hii!, I am Pratham welcome to my API.');
})

app.get('/:userName', async (req, res) => {
  try {
    const userName=req.params.userName;
    const data = await getUserData(userName);
    if(!data)
        res.send("You have not entered correct user name. User name does exists.");
    // console.log(data)
    res.send(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(3000||process.env.PORT, () => {
  console.log('Example app listening on port 3000!');
});
