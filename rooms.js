/*
  Routes:
In the Kitchen - South = lounge North = garden East = Bathroom West = Cupboard
In the Lounge - South = Cupboard North = Kitchen East = Garden West = Bathroom
In the Garden = South = Kitchen North = Bathroom East = m/a West = Lounge
In the Bathroom - South = Garden North =n/a East = Lounge West = Kitchen
In the Cupboard - South = n/a North = Lounge East = Kitchen West = n/a
*/ 


class Room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {
    }
    this._character = "";
    this._roomItem = "";
  }
  get name() {
    return this._name;
  }

  get description() {
    return this._description
  }

  get character() {
    return this._character
  }

  get roomItem() {
    return this._roomItem
  }


  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set character(value) {
    this._character = value;
  }

  set roomItem(value) {
    this._roomItem = value;
  }

  describe(){
      return "You are in the " + this._name + " which is " + this._description;
  }

 
  linkRooms(direction, roomToLink){
    this._linkedRooms[direction] = roomToLink;
  }

  
  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert ("You can't go that way");
      return this;
    }
  }
}


function displayRoomInfo(Room) {
  let content = "";
  let itemMsg = "";

  console.log(Room);

  //Describe the room
  content = Room.describe() + ". ";

  //If no character is in the room, see if there is an item
  if (Room.character === "") {

    //If no item do not describe
    if (Room.roomItem == "") {
      content = content + "";

    //If there is an item, then describe
    } else {
      //console.log(Room.roomItem.describe())
      content = content + Room.roomItem.describe() + ", this item has been added to your backpack";

      thisPlayer.addToBackPack(Room.roomItem._name);
    }

  //Else, display character
  } else {
    //Display description
    content = content + Room.character.describe() + ". ";

    //If there is a conversion, also display this
    if (Room.character._conversation != "") {
      content = content + Room.character.converse();
    }
  }

  
  document.getElementById("roominfo").innerHTML = content;
  document.getElementById("usertext").focus();
}








class Character {
  constructor(name, description, conversation) {
    this._name = name;
    this._description = description;
    this._conversation = conversation;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value){
    if (value.length < 4) {
      alert("Decription is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("conversation is too short.");
      return;
    }
    this._conversation = value;
  }

  
  get name() {
    return this._name;
  }

  get description() {
    return this._description
  }

  get conversation(){
    return this._conversation;
  }


  describe(){
      return "Here you meet " + this._name + ", " + this._name + " is " + this._description;
    }

  converse() {
      return this._name + " says " + "'" + this._conversation + "'";
    }
}


class Enemy extends Character {
  constructor(name, description, conversation, weakness) {
    super(name, description, conversation);
    this._weakness = weakness;
  }

  set weakness(value) {
    if (value.length < 4) {
      alert("Decription is too short.");
      return;
    }
    this._weakness = value;
  }

  fight() {
    console.log(thisPlayer.checkBackPack(this._weakness.name));
    console.log(this._weakness.name);
    if (thisPlayer.checkBackPack(this._weakness.name) === true) {
      return true;
    } else {
      return false;
    }
  }

}


function displayEnemy(Name) {
  textContent = Name.describe();
  textConverseContent = Name.converse();

  document.getElementById("personinfo").innerHTML = textContent;
  document.getElementById("personinfo_converse").innerHTML = textConverseContent;
  document.getElementById("usertext").focus();
}






class Item {
  constructor(name, description) {
    this._name = name,
    this._description = description
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._name = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  describe() {
    return "You find a " + this._name + " which is " + this._description;
  }


}






class Player {
  constructor() {
    this._backpack = []
  }


  get backpack() {
    return this._backpack
  }

  
  /**
   * 
   * method to add item to players backpack
   * 
   * @param {Object} item the item to add to the backpack 
   */
  addToBackPack(item) {
    this._backpack.push(item);
  }

  /**
   * 
   * method to check if item exists in backpack
   * 
   * @param {object} item the item to be checked for 
   */
  checkBackPack(item) {
    for (let i = 0; i < this._backpack.length; i++) {

      if (this._backpack[i] === item) {
        return true;
      }
    }
    return false;
  }

}






//rooms & their descriptions
const Kitchen = new Room ("Kitchen", "Dark, gloomy & full of creatures lurking in the shadows");
const Lounge = new Room("Lounge", "Bright & Airy");
const Garden = new Room("Garden", "Big & Bright with lots of places to hide");
const Bathroom = new Room("Bathroom", "Cold & slippery");
const Cupboard = new Room ("Hallway cupboard", "small & cramped with just enough room for one person")

//link rooms
Kitchen.linkRooms("north",  Garden);
Kitchen.linkRooms("south", Lounge);
Kitchen.linkRooms("east", Bathroom);
Kitchen.linkRooms("west", Cupboard)
Lounge.linkRooms("north", Kitchen);
Lounge.linkRooms("east", Garden);
Lounge.linkRooms("west", Bathroom);
Lounge.linkRooms("south", Cupboard)
Garden.linkRooms("south", Kitchen);
Garden.linkRooms("west", Lounge);
Garden.linkRooms("north", Bathroom);
Bathroom.linkRooms("east", Lounge);
Bathroom.linkRooms("south", Garden);
Bathroom.linkRooms("west", Kitchen);
Cupboard.linkRooms("east", Kitchen);
Cupboard.linkRooms("north", Lounge);


// items & their descriptions
const Dagger = new Item ("Dagger", "sharp and pointy");     
const Candlestick = new Item ("Candlestick", " big & shiny, when lit it has a 'monstorous flame'");     

//Add items to rooms
Lounge.roomItem = Dagger;
Garden.roomItem = Candlestick;


//add characters
//Enemy
const Roger = new Enemy("Roger", "an ancient vampire", " It's much too dark for you to stake me in the heart ", Dagger);
const Derek = new Enemy("Derek", "a big green monster", "I'm not scared of knives and swords", Candlestick);

//Good person
const Bert = new Character("Bert", "a happy Scarecrow", "Hello, it's scary with all these creatures. I wish we could defeat them");




//Add characters to rooms
Kitchen.character = Roger;
Bathroom.character = Derek;
Cupboard.character = Bert





//Create Player
const thisPlayer = new Player();


//Handle the given commands
function commandHandler(command, character) {
  switch (command) {
    case "fight":
      if (character.fight() === true) {
        msg = "congratulations you defeated " + character.name;
        alert(msg)
      } else {
        alert("Game over, you did not have the correct item in your backpack for this characters weakness.")
      }
      break;

  }
}






function startGame(){

  currentRoom = Kitchen;
  displayRoomInfo(currentRoom);

  document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        command = document.getElementById("usertext").value;

        //Directions that can be used
        const directions = ["north", "south", "east", "west"]

        //Action commands for the player
        const commands = ["fight"];

        //If a directional comand
        if (directions.includes(command.toLowerCase())) {
          //Get current room and the info
          currentRoom = currentRoom.move(command)
          displayRoomInfo(currentRoom);

        //If a action command
        } else if (commands.includes(command.toLowerCase())) {
          commandHandler(command, currentRoom.character)

        //Else, display an error
        } else {
          document.getElementById("usertext").value = ""
          alert("that is not a valid command please try again")
        }

    }
  });
  
}

startGame()
