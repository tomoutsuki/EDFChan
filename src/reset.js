require('dotenv').config();
const mongoose = require('mongoose');

const Member = require('./models/Member');
  
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongo Connected");
        ResetProcess();
    })
    .catch((error) => console.error(error));

async function ResetProcess() {
    await Member.updateMany({salary_claimed: "TRUE"},{salary_claimed: "FALSE"});
    await Member.updateMany({salary_claimed: "FALSE"},{login_streak: 0});
    await Member.updateMany({omikuji_claimed: "TRUE"},{omikuji_claimed: "FALSE"});
}