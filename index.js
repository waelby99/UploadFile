const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/files", express.static("files"));
//mongodb connection----------------------------------------------
const mongoUrl ="mongodb://127.0.0.1:27017/fileUpload"
 
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
//multer------------------------------------------------------------
const multer = require("multer");

const storage = multer.memoryStorage();


require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ status: "error", message: "No file uploaded" });
      }
  
      const newPdf = new PdfSchema({
        title: req.body.title,
        pdf: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        }
      });
      
      const savedPdf = await newPdf.save();
      res.json({ status: "ok", fileId: savedPdf._id });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ status: "error", message: error.message });
    }
  });

app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {    res.status(500).json({ status: "error", message: error.message });
}
});
app.get("/view-pdf/:id", async (req, res) => {
  try {
    const file = await PdfSchema.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ status: "error", message: "PDF not found" });
    }

    // Convert buffer to Buffer if it's not already
    const pdfBuffer = Buffer.from(file.pdf.data);
    
    // Set headers for PDF viewing in browser
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
      'Content-Disposition': 'inline' // This will make it display in browser
    });
    
    // Send the PDF data as a buffer
    res.send(pdfBuffer);
  } catch (error) {
    console.error("View PDF error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});
// Add this new endpoint before the app.listen line
app.get("/download/:id", async (req, res) => {
  try {
    const file = await PdfSchema.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ status: "error", message: "PDF not found" });
    }
    
    // Convert buffer to Buffer if it's not already
    const pdfBuffer = Buffer.from(file.pdf.data);
    
    // Set headers for file download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${file.title}.pdf"`,
      'Content-Length': pdfBuffer.length
    });
    
    // Send the PDF data as a buffer
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});
//apis----------------------------------------------------------------
app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

app.listen(5000, () => {
  console.log("Server Started");
});