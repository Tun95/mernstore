import mongoose from "mongoose";

// Define a schema for a single slide within the slider
const SlideSchema = new mongoose.Schema(
  {
    image: String, // Image URL or path
    title: String, // Slide title
    description: String, // Slide description
    category: String,
    hColor: String,
    pColor: String,
    width: String,
    top: String,
    left: String,
    right: String,
    bottom: String,
    textAlign: String,
  },
  { timestamps: true }
);

// Define the schema for the fifth card with a video, title, and description
const VideoCardSchema = new mongoose.Schema({
  videoUrl: String, // Video URL or path
  title: String, // Video title
  description: String, // Video description
  productSlug: String,
  hColor: String,
  pColor: String,
  bColor: String,
});

// Define a schema for the entire CARDS, including multiple slides and the fifth video card
const AnnouncementSchema = new mongoose.Schema({
  sliders: [SlideSchema], // An array of slides directly within AnnouncementSchema
  fifthCard: VideoCardSchema, // The fifth card with video content
});

const Announcement = mongoose.model("Announcement", AnnouncementSchema);
export default Announcement;
