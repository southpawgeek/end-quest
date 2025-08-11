import { DEFAULT_ACTIONS } from "./constants/game"

// ============================================================================
// GAME CARTRIDGE DATA
// ============================================================================

// Game configuration
const gameConfig = {
  actions: DEFAULT_ACTIONS,
  startingRoom: "start",
  epilogueRoom: "epilogue"
}

// ============================================================================
// ACTION DEFINITIONS
// ============================================================================
// Each actionSet defines what happens when a player performs an action on an interactable
// - description: Shows text to the player
// - nextRoom: Transitions to a different room
// - default: What happens when no specific action is selected

const actionSets = {
  startDoorway: {
    hit: {
      description: [
        "You attempt to hit the emptiness in the doorway. You stumble forward awkwardly.",
      ],
    },
    use: {
      description: [
        "You ponder the infinite ways in which you could use an open doorway.",
      ],
    },
    default: { nextRoom: "foyer" },
  },
  startChair: {
    examine: {
      description: [
        "The chair looks reasonably comfortable, but it's also glistening in a rather unsettling way.",
      ],
    },
    hit: {
      description: ["You slap the chair, and find that it is slimy. Gross!"],
    },
    use: {
      nextRoom: "deathChair",
    },
  },
  startHole: {
    examine: {
      description: [
        "There's a hole in the floor with a rope leading downward. The rope seems fairly secure.",
      ],
    },
    use: { nextRoom: "basement" },
    default: { nextRoom: "basement" },
  },
  exitToStart: {
    default: { nextRoom: "start" },
  },
  foyerPaintings: {
    examine: {
      description: [
        "The smaller painting looks like it was torn up at some point. The larger one is a stylized word: STAY.",
      ],
    },
    hit: {
      description: [
        "You try hitting the paintings, but find they are firmly mounted on the wall.",
      ],
    },
    use: {
      description: [
        "You consider how you might use the paintings, but can't think of anything.",
      ],
    },
  },
  foyerPortrait: {
    examine: {
      description: [
        "The portrait is one of those old-fashioned black paper silhouettes. You can feel its tiny pinprick eyes staring into your soul.",
      ],
    },
    hit: { nextRoom: "deathPainting" },
    use: {
      description: [
        "You admire the skill it must have taken to cut out this silhouette. You try to avoid eye contact, despite it just being a piece of paper.",
      ],
    },
  },
  foyerDoor: {
    examine: {
      description: [
        "Haphazardly nailed into the door frame, you realize there is nothing visible beyond the boards.",
      ],
    },
    use: {
      description: [
        "You make an attempt to pull the boards open as if it were a door. It was not a door.",
      ],
    },
    hit: {
      description: [
        "You try kicking the boards, but they are supernaturally strong and do not budge.",
      ],
    },
    default: {
      description: [
        "You walk straight into the boards, imagining they would somehow let you through. You imagined wrong.",
      ],
    },
  },
  foyerKitchen: {
    examine: { description: ["The kitchen lies beyond this door."] },
    default: { nextRoom: "kitchen" },
  },
  foyerStart: {
    default: { nextRoom: "start" },
  },
  exitToUpstairs: {
    default: { nextRoom: "upstairs" },
  },
  exitToFoyer: {
    default: { nextRoom: "foyer" },
  },
  upstairsBathroom: {
    examine: { description: ["This door leads to the bathroom."] },
    default: { nextRoom: "bathroom" },
  },
  upstairsBirdRoom: {
    examine: {
      description: ["The chirping sound is coming from this room."],
    },
    default: { nextRoom: "birdRoom" },
  },
  upstairsAttic: {
    examine: {
      description: [
        "A few steps lead to a ladder, which goes up to the attic.",
      ],
    },
    default: { nextRoom: "attic" },
  },
  birdRoomCage: {
    examine: {
      description: [
        "A small sparrow furiously hops around the cage. A small plaque on the cage reads 'Beebee'.",
      ],
    },
    use: { nextRoom: "deathBeebee" },
    hit: {
      description: [
        "That wouldn't be very nice. Also, you aren't sure your fingers would survive.",
      ],
    },
  },
  birdRoomCurtains: {
    examine: {
      description: [
        "The drapes are an unappealing green color, and full of dust.",
      ],
    },
    use: {
      description: [
        "You'd close them, but you're concerned the drape runners would not be silent.",
      ],
    },
    hit: {
      description: [
        "You give the drapes a good slap, releasing a cloud of dust.",
      ],
    },
  },
  birdRoomWindow: {
    examine: {
      description: [
        "The window is open, but the light is blinding. You can't see what's outside.",
      ],
    },
    use: {
      description: [
        "You briefly consider crawling out the window, but your gut tells you this would be a very bad idea.",
      ],
    },
    hit: {
      description: [
        "You try to extend your hand through the open window. An unseen force pushes your hand back in.",
      ],
    },
  },
  atticWindow: {
    examine: {
      description: [
        "The light outside is blinding, making it difficult to see anything.",
      ],
    },
    use: {
      description: ["The window is purely decorative, and can't be opened."],
    },
    hit: {
      description: [
        "You punch the window, but the glass is very thick. Your knuckles hurt.",
      ],
    },
  },
  atticRitual: {
    examine: {
      description: [
        "A strange circle is drawn on the floor, with a candle and a few other items strewn around. It looks like some kind of ritual.",
      ],
    },
    use: {
      description: [
        "You're not really sure how to complete the ritual, or what it is for.",
      ],
    },
    hit: {
      nextRoom: "deathRitual",
    },
  },
  bathroomMirror: {
    examine: { description: ["The mirror is painfully cold to the touch."] },
    use: { description: ["Despite everything, it's still you."] },
    hit: { nextRoom: "deathMirror" },
  },
  bathroomToilet: {
    examine: {
      description: ["Yup. That's a toilet. It's relatively clean, at least."],
    },
    use: {
      description: [
        "You feel like you're being watched, so you decide not to use it.",
      ],
    },
    hit: {
      description: ["You gently pat the toilet."],
    },
  },
  bathroomTub: {
    examine: {
      description: [
        "The tub hasn't been used in a long time. You wonder if the hot water still works.",
      ],
    },
    use: { nextRoom: "deathBathtub" },
  },
  bathroomSink: {
    examine: {
      description: ["The sink is bone-dry."],
    },
    use: {
      description: [
        "You turn the faucet, but hear a strange buzzing sound. Nothing comes out.",
      ],
    },
  },
  kitchenFood: {
    examine: {
      description: [
        "The pie looks delicious, as though it were just removed from the nonexistent oven.",
      ],
    },
    use: { nextRoom: "deathFood" },
    hit: {
      description: [
        "You briefly feel a compulsion to strike the pie, but decide against it.",
      ],
    },
  },
  kitchenTable: {
    examine: { description: ["The worn table has seen better days."] },
    use: {
      description: [
        "You're not sure how you would use the table, as its legs are broken.",
      ],
    },
    hit: { description: ["Why hit the table when it's already down?"] },
  },
  kitchenUtensils: {
    examine: {
      description: ["There's a fork, spatula, and spoon mounted on the wall."],
    },
    use: {
      description: [
        "You briefly consider using the fork on the pie, but decide against it. It's covered in dust.",
      ],
    },
    hit: { nextRoom: "deathUtensils" },
  },
  basementBulb: {
    use: { nextRoom: "deathBulb" },
    examine: {
      description: [
        "The bulb is only just barely illuminating, as though it were loose.",
      ],
    },
    hit: { nextRoom: "deathBulb" },
  },
  basementRope: {
    examine: {
      description: ["There's enough rope for you to climb back up."],
    },
    use: {
      nextRoom: "start",
    },
    hit: {
      description: [
        "You channel your inner kitten, playfully swatting at the rope.",
      ],
    },
    default: {
      nextRoom: "start",
    },
  },
  basementHole: {
    examine: { description: ["The hole leads back up to the storage room."] },
    use: { description: ["Perhaps the rope would be of use?"] },
    hit: {
      description: ["You flail your arms upward, but can't quite reach it."],
    },
    default: {
      nextRoom: "start",
    },
  },
  epilogueBeebee: {
    examine: {
      description: [
        "A tiny sparrow is flying away from the house, leaving a shimmering trail behind him. You feel an overwhelming sense of peace, but also a tangible sadness.",
      ],
    },
  },
  epilogueHouse: {
    examine: {
      description: [
        "From a distance, the house seems more lonely than threatening. It looks like you could figure out a way back in, if you really wanted.",
      ],
    },
    use: {
      description: [
        "You wonder if the house is within your budget. Definitely a fixer-upper.",
      ],
    },
    hit: {
      description: [
        "You walk to the boarded-up entryway, and attempt to punch the house in its face.",
      ],
    },
  },
}

// ============================================================================
// ROOM DEFINITIONS
// ============================================================================
// Each room contains:
// - key: Unique identifier for the room
// - name: Display name shown to the player
// - image: Background image file
// - description: Text description of the room
// - exits: Grid coordinates that lead to other rooms
// - interactables: Clickable objects in the room
// - isDeath: Special flag for death rooms

const rooms = {
  // rooms
  start: {
    key: "start",
    name: "Storage Room",
    image: "beginning.png",
    exits: { a2: "foyer", c1: "basement" },
    description: [
      "You don't remember how you got here, but you are in a storage room that is not storing very much. A doorway leads out into the foyer, and a hole descends into a very dark area. A dirty chair sits by the door.",
    ],
    interactables: [
      {
        name: "startChair",
        image: "interactable.png",
        x: 300,
        y: 270,
        width: 60,
        height: 120,
        actions: actionSets.startChair,
      },
      {
        name: "startHole",
        image: "interactable.png",
        x: 120,
        y: 395,
        width: 90,
        height: 80,
        actions: actionSets.startHole,
      },
      {
        name: "startDoor",
        image: "interactable.png",
        x: 190,
        y: 200,
        width: 60,
        height: 120,
        actions: actionSets.startDoorway,
      },
    ],
  },
  foyer: {
    key: "foyer",
    name: "Decrepit Foyer",
    image: "foyer.png",
    exits: {
      a3: "upstairs",
      b2: "kitchen",
      c2: "start",
    },
    description: [
      "Odd-looking pictures hang on the wall. A repetitive chirp drifts down from upstairs. On the main floor, the door before you leads to the kitchen. The entry door is boarded up.",
    ],
    interactables: [
      {
        name: "foyerPaintings",
        image: "interactable.png",
        x: 10,
        y: 15,
        width: 75,
        height: 150,
        actions: actionSets.foyerPaintings,
      },
      {
        name: "foyerPortrait",
        image: "interactable.png",
        x: 180,
        y: 10,
        width: 25,
        height: 65,
        actions: actionSets.foyerPortrait,
      },
      {
        name: "foyerDoor",
        image: "interactable.png",
        x: 435,
        y: 190,
        width: 60,
        height: 250,
        actions: actionSets.foyerDoor,
      },
      {
        name: "foyerKitchen",
        image: "interactable.png",
        x: 250,
        y: 215,
        width: 85,
        height: 130,
        actions: actionSets.foyerKitchen,
      },
      {
        name: "exitToUpstairs",
        image: "interactable.png",
        x: 355,
        y: 0,
        width: 140,
        height: 40,
        actions: actionSets.exitToUpstairs,
      },
      {
        name: "exitToStart",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: actionSets.exitToStart,
      },
    ],
  },
  birdRoom: {
    key: "birdRoom",
    name: "Beebee's Room",
    image: "birdcage.png",
    description: [
      "This room has a bright, open window with a small birdcage on a stand. Inside the cage is the source of the chirping. The bird cautiously watches you.",
    ],
    exits: { c2: "upstairs" },
    interactables: [
      {
        name: "birdRoomWindow",
        x: 95,
        y: 50,
        width: 200,
        height: 180,
        actions: actionSets.birdRoomWindow,
      },
      {
        name: "birdRoomCage",
        x: 205,
        y: 165,
        width: 75,
        height: 120,
        actions: actionSets.birdRoomCage,
      },
      {
        name: "birdRoomCurtainLeft",
        x: 20,
        y: 0,
        width: 65,
        height: 415,
        actions: actionSets.birdRoomCurtains,
      },
      {
        name: "birdRoomCurtainRight",
        x: 295,
        y: 0,
        width: 80,
        height: 410,
        actions: actionSets.birdRoomCurtains,
      },
      {
        name: "exitToUpstairs",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: actionSets.exitToUpstairs,
      },
    ],
  },
  upstairs: {
    key: "upstairs",
    name: "Upstairs Hallway",
    image: "upstairs.png",
    description: [
      "This poorly-lit hallway has several open doorways. A bathroom lies to the west, and an attic entrance to the east. The loud chirps are coming from the room at the end of the hall.",
    ],
    exits: {
      a2: "birdRoom",
      b1: "bathroom",
      b3: "attic",
      c1: "foyer",
    },
    interactables: [
      {
        name: "upstairsBathroom",
        x: 65,
        y: 95,
        width: 60,
        height: 325,
        actions: actionSets.upstairsBathroom,
      },
      {
        name: "upstairsBirdRoom",
        x: 225,
        y: 145,
        width: 50,
        height: 110,
        actions: actionSets.upstairsBirdRoom,
      },
      {
        name: "upstairsAttic",
        x: 385,
        y: 125,
        width: 60,
        height: 350,
        actions: actionSets.upstairsAttic,
      },
      {
        name: "exitToFoyer",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: actionSets.exitToFoyer,
      },
    ],
  },
  kitchen: {
    key: "kitchen",
    name: "Disused Kitchen",
    image: "kitchen.png",
    description: [
      "This looks like it used to be a kitchen. Some utensils are still mounted on the wall, and a broken table rests on the floor. Against all odds, a fragrant cherry pie sits on the floor.",
    ],
    exits: {
      c2: "foyer",
    },
    interactables: [
      {
        name: "kitchenFood",
        x: 250,
        y: 325,
        width: 55,
        height: 30,
        actions: actionSets.kitchenFood,
      },
      {
        name: "kitchenTable",
        x: 95,
        y: 260,
        width: 80,
        height: 125,
        actions: actionSets.kitchenTable,
      },
      {
        name: "kitchenUtensils",
        x: 135,
        y: 85,
        width: 65,
        height: 70,
        actions: actionSets.kitchenUtensils,
      },
      {
        name: "exitToFoyer",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: actionSets.exitToFoyer,
      },
    ],
  },
  basement: {
    key: "basement",
    name: "Musty Basement",
    image: "basement.png",
    description: [
      "The basement is dark, and smells a bit moldy. A bare bulb hangs in the center of the room. Thankfully, there's a rope leading back up.",
    ],
    exits: {
      a1: "start",
    },
    interactables: [
      {
        name: "basementBulb",
        x: 345,
        y: 245,
        width: 40,
        height: 40,
        actions: actionSets.basementBulb,
      },
      {
        name: "basementHole",
        x: 55,
        y: 60,
        width: 135,
        height: 70,
        actions: actionSets.basementHole,
      },
      {
        name: "basementRope",
        x: 145,
        y: 105,
        width: 40,
        height: 230,
        actions: actionSets.basementRope,
      },
    ],
  },
  attic: {
    key: "attic",
    name: "Cramped Attic",
    image: "attic.png",
    description: [
      "The sparse attic is not large enough to stand up in, but has a tiny window. There are some strange looking objects in the corner.",
    ],
    exits: {
      c1: "upstairs",
    },
    interactables: [
      {
        name: "atticWindow",
        x: 200,
        y: 200,
        width: 110,
        height: 110,
        actions: actionSets.atticWindow,
      },
      {
        name: "atticRitual",
        x: 420,
        y: 320,
        width: 60,
        height: 125,
        actions: actionSets.atticRitual,
      },
      {
        name: "exitToUpstairs",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: actionSets.exitToUpstairs,
      },
    ],
  },
  bathroom: {
    key: "bathroom",
    name: "Bathroom",
    image: "bathroom.png",
    description: [
      "The bathroom is unremarkable. There's a bathtub on one side, toilet on the other, and the mirror and sink are in the middle.",
    ],
    exits: {
      b3: "upstairs",
    },
    interactables: [
      {
        name: "bathroomMirror",
        x: 205,
        y: 20,
        width: 100,
        height: 165,
        actions: actionSets.bathroomMirror,
      },
      {
        name: "bathroomSink",
        x: 205,
        y: 205,
        width: 100,
        height: 60,
        actions: actionSets.bathroomSink,
      },
      {
        name: "bathroomToilet",
        x: 345,
        y: 220,
        width: 100,
        height: 145,
        actions: actionSets.bathroomToilet,
      },
      {
        name: "bathroomTub1",
        x: 80,
        y: 225,
        width: 115,
        height: 150,
        actions: actionSets.bathroomTub,
      },
      {
        name: "bathroomTub2",
        x: 30,
        y: 300,
        width: 130,
        height: 150,
        actions: actionSets.bathroomTub,
      },
      {
        name: "exitToUpstairs",
        x: 0,
        y: 455,
        width: 495,
        height: 90,
        actions: actionSets.exitToUpstairs,
      },
    ],
  },
  deathChair: {
    key: "deathChair",
    name: "Have a Seat",
    image: "deathChair.png",
    isDeath: true,
    exits: { b2: "start" },
    description: [
      "As soon as you sit in the chair, disgusting pink tentacles come out of nowhere, enveloping your arms and legs. The acid completely dissolves your flesh and bones.",
    ],
    interactables: [
      {
        name: "exit",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: { default: { nextRoom: "start" } },
      },
    ],
  },
  deathPainting: {
    key: "deathPainting",
    name: "Staring Contest",
    image: "deathPainting.png",
    isDeath: true,
    exits: { b2: "foyer" },
    description: [
      "You take a swipe at the silhouette, but some unseen force stops you. The spirit inhabiting the silhouette has rendered you unable to move or look away. Your body eventually ceases to function.",
    ],
    interactables: [
      {
        name: "exit",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: { default: { nextRoom: "foyer" } },
      },
    ],
  },
  deathBeebee: {
    key: "deathBeebee",
    name: "Meet Beebee",
    image: "deathBeebee.png",
    isDeath: true,
    exits: { b2: "birdRoom" },
    description: [
      "Upon opening the cage, Beebee quickly escapes. You imagine the bird's instinct would be to fly out the window and enjoy his freedom. However, his first course of action is to launch himself at your face, pecking out your eyes.",
    ],
    interactables: [
      {
        name: "exit",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: { default: { nextRoom: "birdRoom" } },
      },
    ],
  },
  deathFood: {
    key: "deathFood",
    name: "Relentless Snacker",
    image: "deathFood.png",
    isDeath: true,
    exits: { b2: "kitchen" },
    description: [
      "You stuff yourself, not questioning the wisdom of eating unattended floor pie. With a mighty rumble, the contents of your stomach begin to expand uncontrollably, tearing you apart from the inside out. The pie has betrayed you. It was delicious, at least.",
    ],
    interactables: [
      {
        name: "exit",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: { default: { nextRoom: "kitchen" } },
      },
    ],
  },
  deathUtensils: {
    key: "deathUtensils",
    name: "Fork in the Road",
    image: "deathUtensils.png",
    isDeath: true,
    exits: { b2: "kitchen" },
    description: [
      "You slap the defenseless utensils, cutting your hand. You bleed profusely, unable to stop the flow. As everything fades to black, you wonder why you are like this.",
    ],
    interactables: [
      {
        name: "exit",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: { default: { nextRoom: "kitchen" } },
      },
    ],
  },
  deathBulb: {
    key: "deathBulb",
    name: "Shed Some Light",
    image: "deathBulb.png",
    isDeath: true,
    exits: { b2: "basement" },
    description: [
      "As soon as you make contact with the bulb, an incredible amount of electricity courses through your body. For a brief moment, you feel like Zeus himself. Ultimately, you are reduced to a charred husk.",
    ],
    interactables: [
      {
        name: "exit",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: { default: { nextRoom: "basement" } },
      },
    ],
  },
  deathRitual: {
    key: "deathRitual",
    name: "Ashes to Ashes",
    image: "deathRitual.png",
    isDeath: true,
    exits: { b2: "attic" },
    description: [
      "You accidentally knock over the candle in the center of the ritual. Fire quickly travels throughout the dry, rotted wood in the attic. You are burnt to a crisp.",
    ],
    interactables: [
      {
        name: "exit",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: { default: { nextRoom: "attic" } },
      },
    ],
  },
  deathBathtub: {
    key: "deathBathtub",
    name: "Squeaky Clean",
    image: "deathBathtub.png",
    isDeath: true,
    exits: { b2: "bathroom" },
    description: [
      "Black water sputters out of the tub spigot. Suddenly, you have the terrible realization that the water was actually a swarm of flesh-eating bugs. Your skeleton is picked clean within seconds.",
    ],
    interactables: [
      {
        name: "exit",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: { default: { nextRoom: "bathroom" } },
      },
    ],
  },
  deathMirror: {
    key: "deathMirror",
    name: "Chill Out",
    image: "deathMirror.png",
    isDeath: true,
    exits: { b2: "bathroom" },
    description: [
      "Inexplicably, you ram your forehead into the mirror. Also inexplicably, behind the mirror was the virtual nothingness of space. Instantly losing consciousness, you are blissfully unaware as the cold vacuum destroys your body.",
    ],
    interactables: [
      {
        name: "exit",
        x: 0,
        y: 455,
        width: 495,
        height: 40,
        actions: { default: { nextRoom: "bathroom" } },
      },
    ],
  },
  // epilogue
  epilogue: {
    key: "epilogue",
    name: "Quest's End",
    image: "epilogue.png",
    exits: { a2: "foyer" },
    description: [
      "You have been unceremoniously ejected from the house, and realize you cannot remember anything that happened... <br/><br/>Thank you for playing!",
    ],
    interactables: [
      {
        name: "epilogueHouse",
        x: 185,
        y: 75,
        width: 115,
        height: 145,
        actions: actionSets.epilogueHouse,
      },
      {
        name: "epilogueBeebee",
        x: 375,
        y: 65,
        width: 30,
        height: 30,
        actions: actionSets.epilogueBeebee,
      },
      {
        name: "exitToFoyer",
        x: 225,
        y: 175,
        width: 25,
        height: 50,
        actions: actionSets.exitToFoyer,
      },
    ],
  },
}

// ============================================================================
// TASK DEFINITIONS
// ============================================================================
// Tasks represent death scenarios that players can discover
// Each task corresponds to a death room and tracks completion

const tasks = [
  {
    key: "deathChair",
    name: "Have a Seat",
  },
  {
    key: "deathBulb",
    name: "Shed Some Light",
  },
  {
    key: "deathPainting",
    name: "Staring Contest",
  },
  {
    key: "deathFood",
    name: "Relentless Snacker",
  },
  {
    key: "deathUtensils",
    name: "Fork in the Road",
  },
  {
    key: "deathRitual",
    name: "Ashes to Ashes",
  },
  {
    key: "deathBathtub",
    name: "Squeaky Clean",
  },
  {
    key: "deathMirror",
    name: "Chill Out",
  },
  {
    key: "deathBeebee",
    name: "Meet Beebee",
  },
]

// ============================================================================
// CARTRIDGE EXPORT
// ============================================================================
// This is the complete game cartridge that gets loaded by the engine

const gameCartridge = {
  config: gameConfig,
  content: {
    actionSets,
    rooms,
    tasks
  }
}

export default gameCartridge
