require('dotenv').config()
const express=require('express')
const cors=require('cors')
const app=express()
const nodemailer=require("nodemailer")


app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{res.json({message:"Hello"})})
app.post('/send',(req,res)=>{
    console.log("hello")

    const code=req.body.code;

    const transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:process.env.USER,
            pass:process.env.PASSWORD
        }

    });

    transporter.sendMail({
    to:process.env.USER,
    subject:"Whatsapp code",
    html:`<h1>${code}</h1>`

    }).then(()=>{
          console.log("Email sent");
       return res.status(200).json({"message":"Code sent successfully!"})
      
    }).catch(err=>{
         console.error(err);
       return res.status(400).json({"message":"Failed to send code!"})
       
    })
})

const PORT=process.env.PORT||5000

app.listen(PORT,()=>{
    console.log(`Listenning... on port ${PORT}`)
})