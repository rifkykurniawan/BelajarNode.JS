const { request } = require('express');
const express = require('express');
const router = express.Router();

const isBase64 = require("is-base64");
const isBase64Img = require("base64-img");

const{Media} = require("../models")

const fs = require("fs");

/* GET ALL Data Image*/
router.get("/", async (req, res) => { 
  const media = await Media.findAll({ 
    attributes: ["id", "image"], 
  }); 
  const mapedMedia = media.map((m) => { 
    m.image = `${req.get("host")}/${m.image}`; 
    return m; 
  }); 
  return res.json({ 
    status: "success", 
    data: media, 
  }); 
}); 

/* Delete Image */
router.delete("/:id", async (req, res) => { 
  const id = req.params.id; 
  const media = await Media.findByPk(id); 
  if (!media) { 
    return res.status(400).json({ 
      status: "error", message: "media not found" 
    }); 
  } 
  fs.unlink(`./public/${media.image}`, async (err) => { 
    if (err) { 
      return res.status(400).json({ status: "error", message: err.message }); 
    } 

    await media.destroy(); 
    return res.json({ 
      status: "Success", 
      message: "image deleted", 
    }); 
  }); 
  
});

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
