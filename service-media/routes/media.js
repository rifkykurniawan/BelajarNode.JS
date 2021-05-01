const { request } = require('express');
const express = require('express');
const router = express.Router();

const isBase64 = require("is-base64");
const isBase64Img = require("base64-img");

const{Media} = require("../models")

/* Upload Image. */
router.post("/", (req, res) => {
  const image = req.body.image;

  if (!isBase64(image, { mimeRequired: true })) {
    res.status(400).json({ status: "error", message: "invalid base64 image" });
  }
  
  isBase64Img.img(image, "./public/images", Date.now(), async(err,filepath) => {
    
    if(err){
      return res.status(400).json({status:"Error",message:err.message});
    }
    
    const filename = filepath.split("\\").pop().split("/").pop(); //windows

    const media = await Media.create({ image: `images/${filename}` });
    
    return res.json({
      status:"success",
      data:{
        id:media.id,
        image:`${req.get("host")}/images/${filename}`,
      }
    });
    
  });
  
  //return res.send("Sesuai dengan base64");
  
});

module.exports = router;
