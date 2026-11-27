/**
 * Demo content for Prefect Steps Academy.
 * Replace this file when the studio confirms programs, fees, faculty, and contact details.
 * Prices, hours, testimonials, and instructor profiles are samples, not offers or records.
 */

export const NAV = [
  { href: "top", label: "Home" },
  { href: "about", label: "About" },
  { href: "programs", label: "Programs" },
  { href: "schedule", label: "Schedule" },
  { href: "instructors", label: "Instructors" },
  { href: "contact", label: "Contact" },
] as const;

export const PROGRAMS = [
  {
    id: "hip-hop",
    name: "Hip-hop",
    ages: "Ages 13 and up",
    level: "Beginner to advanced",
    description:
      "Grooves, freezes, and musicality. The class spends time on the pocket of the beat before anyone chases a long routine.",
    image: "/media/h.jpg",
    alt: "A dancer holding a freeze on a stage in red light",
  },
  {
    id: "contemporary",
    name: "Contemporary",
    ages: "Ages 14 and up",
    level: "Beginner to advanced",
    description:
      "Weight, floor work, and phrases you can remember. Partnering stays optional until the room is ready for it.",
    image: "/media/p4.jpg",
    alt: "Three dancers holding a shared contemporary phrase in a dark studio",
  },
  {
    id: "bollywood",
    name: "Bollywood",
    ages: "Ages 13 and up",
    level: "Beginner and intermediate",
    description:
      "Expression, rhythm, and group work drawn from film choreography. You learn the story of the phrase, not only the arms.",
    image: "/media/k.jpg",
    alt: "A group performing a unison phrase in matching costumes",
  },
  {
    id: "freestyle",
    name: "Freestyle",
    ages: "Ages 16 and up",
    level: "Intermediate and advanced",
    description:
      "For dancers who already have a style and want a room to test it. Sessions mix tasks, cyphers, and short studies.",
    image: "/media/b.jpg",
    alt: "A dancer balancing on one foot on a city street at night",
  },
  {
    id: "kids",
    name: "Kids dance",
    ages: "Ages 7 to 11",
    level: "First classes",
    description:
      "Counts, shapes, and dancing with other children. The hour stays structured, and parents hear how the class is taught.",
    image: "/media/kids.jpg",
    alt: "A teacher guiding four children through a studio exercise at the barre",
  },
  {
    id: "beginner",
    name: "Beginner dance training",
    ages: "Ages 16 and up",
    level: "New to class",
    description:
      "If you have never taken a class, start here. Shoes, counts, and the first combinations, across more than one style.",
    image: "/media/d.jpg",
    alt: "Adults learning a phrase together in a mirrored studio",
  },
] as const;

export const EXPECTATIONS = [
  {
    title: "A warm-up that belongs to the class",
    body: "The first minutes are already the style you came for, not a generic stretch block.",
  },
  {
    title: "Combinations you can repeat",
    body: "A phrase is taught slowly, then put back under the music before you leave.",
  },
  {
    title: "Room for the way you move",
    body: "Corrections are specific. They do not ask you to look like the person beside you.",
  },
] as const;

export const EXPERIENCE = [
  {
    id: "guidance",
    title: "Teachers who stop the music.",
    body: "When a count is off, the phrase stops. You hear it, try it again, and feel the change in the same class.",
    image: "/media/c.jpg",
    alt: "A contemporary dancer reaching through warm and cool light",
  },
  {
    id: "structure",
    title: "The same room, week after week.",
    body: "Classes build. A combination from this month is still in the body next month, instead of resetting every Saturday.",
    image: "/media/n.jpg",
    alt: "A group rehearsing a phrase together on a studio floor",
  },
  {
    id: "expression",
    title: "Your style stays in the work.",
    body: "Form is taught plainly. The point is a clearer version of how you already move, not a copied finish.",
    image: "/media/e.jpg",
    alt: "A dancer mid-step in front of a blue metal door",
  },
  {
    id: "stage",
    title: "Showing the work when a class is ready.",
    body: "Studio showings happen after a group can hold the piece. They are part of the term, not a trophy wall.",
    image: "/media/p1.jpg",
    alt: "Two dancers in a spotlight on a dark stage",
  },
] as const;

export type Level = "Beginner" | "Intermediate" | "Advanced";

export type ClassSlot = {
  id: string;
  style: string;
  day: string;
  time: string;
  level: Level;
  ages: string;
};

export const CLASSES: ClassSlot[] = [
  { id: "mon-beginner", style: "Beginner dance training", day: "Monday", time: "5:00–6:00 pm", level: "Beginner", ages: "16+" },
  { id: "mon-hiphop", style: "Hip-hop", day: "Monday", time: "6:15–7:30 pm", level: "Intermediate", ages: "14+" },
  { id: "tue-kids", style: "Kids dance", day: "Tuesday", time: "4:30–5:30 pm", level: "Beginner", ages: "7–11" },
  { id: "tue-contemp", style: "Contemporary", day: "Tuesday", time: "6:00–7:15 pm", level: "Intermediate", ages: "14+" },
  { id: "wed-bolly", style: "Bollywood", day: "Wednesday", time: "5:00–6:15 pm", level: "Beginner", ages: "13+" },
  { id: "wed-free", style: "Freestyle", day: "Wednesday", time: "6:30–7:45 pm", level: "Intermediate", ages: "16+" },
  { id: "thu-kids", style: "Kids dance", day: "Thursday", time: "4:30–5:30 pm", level: "Beginner", ages: "7–11" },
  { id: "thu-hiphop", style: "Hip-hop", day: "Thursday", time: "6:00–7:30 pm", level: "Advanced", ages: "16+" },
  { id: "fri-contemp", style: "Contemporary", day: "Friday", time: "5:30–6:45 pm", level: "Beginner", ages: "14+" },
  { id: "sat-kids", style: "Kids dance", day: "Saturday", time: "9:00–10:00 am", level: "Beginner", ages: "7–11" },
  { id: "sat-bolly", style: "Bollywood", day: "Saturday", time: "10:30–11:45 am", level: "Intermediate", ages: "13+" },
  { id: "sat-free", style: "Freestyle", day: "Saturday", time: "12:00–1:15 pm", level: "Advanced", ages: "16+" },
  { id: "sat-beginner", style: "Beginner dance training", day: "Saturday", time: "4:00–5:15 pm", level: "Beginner", ages: "16+" },
  { id: "sun-contemp", style: "Contemporary", day: "Sunday", time: "10:00–11:30 am", level: "Advanced", ages: "16+" },
];

export const STYLES = [
  "Hip-hop",
  "Contemporary",
  "Bollywood",
  "Freestyle",
  "Kids dance",
  "Beginner dance training",
] as const;

export const LEVELS: Level[] = ["Beginner", "Intermediate", "Advanced"];

export const INSTRUCTORS = [
  {
    name: "Mira Sen",
    specialty: "Contemporary",
    image: "/media/c.jpg",
    alt: "Stand-in photograph of a contemporary dancer under warm and cool light",
    bio: "Sample profile. Mira’s classes slow a phrase down, then put the counts back under the music before the hour ends.",
  },
  {
    name: "Arun Desai",
    specialty: "Hip-hop",
    image: "/media/e.jpg",
    alt: "Stand-in photograph of a dancer stepping in front of a blue door",
    bio: "Sample profile. Arun teaches groove before tricks, and spends the last part of class on how the phrase sits in the beat.",
  },
  {
    name: "Leela Kapoor",
    specialty: "Bollywood",
    image: "/media/k.jpg",
    alt: "Stand-in photograph of a group in matching costumes performing together",
    bio: "Sample profile. Leela builds group work from expression and rhythm, and keeps the story of the song visible in the steps.",
  },
  {
    name: "Jonah Ellis",
    specialty: "Freestyle and beginner training",
    image: "/media/p2.jpg",
    alt: "Stand-in photograph of a dancer holding a balance in a studio",
    bio: "Sample profile. Jonah runs freestyle tasks for experienced dancers and the first-class course for people who are new.",
  },
] as const;

export const GALLERY = [
  { src: "/media/p5.jpg", alt: "A breaker on a stage with a crowd seated around the floor", wide: true },
  { src: "/media/c.jpg", alt: "A contemporary dancer reaching across a lit studio", wide: false },
  { src: "/media/p1.jpg", alt: "Two dancers under a single spotlight", wide: true },
  { src: "/media/kids-b.jpg", alt: "A teacher working with children at the barre", wide: false },
  { src: "/media/n.jpg", alt: "Dancers rehearsing a phrase in a line", wide: true },
  { src: "/media/b.jpg", alt: "A dancer balancing on a city street at night", wide: false },
  { src: "/media/h.jpg", alt: "A freeze held in red stage light", wide: true },
  { src: "/media/g.jpg", alt: "A dancer in white turning on a dark stage", wide: false },
] as const;

export const PLANS = [
  {
    name: "Single class",
    price: "₹600",
    detail: "One sample class in a style you want to test.",
    includes: ["A place in one timetable slot", "A note from the teacher on where to begin"],
  },
  {
    name: "Eight classes",
    price: "₹2,400",
    detail: "A sample month of one style, same teacher, same slot.",
    includes: ["Eight classes in four weeks", "The phrase work from that class only"],
  },
  {
    name: "Open month",
    price: "₹3,600",
    detail: "A sample pass for any regular class, if the room has space.",
    includes: ["Any slot on the sample timetable", "One style or several"],
  },
] as const;

export const NOTES = [
  {
    quote:
      "I came in counting out loud. By the fourth class I could hear the phrase without watching my feet the whole time.",
    who: "Sample note, adult beginner",
  },
  {
    quote:
      "The hip-hop class did not rush the groove. We stayed on one section until it felt like music, not a list of moves.",
    who: "Sample note, intermediate student",
  },
  {
    quote:
      "I stayed for the kids’ hour. The teacher told me what they were learning and what to practise at home. That was enough.",
    who: "Sample note, parent",
  },
] as const;

export const FAQS = [
  {
    q: "Do beginners need prior experience?",
    a: "No. Beginner training starts from counts, walking to music, and a short phrase. Tell the form if you have never been in a studio.",
  },
  {
    q: "What age groups can join?",
    a: "The sample kids’ classes are for ages 7 to 11. Other styles on the timetable start around 13 or 16. Adult beginners are expected in the training class.",
  },
  {
    q: "What should students wear?",
    a: "Clothes you can sweat and bend in, and shoes that suit the style. The teacher says what the room uses during the first class. Bare feet are usual in contemporary.",
  },
  {
    q: "Are trial classes available?",
    a: "Yes. Use the trial form on this page. In this demo the form stays on your screen and is not sent to the academy.",
  },
  {
    q: "How can parents enquire about kids’ classes?",
    a: "Add a parent or guardian contact on the form when the student is under 18. The WhatsApp button is ready for the studio number once it is confirmed.",
  },
  {
    q: "How do I find the right dance program?",
    a: "Read the six programs, then filter the sample timetable by style and level. If you are unsure, choose beginner training and say so on the form.",
  },
] as const;

export const HOURS = [
  { day: "Monday to Friday", time: "4:00–9:00 pm" },
  { day: "Saturday", time: "9:00 am–6:00 pm" },
  { day: "Sunday", time: "10:00 am–1:00 pm" },
] as const;

export const STYLE_EVENT = "prefect-style";
export const TIMING_EVENT = "prefect-timing";

/** Replace an empty href with the studio’s real profile. Empty links go to the contact section. */
export const SOCIAL_LINKS = [
  { id: "instagram", label: "Instagram", href: "" },
  { id: "facebook", label: "Facebook", href: "" },
  { id: "youtube", label: "YouTube", href: "" },
  { id: "music", label: "Music", href: "" },
] as const;

export const FOOTER_GROUPS = [
  {
    title: "Explore",
    links: [
      { label: "About the Academy", href: "#about" },
      { label: "Dance Programs", href: "#programs" },
      { label: "Class Schedule", href: "#schedule" },
      { label: "Our Instructors", href: "#instructors" },
      { label: "Gallery", href: "#gallery" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Book a Free Trial", href: "#trial" },
      { label: "Memberships", href: "#pricing" },
      { label: "Kids Programs", href: "#programs" },
      { label: "FAQs", href: "#faq" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", href: "#contact" },
      { label: "WhatsApp Enquiry", href: "#trial" },
      { label: "Instagram", href: "#contact" },
      { label: "YouTube", href: "#contact" },
    ],
  },
] as const;

export const FOOTER_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4";
