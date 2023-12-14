class Room {
    constructor(name, description, linkedRoom, character) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {}
    this._character = character;
    }

    get name() {
        return this._name
    }

    get description() {
        return this.description
    }

    get character() {
        return this._character
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short");
            return;
        }
        this._name = value
    }

    set description(value) {
        if (value.description < 4) {
            alert("Description too short")
            return;
        }
        this._description = value
    }

    set character(value) {
        this._character = value;
    }
    //Description of the room and its content
    describe() {
        return `Looking around the ${this._name} you can see ${this._description}`;
    }
    //Method to link rooms
    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }
    //Method for the description of the linked rooms
    directionDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = []
        for (const [direction, room] of entries) {
            let text = `The ${room._name} is to the ${direction}`
            details.push(text);
        }
        return details;
    }
    //Method to move character to next room
    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You can't go this way",);
            alert(this._name)
            return this;
        }
     }
}

class Item {
    constructor(name) {
        this._name = name,
        this._description = description
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value < 4) {
            alert("Description is too short");
            return;
        }
        this.name = value;
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    //Method to describe item
    describe() {
        return `The ${this._name} is ${this._description}`
    }
}

// Character Mainclass
class Character  {
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
    
      set description(value) {
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
        return this._description;
      }
    
      get conversation() {
        return this._conversation;
      }

    //Method for NPC description
    describe() {
        return `You have met an survivor, ${this._name}, they are ${this._description}`
    }

    //Method for conversation with NPC
    talk() {
        return `${this._name} says ${this._conversation}`
    }

}

// NPC subclass
class Survivor extends Character {
    constructor(name, description, conversation) {
        super(name, description, conversation)
    }

    name() {
        return this._name
    }

    describe() {
        return this._description
    }

    talk() {
        return this._conversation
    }
}

// Enemy subclass
class Zombie extends Character {
    constructor(name, description, weakness) {
        super(name, description);
        this._weakness = weakness;
}

fight(item) {
    if (item = this._weakness){
        return true
      } else {
        return false
      }
    }
}

//Variables to hold the seperate rooms
const livingRoom = new Room("Living Room","test","livingRoom", "test");
const bedRoom = new Room("Bedroom", "test","test", "test");
const balcony = new Room("Balcony", "test", "test", "test");
const basement = new Room("basement", "test", "test", "test");

//Link the rooms together 
livingRoom.linkRoom("South", bedRoom);
livingRoom.linkRoom("East", balcony);
bedRoom.linkRoom("North", livingRoom);
bedRoom.linkRoom("East", balcony);
balcony.linkRoom("West", bedRoom);
balcony.linkRoom("North", basement);
basement.linkRoom("South", balcony);
basement.linkRoom("West", bedRoom);
console.log(bedRoom._linkedRooms);


function displayRoomInfo(room) {
    let occupantMsg = ""
    if (room.character === "") {
      occupantMsg = ""
    } else {
      occupantMsg = room.character.describe() + ". " + room.character.converse()
    }
  
    textContent = "<p>" + room.describe() + "</p>" + "<p>" +
      occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";
  
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("usertext").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
  }
  
  
  function startGame() {
    //set and display start room
    currentRoom = livingRoom
    console.log (currentRoom)
    displayRoomInfo(currentRoom);
  
    
  
    //handle commands
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        command = document.getElementById("usertext").value;
        const directions = ["north", "south", "east", "west"]
        if (directions.includes(command.toLowerCase())) {
          currentRoom = currentRoom.move(command)
          document.getElementById("usertext").value = ""
          displayRoomInfo(currentRoom);
        } else {
          document.getElementById("usertext").value = ""
          alert("that is not a valid command please try again")
        }
  
      }
    });
  }
  startGame();
