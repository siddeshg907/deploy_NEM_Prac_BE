const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")
const cors=require("cors")
require("dotenv").config()






const app=express()
app.use(express.json())

app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"This is Hompe Page"})
})

app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to the DB")
        console.log(`server is running on ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
    
})