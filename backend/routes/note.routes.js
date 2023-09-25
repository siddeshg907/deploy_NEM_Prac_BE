const express=require("express")
const {NoteModel}=require("../model/note.model")
const {auth}=require("../middlewares/auth.middleware")


const noteRouter=express.Router()

noteRouter.use(auth)


noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const note=new NoteModel(payload)
        await note.save()
        res.status(200).json({msg:"A new note has been created"})
    }catch(err){
res.status(400).send({"error":err})
    }
})


noteRouter.get("/",async(req,res)=>{
    try {
        const notes=await NoteModel.find({username:req.body.username})
        res.status(200).send(notes)
    } catch (err) {
        res.status(400).json({error:err})
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID}=req.params
    const note=await NoteModel.findOne({_id:noteID})

    const payload=req.body
    try {
        if(req.body.userID===note.userID){
            await NoteModel.findByIdAndUpdate({_id:noteID},payload)
            res.status(200).json({msg:`The note with ID :${noteID} has been added`})

        }else{
            res.status(200).json({msg:"You are not authorised"})
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID}=req.params
    const note=await NoteModel.findOne({_id:noteID})

    
    try {
        if(req.body.userID===note.userID){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.status(200).json({msg:`The note with ID :${noteID} has been Deleted`})

        }else{
            res.status(200).json({msg:"You are not authorised"})
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
})

module.exports={
    noteRouter
}