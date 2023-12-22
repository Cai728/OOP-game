class Room {
    constructor(name) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = "";
      this._items = [];
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get character() {
      return this._character
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
        alert("Description too short");
        return;
      }
      this._description = value;
    }
  
    set character(value) {
      this._character = value;
    }
  
    describe() {
      return `Looking around the ${this._name} you can see ${this._description} <br/> ` ;
    }
  
    linkRoom(direction, roomToLink) {
      this._linkedRooms[direction] = roomToLink;
    }
  
    getDetails() {
      const entries = Object.entries(this._linkedRooms);
      let details = []
      for (const [direction, room] of entries) {
        let text = " The " + room._name + " is to the " + "<b>" + direction +"</b>"
        details.push(text);
      }
      return details;
    }
  
    //method to move to a new room
    move(direction) {
      if (direction in this._linkedRooms) {
        return this._linkedRooms[direction];
      } else {
        alert("You can't go that way",);
        return this; 
      }
    }

    addItem(item) {
        this._items.push(item);
    }

    getItems() {
        return this._items;
    }
  }
  let inventory = [];

  class Item {
    constructor(name) {
      this._name = name;
      this._description = "";
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
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    describe() {
      return "The " + this._name + " is " + this._description;
    }
    
    }

  
  class Character {
    constructor(name) {
      this._name = name,
      this._description = ""
      this._conversation = ""
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
  
    describe() {
      return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }
  
    converse() {
      return this._name + " says " + "'" + this._conversation + "'";
    }
  }
  

  
  //create the indiviual room objects and add their descriptions
  const balcony = new Room("Balcony");
  balcony.description = "its been abandoned for quite a while now, or so it seems...";
  const kitchen = new Room("Kitchen");
  kitchen.description = "its already been looted, the only thing left are the roaches";
  const bedroom = new Room("Bedroom");
  bedroom.description = "nothing much left of the bedroom, just a bed and a computer, no use with this. The electricity got cut off at the start of the pandemic";
  const basement = new Room("Basement");
  basement.description = "a room which is dark and there seems to be an odd smell coming from there.";
  const StorageCupboard = new Room("Storage Cupboard")
  StorageCupboard.description = "the storage room has mostly been ransacked although there is an <b>hammer</b> lying there behind the door that you could <b>pick up</b>.";
  
  const npc = new Character("John");
  balcony.character = (npc);

  const Security = new Character("A Security Guard");
  basement.character = (Security);
  Security.conversation = "Only authorised personel should be here, who are you?";

  npc.description = "a survivor, you and him manage to escape the quarantine camp which got overun by the infected";
  npc.conversation = "We barely made it out of there alive, my leg is messed up from climbing up here. You are going to have to check the apartment out yourself"
  
  const IDbadge = new Item("hammer")
  StorageCupboard.addItem(IDbadge);
  //link the rooms together
  balcony.linkRoom("north", kitchen);
  kitchen.linkRoom("east", bedroom);
  kitchen.linkRoom("south", balcony);
  bedroom.linkRoom("west", kitchen);
  bedroom.linkRoom("north", basement);
  basement.linkRoom("south", bedroom);
  balcony.linkRoom("west", StorageCupboard);
  StorageCupboard.linkRoom("east", balcony);

  
  
  function inInventory(newItem) {
    const userInput = document.getElementById("usertext").value;
    let pickupMessage = "";
 
    if(userInput.toLowerCase().includes(`pick up ${newItem.toLowerCase()}`)){
        inventory.push(newItem);
        console.log(`${newItem} has been added`);
        pickupMessage = `You picked up ${newItem}. It has been added to your inventory.`;
        console.log(pickupMessage)
      
    } 
       return pickupMessage
    }

    
    let isWinOrLoseScreen = false;



   function displayRoomInfo(room) {
    let occupantMsg = "";
    isWinOrLoseScreen = false;
    toggleInputBox();
    
    if (room.character === "") {
      occupantMsg = ""
    
    } else if(room === basement && inventory.includes("hammer")) {
      occupantMsg = "You're greeted by armed security personel" + ". " + room.character.converse() + "<p> <br>" +
      "You can leave and go back <b>south</b> to the Underground Tunnel, or try your luck and <b>show</b> the <b>hammer</b> you found." + "</p> <br>";
    
    } else if(room === basement) {
      occupantMsg = "You're greeted by armed security personel" + ". " + room.character.converse() + "<br></br>"
    
    } else {
  
      occupantMsg = room.character.describe() + ". " + room.character.converse()
    }
  
    let textContent = "<p>" + room.describe() + "</p>" + "<p>" +
      occupantMsg + "</p>" + "<p>" + room.getDetails().join("<br/>") + "</p>";

  
    document.getElementById("textarea").innerHTML = textContent;
  }

  

  function showWin() {
    document.getElementById("textarea").innerHTML = "<p id='textarea' class='text-center leading-loose text-3xl md:text-4xl md:leading-loose lg:text-5xl lg:leading-loose'>" + "WELL DONE! YOU HAVE SUCCESSFULLY INFILTRATED THE ENEMY!" +  "</p>" + "<br><button id='startButton' class='bg-white py-2 px-4 my-auto border-black rounded-md hover:bg-gray-700 hover:text-white'>Start Game</button>";
    document.getElementById("startButton").addEventListener("click", () => window.location.reload());
    isWinOrLoseScreen = true;
    toggleInputBox();
  }

  function showLose() {
    document.getElementById("textarea").innerHTML = "<p id='textarea' class='text-center my-auto leading-loose text-3xl md:text-4xl md:leading-loose lg:text-5xl lg:leading-loose'>" + "YOU'VE BEEN CAUGHT! <br> There were armed security on the door and your current ID doesn't authorise you to enter this room" + "</p>" + "<br><button id='startButton' class='bg-white py-2 px-4 my-auto border-black rounded-md hover:bg-gray-700 hover:text-white'>Try Again</button>";
    document.getElementById("startButton").addEventListener("click", () => window.location.reload());
    isWinOrLoseScreen = true;
    toggleInputBox();
  }
  
  // let showInputBox = true;
    function toggleInputBox(){
      if(!isWinOrLoseScreen) {
        // showInputBox = true;
        document.getElementById("usertext").innerHTML = '><input type="text" id="usertext" />';
        document.getElementById("usertext").focus(); 
        } else if (isWinOrLoseScreen) {
          // showInputBox = false;
          document.getElementById("usertext").classList.add("invisible");
        }
    }

 
  function startGame() {
    document.getElementById("usertext").classList.remove("invisible"); 


    
    
    //set and display start room
    currentRoom = balcony;
    console.log (currentRoom);
    displayRoomInfo(currentRoom);
    isWinOrLoseScreen = false;
    isAudioPlaying = true;
    
  
    //handle commands
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        command = document.getElementById("usertext").value;
        const directions = ["north", "south", "east", "west"];

        if (directions.includes(command.toLowerCase())) {
          currentRoom = currentRoom.move(command)
          console.log("After Move:", currentRoom.name)
          document.getElementById("usertext").value = ""
          displayRoomInfo(currentRoom);
          if(currentRoom === basement && !inventory.includes("hammer")){
            showLose();
          }
        } else if(command.toLowerCase().startsWith("pick up")){
            const pickItem = command.substring(8).trim();
            console.log("this is getting called here")
            const val = inInventory(pickItem);
            console.log(val)
            document.getElementById("notificationUser").innerHTML = val;
            document.getElementById("usertext").value = "";
            displayRoomInfo(currentRoom);
         } 
        else if(command.toLowerCase().startsWith("show")) {
          document.getElementById("notificationUser").innerHTML = "<p id='notificationUser' class='text-2xl mt-16 md:text-3xl md:leading-loose lg:text-4xl font-bold text-center animate__animated animate__fadeIn' >Click Start to play again</p>";
            
          
          setTimeout(() => {
                document.getElementById("notificationUser").innerHTML = "";
            }, 10000);
            document.getElementById("usertext").value = "";
            showWin();
           
            // displayRoomInfo(currentRoom);

        } else if (command.toLowerCase() === "Bedroom") {
          currentRoom = bedroom;
          inventory.push("hammer");
          document.getElementById("usertext").value = "";
          displayRoomInfo(currentRoom);

        }
        else {
          document.getElementById("usertext").value = ""
          alert("that is not a valid command please try again")
        }
  
      }
    });
  }
  startGame();