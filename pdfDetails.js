const mongoose = require("mongoose");

const PdfDetailsSchema = new mongoose.Schema({
  title: String,
  pdf: {
    data: Buffer,
    contentType: String
  }
}, { collection: "PdfDetails" });

mongoose.model("PdfDetails", PdfDetailsSchema);