import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import JamEvent from "../models/JamEvent.js";
import JoinRequest from "../models/JoinRequest.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/jam-together";

const availableInstruments = [
  "Vocals",
  "Guitar",
  "Bass",
  "Drums",
  "Piano",
  "Keyboard",
  "Saxophone",
  "Trumpet",
  "Violin",
  "Cello",
  "Flute",
  "Clarinet",
  "Trombone",
  "Harmonica",
  "Ukulele",
  "Banjo",
  "Mandolin",
  "Accordion",
  "Synthesizer",
  "DJ Controller",
];

const genreInstruments = {
  jazz: [
    "piano",
    "saxophone",
    "trumpet",
    "bass",
    "drums",
    "guitar",
    "vocals",
    "trombone",
    "clarinet",
  ],
  rock: ["guitar", "bass", "drums", "vocals", "keyboard", "harmonica"],
  blues: [
    "guitar",
    "harmonica",
    "piano",
    "vocals",
    "bass",
    "drums",
    "saxophone",
  ],
  electronic: [
    "synthesizer",
    "keyboard",
    "sampler",
    "turntables",
    "dj controller",
    "electronic drums",
  ],
  classical: [
    "violin",
    "viola",
    "cello",
    "piano",
    "flute",
    "oboe",
    "trumpet",
    "trombone",
    "harp",
  ],
  folk: [
    "guitar",
    "banjo",
    "mandolin",
    "ukulele",
    "vocals",
    "harmonica",
    "violin",
  ],
  funk: [
    "bass",
    "drums",
    "keyboard",
    "guitar",
    "saxophone",
    "trumpet",
    "vocals",
  ],
  metal: ["guitar", "bass", "drums", "vocals", "keyboard"],
  pop: ["vocals", "guitar", "keyboard", "bass", "drums", "synthesizer"],
  country: [
    "guitar",
    "banjo",
    "mandolin",
    "ukulele",
    "vocals",
    "harmonica",
    "violin",
  ],
  hiphop: ["vocals", "guitar", "keyboard", "bass", "drums", "synthesizer"],
  reggae: [
    "guitar",
    "banjo",
    "mandolin",
    "ukulele",
    "vocals",
    "harmonica",
    "violin",
  ],
  soul: ["vocals", "guitar", "keyboard", "bass", "drums", "synthesizer"],
  punk: ["guitar", "bass", "drums", "vocals", "keyboard"],
  alternative: ["guitar", "bass", "drums", "vocals", "keyboard"],
};

const cities = [
  {
    city: "Tel Aviv",
    country: "Israel",
    addresses: [
      "Rothschild Boulevard 12",
      "Dizengoff Street 45",
      "Allenby Street 23",
      "Ben Yehuda Street 67",
    ],
  },
  {
    city: "Jerusalem",
    country: "Israel",
    addresses: [
      "King George Street 8",
      "Jaffa Road 34",
      "Ben Yehuda Street 19",
      "Mamilla Mall",
    ],
  },
  {
    city: "Haifa",
    country: "Israel",
    addresses: [
      "Wadi Nisnas 15",
      "German Colony 22",
      "Carmel Center 9",
      "Port Area 41",
    ],
  },
  {
    city: "Beer Sheva",
    country: "Israel",
    addresses: [
      "Rager Boulevard 6",
      "Old City 33",
      "University Campus 12",
      "Central Station 7",
    ],
  },
  {
    city: "Eilat",
    country: "Israel",
    addresses: [
      "North Beach 18",
      "Marina 25",
      "Coral Beach 14",
      "City Center 31",
    ],
  },
  {
    city: "Ashdod",
    country: "Israel",
    addresses: [
      "Marina Area 29",
      "City Center 16",
      "Industrial Zone 43",
      "Beach Front 11",
    ],
  },
  {
    city: "Rishon LeZion",
    country: "Israel",
    addresses: [
      "Rothschild Street 27",
      "City Center 38",
      "Industrial Area 52",
      "Superland 9",
    ],
  },
  {
    city: "Netanya",
    country: "Israel",
    addresses: [
      "Independence Square 13",
      "Beach Promenade 44",
      "City Center 28",
      "Industrial Zone 17",
    ],
  },
  {
    city: "Petah Tikva",
    country: "Israel",
    addresses: [
      "Rothschild Street 35",
      "City Hall Square 21",
      "Industrial Area 49",
      "Central Park 8",
    ],
  },
  {
    city: "Holon",
    country: "Israel",
    addresses: [
      "Sokolov Street 24",
      "City Center 37",
      "Industrial Zone 15",
      "Park Area 42",
    ],
  },
  {
    city: "Bnei Brak",
    country: "Israel",
    addresses: [
      "Rabbi Akiva Street 18",
      "Jerusalem Road 31",
      "Industrial Area 26",
      "City Center 14",
    ],
  },
  {
    city: "Ramat Gan",
    country: "Israel",
    addresses: [
      "Diamond Exchange 39",
      "City Center 22",
      "Park Area 16",
      "Business District 33",
    ],
  },
  {
    city: "Ashkelon",
    country: "Israel",
    addresses: [
      "Marina 27",
      "City Center 41",
      "Beach Area 19",
      "Industrial Zone 36",
    ],
  },
  {
    city: "Rehovot",
    country: "Israel",
    addresses: [
      "Weizmann Institute 45",
      "City Center 23",
      "Industrial Area 38",
      "Science Park 12",
    ],
  },
  {
    city: "Bat Yam",
    country: "Israel",
    addresses: [
      "Beach Promenade 32",
      "City Center 17",
      "Kikar Batya 28",
      "Marina Area 44",
    ],
  },
  {
    city: "Kfar Saba",
    country: "Israel",
    addresses: [
      "City Center 29",
      "Industrial Zone 16",
      "Park Area 41",
      "Commercial District 25",
    ],
  },
  {
    city: "New York",
    country: "USA",
    addresses: [
      "Broadway 123",
      "Greenwich Village 45",
      "SoHo 67",
      "Brooklyn Heights 89",
    ],
  },
  {
    city: "Los Angeles",
    country: "USA",
    addresses: [
      "Sunset Boulevard 234",
      "Hollywood 56",
      "Santa Monica 78",
      "Venice Beach 90",
    ],
  },
  {
    city: "London",
    country: "UK",
    addresses: [
      "Camden Market 12",
      "Notting Hill 34",
      "Shoreditch 56",
      "Kings Cross 78",
    ],
  },
  {
    city: "Berlin",
    country: "Germany",
    addresses: [
      "Kreuzberg 23",
      "Mitte 45",
      "Prenzlauer Berg 67",
      "Friedrichshain 89",
    ],
  },
  {
    city: "Paris",
    country: "France",
    addresses: [
      "Montmartre 34",
      "Latin Quarter 56",
      "Marais 78",
      "Belleville 90",
    ],
  },
  {
    city: "Tokyo",
    country: "Japan",
    addresses: ["Shibuya 45", "Harajuku 67", "Shinjuku 89", "Akihabara 12"],
  },
  {
    city: "Sydney",
    country: "Australia",
    addresses: ["Kings Cross 56", "Newtown 78", "Bondi 90", "Surry Hills 23"],
  },
  {
    city: "Toronto",
    country: "Canada",
    addresses: [
      "Queen Street West 34",
      "Kensington Market 56",
      "Distillery District 78",
      "Junction 90",
    ],
  },
];

const userData = [
  {
    username: "admin",
    email: "admin@jamtogether.com",
    fullName: "Admin User",
    role: "admin",
    password: "admin123",
    instruments: [
      { instrument: "piano", experienceInYears: 15 },
      { instrument: "guitar", experienceInYears: 10 },
    ],
    bio: "Platform administrator and experienced musician",
    country: "Israel",
    city: "Tel Aviv",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108755-2616c352ca23?w=400",
  },
  {
    username: "jazzmaven",
    email: "sarah.jazz@example.com",
    fullName: "Sarah Cohen",
    instruments: [
      { instrument: "saxophone", experienceInYears: 12 },
      { instrument: "clarinet", experienceInYears: 8 },
    ],
    bio: "Professional jazz saxophonist based in Tel Aviv. Love late night sessions and bebop.",
    country: "Israel",
    city: "Tel Aviv",
    profilePicture:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
  {
    username: "rockdrummer",
    email: "mike.drums@example.com",
    fullName: "Mike Rosenberg",
    instruments: [
      { instrument: "drums", experienceInYears: 18 },
      { instrument: "congas", experienceInYears: 5 },
    ],
    bio: "Hard hitting drummer available for rock and metal sessions. Jerusalem based.",
    country: "Israel",
    city: "Jerusalem",
    profilePicture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    username: "pianovibe",
    email: "anna.piano@example.com",
    fullName: "Anna Goldstein",
    instruments: [
      { instrument: "piano", experienceInYears: 22 },
      { instrument: "keyboard", experienceInYears: 15 },
      { instrument: "vocals", experienceInYears: 12 },
    ],
    bio: "Classically trained pianist exploring jazz and fusion. Available for duo/trio work.",
    country: "Israel",
    city: "Haifa",
    profilePicture:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400",
  },
  {
    username: "basslines",
    email: "david.bass@example.com",
    fullName: "David Levy",
    instruments: [
      { instrument: "bass", experienceInYears: 14 },
      { instrument: "vocals", experienceInYears: 6 },
    ],
    bio: "Groove-focused bass player. Love funk, jazz, and everything with a good pocket.",
    country: "Israel",
    city: "Beer Sheva",
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
  {
    username: "violinstring",
    email: "emma.violin@example.com",
    fullName: "Emma Katz",
    instruments: [
      { instrument: "violin", experienceInYears: 25 },
      { instrument: "viola", experienceInYears: 8 },
    ],
    bio: "Classically trained violinist open to crossover projects and world music.",
    country: "Israel",
    city: "Eilat",
    profilePicture:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400",
  },
  {
    username: "bluesguitar",
    email: "james.blues@example.com",
    fullName: "James Sullivan",
    instruments: [
      { instrument: "guitar", experienceInYears: 16 },
      { instrument: "harmonica", experienceInYears: 10 },
    ],
    bio: "Blues guitarist with a passion for authentic Chicago and Delta blues.",
    country: "USA",
    city: "New York",
    profilePicture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  },
  {
    username: "soulvoice",
    email: "lisa.vocals@example.com",
    fullName: "Lisa Martinez",
    instruments: [
      { instrument: "vocals", experienceInYears: 11 },
      { instrument: "piano", experienceInYears: 7 },
    ],
    bio: "Versatile vocalist comfortable with soul, R&B, jazz, and pop genres.",
    country: "USA",
    city: "Los Angeles",
    profilePicture:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400",
  },
  {
    username: "hornking",
    email: "robert.trumpet@example.com",
    fullName: "Robert Davis",
    instruments: [
      { instrument: "trumpet", experienceInYears: 19 },
      { instrument: "trombone", experienceInYears: 12 },
    ],
    bio: "Professional brass player specializing in jazz, latin, and classical music.",
    country: "UK",
    city: "London",
    profilePicture:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
  },
  {
    username: "synthwave80s",
    email: "alex.synth@example.com",
    fullName: "Alex Weber",
    instruments: [
      { instrument: "synthesizer", experienceInYears: 9 },
      { instrument: "keyboard", experienceInYears: 13 },
      { instrument: "sampler", experienceInYears: 6 },
    ],
    bio: "Electronic music producer and synthesizer enthusiast. Love retro and modern sounds.",
    country: "Germany",
    city: "Berlin",
    profilePicture:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400",
  },
  {
    username: "folkstory",
    email: "maria.folk@example.com",
    fullName: "Maria Dubois",
    instruments: [
      { instrument: "guitar", experienceInYears: 8 },
      { instrument: "vocals", experienceInYears: 12 },
      { instrument: "banjo", experienceInYears: 4 },
    ],
    bio: "Folk singer-songwriter passionate about storytelling and acoustic music.",
    country: "France",
    city: "Paris",
    profilePicture:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
  },
  {
    username: "cellosolo",
    email: "yuki.cello@example.com",
    fullName: "Yuki Tanaka",
    instruments: [
      { instrument: "cello", experienceInYears: 17 },
      { instrument: "piano", experienceInYears: 20 },
    ],
    bio: "Classical cellist interested in chamber music and contemporary compositions.",
    country: "Japan",
    city: "Tokyo",
    profilePicture:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400",
  },
  {
    username: "percussionist",
    email: "carlos.perc@example.com",
    fullName: "Carlos Rodriguez",
    instruments: [
      { instrument: "congas", experienceInYears: 15 },
      { instrument: "djembe", experienceInYears: 12 },
      { instrument: "bongos", experienceInYears: 10 },
    ],
    bio: "Latin percussion specialist. Love salsa, jazz, and world music collaborations.",
    country: "Israel",
    city: "Ashdod",
    profilePicture:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
  },
  {
    username: "flutemely",
    email: "melody.flute@example.com",
    fullName: "Melody Thompson",
    instruments: [
      { instrument: "flute", experienceInYears: 14 },
      { instrument: "vocals", experienceInYears: 9 },
    ],
    bio: "Flutist with experience in classical, jazz, and world music traditions.",
    country: "Australia",
    city: "Sydney",
    profilePicture:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400",
  },
  {
    username: "bassheavy",
    email: "anton.bass@example.com",
    fullName: "Anton Petrov",
    instruments: [
      { instrument: "bass", experienceInYears: 11 },
      { instrument: "guitar", experienceInYears: 8 },
    ],
    bio: "Bass player focused on groove and rhythm. Available for rock, funk, and jazz.",
    country: "Israel",
    city: "Rishon LeZion",
    profilePicture:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400",
  },
  {
    username: "mandolinman",
    email: "giuseppe.mando@example.com",
    fullName: "Giuseppe Romano",
    instruments: [
      { instrument: "mandolin", experienceInYears: 13 },
      { instrument: "guitar", experienceInYears: 18 },
    ],
    bio: "Traditional and contemporary mandolin player. Love bluegrass and folk.",
    country: "Israel",
    city: "Netanya",
    profilePicture:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
  },
  {
    username: "organmaster",
    email: "benjamin.organ@example.com",
    fullName: "Benjamin Clark",
    instruments: [
      { instrument: "organ", experienceInYears: 16 },
      { instrument: "piano", experienceInYears: 23 },
    ],
    bio: "Hammond organ specialist. Love gospel, blues, and progressive rock.",
    country: "Canada",
    city: "Toronto",
    profilePicture:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400",
  },
  {
    username: "ukulelewave",
    email: "sophie.uke@example.com",
    fullName: "Sophie Green",
    instruments: [
      { instrument: "ukulele", experienceInYears: 6 },
      { instrument: "vocals", experienceInYears: 10 },
    ],
    bio: "Ukulele player bringing island vibes to indie and folk music.",
    country: "Israel",
    city: "Petah Tikva",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108755-2616c352ca23?w=400",
  },
  {
    username: "accordionair",
    email: "pierre.accordion@example.com",
    fullName: "Pierre Blanc",
    instruments: [
      { instrument: "accordion", experienceInYears: 20 },
      { instrument: "piano", experienceInYears: 17 },
    ],
    bio: "Accordion player specializing in folk, tango, and world music.",
    country: "Israel",
    city: "Holon",
    profilePicture:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
  },
  {
    username: "djturntable",
    email: "omar.dj@example.com",
    fullName: "Omar Hassan",
    instruments: [
      { instrument: "turntables", experienceInYears: 7 },
      { instrument: "dj controller", experienceInYears: 5 },
      { instrument: "sampler", experienceInYears: 4 },
    ],
    bio: "DJ and electronic music producer. Love mixing genres and live performances.",
    country: "Israel",
    city: "Bnei Brak",
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
  {
    username: "harpangel",
    email: "grace.harp@example.com",
    fullName: "Grace O'Connor",
    instruments: [
      { instrument: "harp", experienceInYears: 19 },
      { instrument: "piano", experienceInYears: 15 },
    ],
    bio: "Classical and Celtic harpist open to fusion and contemporary projects.",
    country: "Israel",
    city: "Ramat Gan",
    profilePicture:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
  },
];

const eventTemplates = [
  {
    titles: [
      "Sunday Jazz Brunch Session",
      "Weekly Jazz Jam",
      "Bebop & Beyond Evening",
      "Late Night Jazz Café",
      "Smooth Jazz Sunday",
    ],
    content:
      "Relaxed jazz session perfect for improvisation and standard repertoire. Looking for rhythm section and horn players.",
    genres: ["jazz", "blues", "soul"],
  },
  {
    titles: [
      "Rock Jam Night",
      "Electric Blues Session",
      "Heavy Rock Meetup",
      "Alternative Rock Jam",
      "Indie Rock Evening",
    ],
    content:
      "High energy rock session. Bring your amps and let's make some noise! All skill levels welcome.",
    genres: ["rock", "blues", "alternative", "punk"],
  },
  {
    titles: [
      "Classical Chamber Music",
      "String Quartet Evening",
      "Classical Recital Prep",
      "Baroque Music Session",
      "Contemporary Classical",
    ],
    content:
      "Serious classical music session for experienced players. Focus on chamber music repertoire.",
    genres: ["classical"],
  },
  {
    titles: [
      "Electronic Music Lab",
      "Synthesizer Workshop",
      "EDM Production Session",
      "Ambient Soundscapes",
      "Techno Jam Night",
    ],
    content:
      "Electronic music creation and experimentation. Bring your gear and let's explore new sounds.",
    genres: ["electronic", "alternative"],
  },
  {
    titles: [
      "Folk Music Circle",
      "Acoustic Songwriters",
      "Traditional Folk Session",
      "Singer-Songwriter Night",
      "Indie Folk Jam",
    ],
    content:
      "Intimate acoustic session focused on songwriting and traditional folk music.",
    genres: ["folk", "country"],
  },
  {
    titles: [
      "Funk & Soul Night",
      "Groove Session",
      "R&B Jam",
      "Disco Revival",
      "Neo-Soul Evening",
    ],
    content:
      "All about the groove! Looking for tight rhythm section and soulful vocalists.",
    genres: ["funk", "soul", "hip-hop"],
  },
  {
    titles: [
      "World Music Fusion",
      "Latin Jazz Session",
      "Celtic Music Night",
      "Middle Eastern Fusion",
      "African Percussion Circle",
    ],
    content:
      "Exploring world music traditions and fusion possibilities. Bring diverse instruments!",
    genres: ["reggae", "jazz"],
  },
  {
    titles: [
      "Metal Mayhem",
      "Progressive Metal Session",
      "Death Metal Practice",
      "Heavy Metal Classic",
      "Doom Metal Evening",
    ],
    content:
      "Heavy and intense session for serious metal musicians. High volume and high energy!",
    genres: ["metal"],
  },
  {
    titles: [
      "Pop Music Workshop",
      "Indie Pop Session",
      "Contemporary Pop Jam",
      "Retro Pop Revival",
      "Electro-Pop Night",
    ],
    content:
      "Modern pop music session with focus on catchy melodies and contemporary sounds.",
    genres: ["pop", "electronic"],
  },
  {
    titles: [
      "Blues Heritage Night",
      "Chicago Blues Session",
      "Delta Blues Acoustic",
      "Electric Blues Jam",
      "Country Blues Evening",
    ],
    content:
      "Authentic blues session honoring the tradition while exploring modern interpretations.",
    genres: ["blues", "country"],
  },
];

const requestMessages = [
  "Hey! I'd love to join this session. My experience with {instrument} should be a great fit for this {genre} project!",
  "Hi there! Been playing {instrument} for {experience} years and this looks like exactly the kind of {genre} session I've been looking for.",
  "Would love to contribute to this {genre} session with my {instrument} skills. I'm available and excited to jam!",
  "This {genre} session sounds amazing! I've been playing {instrument} for {experience} years and would love to be part of it.",
  "Perfect timing! I'm a {instrument} player with {experience} years of experience, especially in {genre} music.",
  "Hi! Your {genre} session caught my attention. I play {instrument} and think I could add something special to the group.",
  "I'm really excited about this {genre} project! My {instrument} background would complement the other musicians perfectly.",
  "This looks like a great {genre} opportunity! I've been playing {instrument} for years and love this style of music.",
  "Would love to join! My {instrument} experience and passion for {genre} music would be a great addition.",
  "I play {instrument} and would love to be part of this {genre} session!",
  "Count me in! I'm a dedicated {instrument} player with strong {genre} influences in my playing style.",
  "I'm a dedicated {instrument} player with strong {genre} influences in my playing style.",
];

const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];
const getRandomElements = (array, min, max) => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getFutureDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

const getPastDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

const getRandomBirthDate = () => {
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const seventyYearsAgo = new Date(
    today.getFullYear() - 70,
    today.getMonth(),
    today.getDate()
  );

  const randomTime =
    seventyYearsAgo.getTime() +
    Math.random() * (eighteenYearsAgo.getTime() - seventyYearsAgo.getTime());
  return new Date(randomTime);
};

const createJoinRequestMessage = (instrument, experience, genre) => {
  const template = getRandomElement(requestMessages);
  return template
    .replace(/\{instrument\}/g, instrument)
    .replace(/\{experience\}/g, experience)
    .replace(/\{genre\}/g, genre);
};

async function createUsers() {
  console.log("Creating users...");
  const users = [];

  for (const user of userData) {
    const password = user.password || "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      passwordHash: hashedPassword,
      role: user.role || "user",
      instruments: user.instruments,
      bio: user.bio,
      country: user.country,
      city: user.city,
      profilePicture: user.profilePicture,
      birthDate: getRandomBirthDate(),
    });

    const savedUser = await newUser.save();
    users.push(savedUser);
    console.log(`Created user: ${savedUser.username}`);
  }

  return users;
}

async function createJamEvents(users) {
  console.log("Creating jam events...");
  const eventsData = [];
  let israelEventCount = 0;
  let pastEventCount = 0;

  for (let i = 0; i < 30; i++) {
    const template = getRandomElement(eventTemplates);
    const location = getRandomElement(cities);

    let selectedLocation = location;
    if (
      israelEventCount < 15 &&
      (location.country !== "Israel" || Math.random() < 0.7)
    ) {
      selectedLocation = getRandomElement(
        cities.filter((c) => c.country === "Israel")
      );
    }
    if (selectedLocation.country === "Israel") {
      israelEventCount++;
    }

    let scheduledDate;
    if (pastEventCount < 3 && (i >= 27 || Math.random() < 0.1)) {
      scheduledDate = getPastDate(getRandomInt(1, 30));
      pastEventCount++;
    } else {
      scheduledDate = getFutureDate(getRandomInt(1, 90));
    }

    const creator = getRandomElement(users);
    const primaryGenre = getRandomElement(template.genres);
    const eventGenres = getRandomElements(template.genres, 1, 3);

    const possibleInstruments =
      genreInstruments[primaryGenre] || availableInstruments;
    const eventInstruments = getRandomElements(possibleInstruments, 3, 10).map(
      (instrument) => ({
        instrument,
        playedBy: null,
        requestId: null,
      })
    );

    const eventData = {
      createdBy: creator._id,
      title: getRandomElement(template.titles),
      content: template.content,
      genres: eventGenres,
      location: {
        country: selectedLocation.country,
        city: selectedLocation.city,
        address: getRandomElement(selectedLocation.addresses),
      },
      scheduledTo: scheduledDate,
      likes: getRandomElements(users, 0, 8).map((user) => user._id),
      instruments: eventInstruments,
      createdAt: new Date(),
      editedAt: new Date(),
    };

    eventsData.push(eventData);
    console.log(
      `Prepared event: ${eventData.title} in ${selectedLocation.city}, ${selectedLocation.country} - ${scheduledDate < new Date() ? "PAST" : "FUTURE"}`
    );
  }

  const events = await JamEvent.insertMany(eventsData, {
    ordered: false,
    rawResult: false,
  });
  console.log(
    `Created ${israelEventCount} events in Israel and ${pastEventCount} past events`
  );
  return events;
}

async function createJoinRequests(users, events) {
  console.log("Creating join requests...");
  const joinRequests = [];

  for (const event of events) {
    const targetRequestsPerEvent = getRandomInt(5, 10);

    const potentialRequesters = users.filter(
      (user) => !user._id.equals(event.createdBy)
    );

    const shuffledRequesters = [...potentialRequesters].sort(
      () => 0.5 - Math.random()
    );

    let pendingCount = 0;
    let approvedCount = 0;
    let rejectedCount = 0;
    let actualRequestsCreated = 0;

    const targetPending = getRandomInt(2, 5);
    const targetApproved = getRandomInt(2, 3);
    const targetRejected = getRandomInt(2, 3);

    for (
      let i = 0;
      i < shuffledRequesters.length &&
      actualRequestsCreated < targetRequestsPerEvent;
      i++
    ) {
      const requester = shuffledRequesters[i];
      const primaryGenre = event.genres[0];

      const userInstruments = requester.instruments.map((inst) =>
        inst.instrument.toLowerCase()
      );

      const availableEventInstruments = event.instruments.map((inst) =>
        inst.instrument.toLowerCase()
      );

      const userCanPlayForEvent = userInstruments.filter((userInst) =>
        availableEventInstruments.includes(userInst)
      );

      if (userCanPlayForEvent.length === 0) {
        continue;
      }

      const requestedInstrument = getRandomElement(userCanPlayForEvent);

      const userInstrumentData = requester.instruments.find(
        (inst) =>
          inst.instrument.toLowerCase() === requestedInstrument.toLowerCase()
      );
      const experienceYears = userInstrumentData
        ? userInstrumentData.experienceInYears
        : getRandomInt(1, 35);

      let approvalStatus = null;
      if (
        pendingCount < targetPending &&
        approvedCount >= targetApproved &&
        rejectedCount >= targetRejected
      ) {
        approvalStatus = null;
        pendingCount++;
      } else if (approvedCount < targetApproved && Math.random() < 0.4) {
        approvalStatus = true;
        approvedCount++;
      } else if (rejectedCount < targetRejected && Math.random() < 0.3) {
        approvalStatus = false;
        rejectedCount++;
      } else {
        approvalStatus = null;
        pendingCount++;
      }

      const newRequest = new JoinRequest({
        jamEvent: event._id,
        requester: requester._id,
        content: createJoinRequestMessage(
          requestedInstrument,
          experienceYears,
          primaryGenre
        ),
        instrument: {
          instrument: requestedInstrument,
          experienceInYears: experienceYears,
        },
        approvalStatus,
      });

      const savedRequest = await newRequest.save();
      joinRequests.push(savedRequest);
      actualRequestsCreated++;

      if (approvalStatus === true) {
        const instrumentIndex = event.instruments.findIndex(
          (inst) =>
            inst.instrument.toLowerCase() ===
              requestedInstrument.toLowerCase() && !inst.playedBy
        );

        if (instrumentIndex > -1) {
          event.instruments[instrumentIndex].playedBy = requester._id;
          event.instruments[instrumentIndex].requestId = savedRequest._id;
          await event.save();
        }
      }
    }

    console.log(
      `Created ${actualRequestsCreated} requests for ${event.title} (${approvedCount} approved, ${rejectedCount} rejected, ${pendingCount} pending)`
    );
  }

  return joinRequests;
}

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    console.log("🧹 Clearing existing data...");
    await JoinRequest.deleteMany({});
    await JamEvent.deleteMany({});
    await User.deleteMany({});
    console.log("✅ Existing data cleared");

    const users = await createUsers();
    console.log(`✅ Created ${users.length} users`);

    const events = await createJamEvents(users);
    console.log(`✅ Created ${events.length} jam events`);

    const joinRequests = await createJoinRequests(users, events);
    console.log(`✅ Created ${joinRequests.length} join requests`);

    console.log("\n📊 SEEDING SUMMARY:");
    console.log(`👥 Users: ${users.length} (including 1 admin)`);
    console.log(
      `🎵 Events: ${events.length} (${events.filter((e) => e.location.country === "Israel").length} in Israel)`
    );
    console.log(`📝 Join Requests: ${joinRequests.length}`);
    console.log(
      `   - Pending: ${joinRequests.filter((r) => r.approvalStatus === null).length}`
    );
    console.log(
      `   - Approved: ${joinRequests.filter((r) => r.approvalStatus === true).length}`
    );
    console.log(
      `   - Rejected: ${joinRequests.filter((r) => r.approvalStatus === false).length}`
    );

    console.log("\n🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("👋 Disconnected from MongoDB");
  }
}

seedDatabase()
  .then(() => {
    console.log("✅ Seeding process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding process failed:", error);
    process.exit(1);
  });

export default seedDatabase;
