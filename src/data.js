// actions that will show up in the actions list
// do not add default here
// also, "leave" is a special action and does not go here
const actions = ["examine", "use", "hit"]

// stuff that happens when each action occurs
// description will just render a description
// nextRoom will cause the action to change the room
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

// contains room descriptions, exits, and connects grid locations with actions
// first room should be called "start"
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
        x: 345,
        y: 250,
        width: 55,
        height: 110,
        actions: actionSets.startChair,
      },
    ],
    actions: {
      // doorway
      c5: actionSets.startDoorway,
      c6: actionSets.startDoorway,
      d5: actionSets.startDoorway,
      d6: actionSets.startDoorway,
      e5: actionSets.startDoorway,
      e6: actionSets.startDoorway,
      // chair
      e7: actionSets.startChair,
      e8: actionSets.startChair,
      f7: actionSets.startChair,
      f8: actionSets.startChair,
      g7: actionSets.startChair,
      g8: actionSets.startChair,
      // hole
      h3: actionSets.startHole,
      h4: actionSets.startHole,
      i3: actionSets.startHole,
      i4: actionSets.startHole,
    },
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
    actions: {
      // paintings
      a2: actionSets.foyerPaintings,
      b1: actionSets.foyerPaintings,
      b2: actionSets.foyerPaintings,
      c1: actionSets.foyerPaintings,
      // portrait
      a4: actionSets.foyerPortrait,
      b4: actionSets.foyerPortrait,
      // front door
      d8: actionSets.foyerDoor,
      d9: actionSets.foyerDoor,
      e8: actionSets.foyerDoor,
      e9: actionSets.foyerDoor,
      f8: actionSets.foyerDoor,
      f9: actionSets.foyerDoor,
      g8: actionSets.foyerDoor,
      g9: actionSets.foyerDoor,
      h9: actionSets.foyerDoor,
      // kitchen door
      d5: actionSets.foyerKitchen,
      d6: actionSets.foyerKitchen,
      e5: actionSets.foyerKitchen,
      e6: actionSets.foyerKitchen,
      f5: actionSets.foyerKitchen,
      f6: actionSets.foyerKitchen,
      // back to start
      i3: actionSets.foyerStart,
      i4: actionSets.foyerStart,
      i5: actionSets.foyerStart,
      i6: actionSets.foyerStart,
      i7: actionSets.foyerStart,
      // upstairs
      a7: actionSets.exitToUpstairs,
      a8: actionSets.exitToUpstairs,
      a9: actionSets.exitToUpstairs,
      b7: actionSets.exitToUpstairs,
      b8: actionSets.exitToUpstairs,
    },
  },
  birdRoom: {
    key: "birdRoom",
    name: "Beebee's Room",
    image: "birdcage.png",
    description: [
      "This room has a bright, open window with a small birdcage on a stand. Inside the cage is the source of the chirping. The bird cautiously watches you.",
    ],
    exits: { c2: "upstairs" },
    actions: {
      // cage
      d4: actionSets.birdRoomCage,
      d5: actionSets.birdRoomCage,
      e4: actionSets.birdRoomCage,
      e5: actionSets.birdRoomCage,
      // window
      b3: actionSets.birdRoomWindow,
      b4: actionSets.birdRoomWindow,
      b5: actionSets.birdRoomWindow,
      c3: actionSets.birdRoomWindow,
      c4: actionSets.birdRoomWindow,
      c5: actionSets.birdRoomWindow,
      d3: actionSets.birdRoomWindow,
      // curtains
      a1: actionSets.birdRoomCurtains,
      a2: actionSets.birdRoomCurtains,
      b1: actionSets.birdRoomCurtains,
      b2: actionSets.birdRoomCurtains,
      c1: actionSets.birdRoomCurtains,
      c2: actionSets.birdRoomCurtains,
      d1: actionSets.birdRoomCurtains,
      d2: actionSets.birdRoomCurtains,
      e1: actionSets.birdRoomCurtains,
      e2: actionSets.birdRoomCurtains,
      f1: actionSets.birdRoomCurtains,
      f2: actionSets.birdRoomCurtains,
      g1: actionSets.birdRoomCurtains,
      g2: actionSets.birdRoomCurtains,
      h1: actionSets.birdRoomCurtains,
      h2: actionSets.birdRoomCurtains,
      a6: actionSets.birdRoomCurtains,
      a7: actionSets.birdRoomCurtains,
      b6: actionSets.birdRoomCurtains,
      b7: actionSets.birdRoomCurtains,
      c6: actionSets.birdRoomCurtains,
      c7: actionSets.birdRoomCurtains,
      d6: actionSets.birdRoomCurtains,
      d7: actionSets.birdRoomCurtains,
      e6: actionSets.birdRoomCurtains,
      e7: actionSets.birdRoomCurtains,
      f6: actionSets.birdRoomCurtains,
      f7: actionSets.birdRoomCurtains,
      g6: actionSets.birdRoomCurtains,
      g7: actionSets.birdRoomCurtains,
      h6: actionSets.birdRoomCurtains,
      h7: actionSets.birdRoomCurtains,
      // exit to upstairs
      i3: actionSets.exitToUpstairs,
      i4: actionSets.exitToUpstairs,
      i5: actionSets.exitToUpstairs,
      i6: actionSets.exitToUpstairs,
      i7: actionSets.exitToUpstairs,
    },
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
    actions: {
      // exit to foyer
      i3: actionSets.exitToFoyer,
      i4: actionSets.exitToFoyer,
      i5: actionSets.exitToFoyer,
      i6: actionSets.exitToFoyer,
      i7: actionSets.exitToFoyer,
      // bathroom
      b2: actionSets.upstairsBathroom,
      b3: actionSets.upstairsBathroom,
      c2: actionSets.upstairsBathroom,
      c3: actionSets.upstairsBathroom,
      d2: actionSets.upstairsBathroom,
      d3: actionSets.upstairsBathroom,
      e2: actionSets.upstairsBathroom,
      e3: actionSets.upstairsBathroom,
      f2: actionSets.upstairsBathroom,
      f3: actionSets.upstairsBathroom,
      g2: actionSets.upstairsBathroom,
      g3: actionSets.upstairsBathroom,
      // attic
      c7: actionSets.upstairsAttic,
      c8: actionSets.upstairsAttic,
      d7: actionSets.upstairsAttic,
      d8: actionSets.upstairsAttic,
      e7: actionSets.upstairsAttic,
      e8: actionSets.upstairsAttic,
      f7: actionSets.upstairsAttic,
      f8: actionSets.upstairsAttic,
      g7: actionSets.upstairsAttic,
      g8: actionSets.upstairsAttic,
      // bird room
      c5: actionSets.upstairsBirdRoom,
      d5: actionSets.upstairsBirdRoom,
      e5: actionSets.upstairsBirdRoom,
    },
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
    actions: {
      // pie
      f5: actionSets.kitchenFood,
      f6: actionSets.kitchenFood,
      g5: actionSets.kitchenFood,
      g6: actionSets.kitchenFood,
      // table
      e3: actionSets.kitchenTable,
      f2: actionSets.kitchenTable,
      f3: actionSets.kitchenTable,
      f4: actionSets.kitchenTable,
      g3: actionSets.kitchenTable,
      // utensils
      b3: actionSets.kitchenUtensils,
      b4: actionSets.kitchenUtensils,
      c3: actionSets.kitchenUtensils,
      c4: actionSets.kitchenUtensils,
      // exit to foyer
      i3: actionSets.exitToFoyer,
      i4: actionSets.exitToFoyer,
      i5: actionSets.exitToFoyer,
      i6: actionSets.exitToFoyer,
      i7: actionSets.exitToFoyer,
    },
  },
  // diningRoom: {
  //   key: "diningRoom",
  //   name: "Dining Room",
  //   image: "diningRoom.png",
  //   description: [
  //     "Strangely, the dining room is in a much better condition than the rest of the house. The table is set for dessert, with a lovely cherry pie as the centerpiece. One slice of pie sits on a white dish.",
  //   ],
  //   exits: {
  //     a2: "kitchen",
  //     b1: "foyer",
  //   },
  // },
  basement: {
    key: "basement",
    name: "Musty Basement",
    image: "basement.png",
    description: [
      "The basement is dark, and smells a bit moldy. A bare bulb hangs in the center of the room. Thankfully, there's a rope leading back up.",
    ],
    exits: {
      a1: "start",
      // b3: "crevice",
    },
    actions: {
      // bulb
      e7: actionSets.basementBulb,
      // rope
      c3: actionSets.basementRope,
      d3: actionSets.basementRope,
      d4: actionSets.basementRope,
      e4: actionSets.basementRope,
      f4: actionSets.basementRope,
      // hole
      b2: actionSets.basementHole,
      b3: actionSets.basementHole,
      b4: actionSets.basementHole,
    },
  },
  // crevice: {
  //   key: "crevice",
  //   name: "Eroded Crevice",
  //   image: "crevice.png",
  //   description: [
  //     "The tiny crevice contains all kinds of oddly bioluminescent fungus and strange vines.",
  //   ],
  //   exits: {
  //     b1: "basement",
  //   },
  // },
  // library: {
  //   key: "library",
  //   name: "Overstuffed Library",
  //   image: "library.png",
  //   description: [
  //     "There are so many books, you aren't sure what to look at first. Some are in shelves, while there are quite a few large stacks as well.",
  //   ],
  //   exits: {
  //     c2: "upstairs",
  //   },
  // },
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
    actions: {
      // window
      e5: actionSets.atticWindow,
      e6: actionSets.atticWindow,
      // ritual
      f8: actionSets.atticRitual,
      f9: actionSets.atticRitual,
      g8: actionSets.atticRitual,
      g9: actionSets.atticRitual,
      h8: actionSets.atticRitual,
      h9: actionSets.atticRitual,
      // exit to upstairs
      i3: actionSets.exitToUpstairs,
      i4: actionSets.exitToUpstairs,
      i5: actionSets.exitToUpstairs,
      i6: actionSets.exitToUpstairs,
      i7: actionSets.exitToUpstairs,
    },
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
    actions: {
      // mirror
      a5: actionSets.bathroomMirror,
      a6: actionSets.bathroomMirror,
      b5: actionSets.bathroomMirror,
      b6: actionSets.bathroomMirror,
      c5: actionSets.bathroomMirror,
      c6: actionSets.bathroomMirror,
      // sink
      d5: actionSets.bathroomSink,
      d6: actionSets.bathroomSink,
      e5: actionSets.bathroomSink,
      e6: actionSets.bathroomSink,
      // toilet
      d7: actionSets.bathroomToilet,
      d8: actionSets.bathroomToilet,
      e7: actionSets.bathroomToilet,
      e8: actionSets.bathroomToilet,
      f7: actionSets.bathroomToilet,
      f8: actionSets.bathroomToilet,
      // tub
      e3: actionSets.bathroomTub,
      e4: actionSets.bathroomTub,
      f2: actionSets.bathroomTub,
      f3: actionSets.bathroomTub,
      f4: actionSets.bathroomTub,
      g2: actionSets.bathroomTub,
      g3: actionSets.bathroomTub,
      h2: actionSets.bathroomTub,
      h3: actionSets.bathroomTub,
      // exit to upstairs
      i3: actionSets.exitToUpstairs,
      i4: actionSets.exitToUpstairs,
      i5: actionSets.exitToUpstairs,
      i6: actionSets.exitToUpstairs,
      i7: actionSets.exitToUpstairs,
    },
  },
  // bedroom: {
  //   key: "bedroom",
  //   name: "Bedroom",
  //   image: "bedroom.png",
  //   description: [
  //     "The bedroom looks fairly comfortable, despite having been uninhabited for quite some time. The bed is still perfectly made.",
  //   ],
  //   exits: {
  //     b1: "upstairs",
  //   },
  // },
  // deaths/tasks
  deathChair: {
    key: "deathChair",
    name: "Have a Seat",
    image: "deathChair.png",
    exits: { b2: "start" },
    description: [
      "As soon as you sit in the chair, disgusting pink tentacles come out of nowhere, enveloping your arms and legs. The acid completely dissolves your flesh and bones.",
    ],
  },
  deathPainting: {
    key: "deathPainting",
    name: "Staring Contest",
    image: "deathPainting.png",
    exits: { b2: "foyer" },
    description: [
      "You take a swipe at the silhouette, but some unseen force stops you. The spirit inhabiting the silhouette has rendered you unable to move or look away. Your body eventually ceases to function.",
    ],
  },
  deathBeebee: {
    key: "deathBeebee",
    name: "Meet Beebee",
    image: "deathBeebee.png",
    exits: { b2: "birdRoom" },
    description: [
      "Upon opening the cage, Beebee quickly escapes. You imagine the bird's instinct would be to fly out the window and enjoy his freedom. However, his first course of action is to launch himself at your face, pecking out your eyes.",
    ],
  },
  deathFood: {
    key: "deathFood",
    name: "Relentless Snacker",
    image: "deathFood.png",
    exits: { b2: "kitchen" },
    description: [
      "You stuff yourself, not questioning the wisdom of eating unattended floor pie. With a mighty rumble, the contents of your stomach begin to expand uncontrollably, tearing you apart from the inside out. The pie has betrayed you. It was delicious, at least.",
    ],
  },
  deathUtensils: {
    key: "deathUtensils",
    name: "Fork in the Road",
    image: "deathUtensils.png",
    exits: { b2: "kitchen" },
    description: [
      "You slap the defenseless utensils, cutting your hand. You bleed profusely, unable to stop the flow. As everything fades to black, you wonder why you are like this.",
    ],
  },
  deathBulb: {
    key: "deathBulb",
    name: "Shed Some Light",
    image: "deathBulb.png",
    exits: { b2: "basement" },
    description: [
      "As soon as you make contact with the bulb, an incredible amount of electricity courses through your body. For a brief moment, you feel like Zeus himself. Ultimately, you are reduced to a charred husk.",
    ],
  },
  deathCrevice: {
    key: "deathCrevice",
    name: "Slap a Cap",
    image: "deathCrevice.png",
    exits: { b2: "basement" },
    description: [
      "Giving in to intrusive thoughts, you slap the top of the largest mushroom. The agitated cap unfurls, revealing a hideous set of sharp teeth. Isn't nature beautiful and mysterious?",
    ],
  },
  deathBook: {
    key: "deathBook",
    name: "Well Read",
    image: "deathBook.png",
    exits: { b2: "library" },
    description: [
      "Ignoring the laws of physics, you grab a book from the center of a stack and pull it out. An avalanche of books fully engulfs you. As your life flashes before your eyes, you bitterly recall you never enjoyed reading anyway.",
    ],
  },
  deathRitual: {
    key: "deathRitual",
    name: "Ashes to Ashes",
    image: "deathRitual.png",
    exits: { b2: "attic" },
    description: [
      "You accidentally knock over the candle in the center of the ritual. Fire quickly travels throughout the dry, rotted wood in the attic. You are burnt to a crisp.",
    ],
  },
  deathBathtub: {
    key: "deathBathtub",
    name: "Squeaky Clean",
    image: "deathBathtub.png",
    exits: { b2: "bathroom" },
    description: [
      "Black water sputters out of the tub spigot. Suddenly, you have the terrible realization that the water was actually a swarm of flesh-eating bugs. Your skeleton is picked clean within seconds.",
    ],
  },
  deathMirror: {
    key: "deathMirror",
    name: "Chill Out",
    image: "deathMirror.png",
    exits: { b2: "bathroom" },
    description: [
      "Inexplicably, you ram your forehead into the mirror. Also inexplicably, behind the mirror was the virtual nothingness of space. Instantly losing consciousness, you are blissfully unaware as the cold vacuum destroys your body.",
    ],
  },
  deathBed: {
    key: "deathBed",
    name: "Away From the Light",
    image: "deathBed.png",
    exits: { b2: "bedroom" },
    description: [
      "The bed is impossibly soft, and it doesn't take long to fall asleep. Unfortunately, you have a very realistic nightmare that you are falling. You never wake up.",
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
    actions: {
      // house
      b5: actionSets.epilogueHouse,
      c4: actionSets.epilogueHouse,
      c5: actionSets.epilogueHouse,
      c6: actionSets.epilogueHouse,
      d4: actionSets.epilogueHouse,
      d5: actionSets.epilogueHouse,
      d6: actionSets.epilogueHouse,
      // beebee
      b7: actionSets.epilogueBeebee,
      b8: actionSets.epilogueBeebee,
    },
  },
}

// refactor this later
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
  // {
  //   key: "deathCrevice",
  //   name: "Slap a Cap",
  // },
  // {
  //   key: "deathBook",
  //   name: "Well Read",
  // },
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
  // {
  //   key: "deathBed",
  //   name: "Away From the Light",
  // },
  {
    key: "deathBeebee",
    name: "Meet Beebee",
  },
]

const data = { actions, actionSets, rooms, tasks }

export default data
