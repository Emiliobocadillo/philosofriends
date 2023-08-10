require("dotenv").config();
const mongoose = require("mongoose");
const Philosophy = require("../models/Philosophy");

// Sample data for all 26 philosophies
const philosophiesData = [
  {
    name: "Taoism/Daoism",
    description:
      "A Chinese philosophy emphasizing harmony with the natural flow of the universe, advocating simplicity, balance, and detachment.",
    icon: "/taoism.png",
  },
  {
    name: "Zen Buddhism",
    description:
      "A branch of Buddhism emphasizing meditation, mindfulness, and direct experience to attain enlightenment and understanding.",
    icon: "/buddha.png",
  },
  {
    name: "Hedonism",
    description:
      "The pursuit of pleasure and avoidance of pain as the highest good, with variations ranging from simple sensory pleasures to more refined and intellectual pursuits.",
    icon: "/wine.png",
  },
  {
    name: "Solipsism",
    description:
      "The belief that only one's own mind is certain to exist, and other minds and external reality are uncertain or may not exist.",
    icon: "/brain.png",
  },
  {
    name: "Stoicism",
    description:
      "A philosophy promoting virtue, self-control, and resilience in the face of challenges, advocating acceptance of things beyond one's control.",
    icon: "/stoic.png",
  },
  {
    name: "Hinduism",
    description:
      "A complex and diverse set of spiritual, religious, and philosophical beliefs originating in India, emphasizing karma, dharma, and the pursuit of self-realization.",
    icon: "/om.png",
  },
  {
    name: "Sufism",
    description:
      "A mystical dimension of Islam focusing on the inner, personal experience of the Divine, often expressed through poetry, music, and meditation.",
    icon: "/whirling-dervish.png",
  },
  {
    name: "Asceticism",
    description:
      "The practice of self-discipline, self-denial, and renunciation of worldly pleasures to achieve spiritual or moral goals.",
    icon: "/meditation.png",
  },
  {
    name: "Existentialism",
    description:
      "A philosophy exploring individual existence, freedom, and responsibility in an often absurd or indifferent universe.",
    icon: "/existentialism.png",
  },
  {
    name: "Nihilism",
    description:
      "The belief that life lacks inherent meaning or value, often leading to existential emptiness and skepticism toward traditional beliefs.",
    icon: "/void.png",
  },
  {
    name: "Utilitarianism",
    description:
      "An ethical theory stating that actions are morally right if they maximize overall happiness or pleasure and minimize suffering.",
    icon: "/balance.png",
  },
  {
    name: "Epicureanism",
    description:
      "A philosophy emphasizing pleasure, tranquility, and simple living as paths to a fulfilling and meaningful life.",
    icon: "/grapes.png",
  },
  {
    name: "Atheism",
    description:
      "The lack of belief or disbelief in deities or gods, often involving critical examination of religious concepts.",
    icon: "/atheism.png",
  },
  {
    name: "Materialism",
    description:
      "The belief that the physical world is the only reality, and everything, including thoughts and emotions, can be explained through material processes.",
    icon: "/atoms.png",
  },
  {
    name: "Pragmatism",
    description:
      "A philosophy focusing on the practical consequences of beliefs, actions, and concepts, valuing their usefulness and effectiveness.",
    icon: "/pragmatism.png",
  },
  {
    name: "Feminism",
    description:
      "A social and political philosophy advocating for women's rights, gender equality, and challenging traditional gender norms.",
    icon: "/feminism.png",
  },
  {
    name: "Transcendentalism",
    description:
      "Emphasizes the inherent goodness of people and nature, advocating for spiritual connection with the universe through intuition and individual experience.",
    icon: "/transcendentalism.png",
  },
  {
    name: "Cynicism",
    description:
      "Rejects social values and norms, advocating for a simpler, self-sufficient way of life while challenging materialism and conventions.",
    icon: "/cynicism.png",
  },
  {
    name: "Confucianism",
    description:
      "Emphasizes ethics, morality, and social harmony, promoting proper conduct, social relationships, and virtue cultivation.",
    icon: "/confucianism.png",
  },
  {
    name: "Rationalism",
    description:
      "Asserts that reason and logic are the primary sources of knowledge and truth, challenging the significance of sensory experience.",
    icon: "/rationalism.png",
  },
  {
    name: "Idealism",
    description:
      "Posits that reality is based on consciousness or mental constructs, suggesting that the mind shapes and interprets the world.",
    icon: "/idealism.png",
  },
  {
    name: "Postmodernism",
    description:
      "Questions objective truth, emphasizing the influence of language, culture, and context on our understanding of reality.",
    icon: "/postmodernism.png",
  },
  {
    name: "Anarchism",
    description:
      "Opposes hierarchical authority, advocating for voluntary cooperation, self-governance, and dismantling oppressive structures.",
    icon: "/anarchy.png",
  },
  {
    name: "Objectivism",
    description:
      "Asserts that objective reality exists independently of human perception, and reason is the only valid means of acquiring knowledge.",
    icon: "/ayn-rand.png",
  },
  {
    name: "Environmentalism",
    description:
      "Emphasizes the importance of protecting and preserving the natural world, advocating for sustainability and raising awareness about ecological issues.",
    icon: "/earth.png",
  },
  {
    name: "Humanism",
    description:
      "Focuses on the inherent dignity and worth of individuals, emphasizing reason, ethics, and compassion while rejecting supernatural beliefs.",
    icon: "/human.png",
  },
];
// database connection
mongoose
  .connect(
    "mongodb+srv://emilhoeeg:test1234@cluster0.y7ha2q0.mongodb.net/philosofriends",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB cloud");

    // Insert philosophies into the database
    Philosophy.insertMany(philosophiesData)
      .then(() => {
        console.log("Philosophies inserted successfully.");
        mongoose.connection.close(); // Close the connection after insertion
      })
      .catch((error) => {
        console.error("Error inserting philosophies:", error);
        mongoose.connection.close(); // Close the connection on error too
      });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
