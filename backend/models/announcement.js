import mongoose from "mongoose";

// Define a schema for a single slide within the slider
const SlideSchema = new mongoose.Schema({
  image: String, // Image URL or path
  title: String, // Slide title
  description: String, // Slide description
});

// Define the schema for the entire slider containing multiple slides
const SliderSchema = new mongoose.Schema({
  slides: [SlideSchema], // An array of slides
});

// Define the schema for the fifth card with a video, title, and description
const VideoCardSchema = new mongoose.Schema({
  videoUrl: String, // Video URL or path
  title: String, // Video title
  description: String, // Video description
});

// Define a schema for the entire CARDS, including multiple sliders and the fifth video card
const AnnouncementSchema = new mongoose.Schema({
  sliders: [SliderSchema], // An array of sliders
  fifthCard: VideoCardSchema, // The fifth card with video content
});

const Announcement = mongoose.model("Announcement", AnnouncementSchema);
export default Announcement;
