function Rover(pos = {x: 0, y: 0}, dir = 'n') {
    return {
      'kind': 'rover',
      'pos': pos,
    'dir': dir,
  }
}
  
  function Rock(pos = { x: 0, y: 0 }) {
      return {
        'kind' : 'rock', 
        'pos': pos,   
      };
  }


let rover = { 
    direction: "N",
    x: 0,
    y: 0,
    travelLog: [{ x: 0, y: 0 }]
};
const grid = {xMax: 10, yMax: 10}
const alphabet = new Set(['l','r','f','b']);
// const obstacles = [{x: 5, y:2}, {x:1, y:0}]
const rocks = [Rock({x: 5, y:2}), Rock({x:1, y:0})];

let rovers = [
  Rover({ x: 0, y: 1 }),
  Rover({ x: 1, y: 0 }),
  Rover({ x: 1, y: 1 }),
];

function get_obstacles() {
  return rocks.concat(rovers);
}
//create a new

function handle_obstacles(rover, current_position){
  let obstacles = get_obstacles();
  //replace for -> foreach
    obstacles.forEach( obstacle => {
      if (current_position.x == obstacle.x && current_position.y == obstacle.y) {
        console.log("obstacle found");
        command(rover, "blfrffrfl");
        console.log("rover went round the obstacle");
      }
    })
}


function check_if_within_grid(positions){
      if(positions.x < 0){
        positions.x = Math.abs(positions.x);
      } else if(positions.x > grid.xMax){
        positions.x = grid.xMax;
      }
      if(positions.y < 0){
        positions.y = Math.abs(positions.y);
      } else if(positions.y > grid.yMax){
        positions.y = grid.yMax;
      }

}


function check_commands(orders){
  let checked_orders = "";
  for (let letter = 0; letter < orders.length; letter++) {
    if (alphabet.has(orders[letter])) {
      checked_orders += orders[letter]
    }
  }
  return checked_orders;
}


function turnRight(rover) {
let directions = {
  N: "E",
  E: "S",
  S: "W",
  W: "N"
}
rover.direction = directions[rover.direction] || "something went wrong"

  console.log(`turnRight was called! and rover.direction is now ${rover.direction}`);
}



  function turnLeft(rover) {
    let directions = {
      N: "W",
      W: "S",
      S: "E",
      E: "N"
    }
    rover.direction = directions[rover.direction] || "something went wrong"
  console.log(`turnLeft was called! and rover.direction is now ${rover.direction}`);
  }
  

  
  function moveForward(rover) {
    switch (rover.direction) {
        case 'N': 
        rover.y -= 1;
          break;
        case 'W': 
        rover.x -= 1;
          break;
        case 'S': 
        rover.y += 1;
          break;
        case 'E': 
        rover.x += 1;
          break;
      }
    console.log('moveForward was called');

      return `rover has position: x=${rover.x}, y=${rover.y}`;
  }
  function moveBackward(rover) {

    switch (rover.direction) {
        case 'N': 
        rover.y += 1;

          break;
        case 'W': 
        rover.x += 1;
          break;
        case 'S': 
        rover.y -= 1;
          break;
        case 'E': 
        rover.x -= 1;
          break;
      }
    console.log('moveBackward was called');

      return `rover has position: x=${rover.x}, y=${rover.y}`;
  }

  function command(rover, orders) {
    check_commands(orders);
    for (let i = 0; i < orders.length; i++) {
      let order = orders[i];
      switch (order) {
        case 'l': 
        turnLeft(rover);
          break;
        case 'r': 
        turnRight(rover);
          break;
        case 'f': 
        moveForward(rover);
          break;
          case 'b': 
        moveBackward(rover);
          break;

      }
      let newPosition = { x: rover.x, y: rover.y };
      //check position
      check_if_within_grid(newPosition);
      //check for obstacles
      handle_obstacles(rover, newPosition);
      rover.travelLog.push(newPosition);
    }
    console.log(rover.travelLog);
  }



  function Rover(pos = {x: 0, y: 0}, dir = 'n') {
    return {
      'kind': 'rover',
      'pos': pos,
      'dir': dir,
    }

    function Rock(pos = { x: 0, y: 0 }) {
      return {
        'kind': 'rock',
        'pos': pos,
      }
}

function cycle_rovers(rovers, commands) {
  rovers.foreach(rover, () => {
    command(rover, commands);
  });
}

// cycle_rovers(rovers, 'ffbbrrlbrbf')