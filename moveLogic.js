export default function move(gameState){
    let moveSafety = {
        up: true,
        down: true,
        left: true,
        right: true
    };
    let moveBypass = {
        up: false,
        down: false,
        left: false,
        right: false
    }
    let moveToIfNeeded = {
        up: false,
        down: false,
        left: false,
        right: false
    }
    let lookBypass = {
        up: false,
        down: false,
        left: false,
        right: false
    }
    let allHazards = []
    let fINDSOMEFOODNOW = false
    function findFood(){
        let changedSomething = false
        // let foodDistance = 100000000 
        // gameState.board.food.forEach(elm => {
        //     let x = elm.x - gameState.you.head.x
        //     let y = elm.y - gameState.you.head.y
        //     if(Math.sign(x) == 1){
        //         moveBypass.right = true
        //     }
        //     if(Math.sign(x) == -1){
        //         moveBypass.left = true
        //     }
        //     if(Math.sign(y) == 1){
        //         moveBypass.up = true
        //     }
        //     if(Math.sign(y) == -1){
        //         moveBypass.down = true
        //     }
        //     x = Math.abs(x)
        //     y = Math.abs(y)
        //     let distance = x + y
        //     if(distance < foodDistance){
        //         foodDistance = distance
        //         console.log(foodDistance, elm.x, elm.y)
        //     }
        // })




        for (let index = 0; index < gameState.board.food.length; index++) {
            for (let i = 0; i < gameState.board.width; i++) {
                if(gameState.you.head.x+i == gameState.board.food[index].x && gameState.you.head.y == gameState.board.food[index].y){
                    // console.log(`food: right: ${i}`)
                    moveBypass.right = true
                    changedSomething = true
                } else if(gameState.you.head.x-i == gameState.board.food[index].x && gameState.you.head.y == gameState.board.food[index].y){
                    // console.log(`food: left: ${i}`)
                    moveBypass.left = true
                    changedSomething = true
                } else if(gameState.you.head.x == gameState.board.food[index].x && gameState.you.head.y+i == gameState.board.food[index].y){
                    // console.log(`food: up: ${i}`)
                    moveBypass.up = true
                    changedSomething = true
                } else if(gameState.you.head.x == gameState.board.food[index].x && gameState.you.head.y-i == gameState.board.food[index].y){
                    // console.log(`food: down: ${i}`)
                    moveBypass.down = true
                    changedSomething = true
                }  
            }
        }
        if(changedSomething == false){
            fINDSOMEFOODNOW = true
        }
    }

    function loopSelf(){
        let x = gameState.you.body[gameState.you.body.length-1].x - gameState.you.head.x
        let y = gameState.you.body[gameState.you.body.length-1].y - gameState.you.head.y
        if(Math.sign(x) == 1){
            moveBypass.right = true
        }
        if(Math.sign(x) == -1){
            moveBypass.left = true
        }
        if(Math.sign(y) == 1){
            moveBypass.up = true
        }
        if(Math.sign(y) == -1){
            moveBypass.down = true
        }
    }
    let longestSnake
    gameState.board.snakes.forEach(elm => {
        if(longestSnake < elm.length){
            longestSnake = elm.length
        }
    })
    console.log(longestSnake)
    
    if(gameState.you.length < longestSnake-1 || gameState.you.length < 7){
        findFood()
    } else if(gameState.you.length % 2 == 0){
        // loopSelf()
    }

    // We've included code to prevent your Battlesnake from moving backwards
    const myHead = gameState.you.body[0];
    const myNeck = gameState.you.body[1];
    
    if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
        moveSafety.left = false;
        
    } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
        moveSafety.right = false;
        
    } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
        moveSafety.down = false;
        
    } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
        moveSafety.up = false;
    }
    // avoid wall
    // if(gameState.you.head.x == 0){
    //     moveSafety.left = false
    // } 
    // if(gameState.you.head.y == 0){
    //     moveSafety.down = false
    // } 
    // if(gameState.you.head.y+1 == gameState.board.height){
    //     moveSafety.up = false
    // } 
    // if(gameState.you.head.x+1 == gameState.board.width){
    //     moveSafety.right = false
    // }
    for (let xL = 0; xL < gameState.board.width; xL++) {
        for (let yL = 0; yL < gameState.board.height; yL++) {
            if(xL == 0){
                allHazards.push({x:xL-1,y:yL})
            } else if(yL == 0){
                allHazards.push({x:xL,y:yL-1})
            } 
            if(xL == gameState.board.width-1){
                allHazards.push({x:xL+1,y:yL})
            } else if(yL == gameState.board.height-1){
                allHazards.push({x:xL,y:yL+1})
            }

            
        }
    }
    allHazards.push({x:0,y:-1})
    allHazards.push({x:gameState.board.width-1,y:gameState.board.height})
    function checkTrapped(x, y, doesNotMatter, element){
        if(x+1 == element.x && y == element.y && doesNotMatter != "right"){
            moveToIfNeeded.left = true
        }
        if(x-1 == element.x && y == element.y && doesNotMatter != "left"){
            moveToIfNeeded.right = true
        }
        if(x == element.x && y+1 == element.y && doesNotMatter != "up"){
            moveToIfNeeded.down = true
        }
        if(x == element.x && y-1 == element.y && doesNotMatter != "down"){
            moveToIfNeeded.up = true
        }
    }
    // avoid all snakes
    gameState.board.snakes.forEach(element =>{
        let indeX = 0
        element.body.forEach(elm =>{
            if(indeX+1 != element.body.length){
                // if(gameState.you.head.x == elm.x+1 && gameState.you.head.y == elm.y){
                //     moveSafety.left = false
                // } 
                // if(gameState.you.head.y == elm.y+1 && gameState.you.head.x == elm.x){
                //     moveSafety.down = false
                // } 
                // if(gameState.you.head.y == elm.y-1 && gameState.you.head.x == elm.x){
                //     moveSafety.up = false
                // } 
                // if(gameState.you.head.x == elm.x-1 && gameState.you.head.y == elm.y){
                //     moveSafety.right = false
                // }
                checkTrapped(gameState.you.head.x-1, gameState.you.head.y, "right", elm)
                checkTrapped(gameState.you.head.x+1, gameState.you.head.y, "left", elm)
                checkTrapped(gameState.you.head.x, gameState.you.head.y-1, "up", elm)
                checkTrapped(gameState.you.head.x, gameState.you.head.y+1, "down", elm)
                allHazards.push({x:elm.x,y:elm.y})
            }
            indeX++
        })
    })
    // avoid hazards
    gameState.board.hazards.forEach(element =>{
        // if(gameState.you.head.x == element.x+1 && gameState.you.head.y == element.y){
        //     moveSafety.left = false
        // } 
        // if(gameState.you.head.y == element.y+1 && gameState.you.head.x == element.x){
        //     moveSafety.down = false
        // } 
        // if(gameState.you.head.y == element.y-1 && gameState.you.head.x == element.x){
        //     moveSafety.up = false
        // } 
        // if(gameState.you.head.x == element.x-1 && gameState.you.head.y == element.y){
        //     moveSafety.right = false
        // }
        allHazards.push({x:element.x,y:element.y})
    })
    allHazards.forEach(element =>{
        if(gameState.you.head.x == element.x+1 && gameState.you.head.y == element.y){
            moveSafety.left = false
        } 
        if(gameState.you.head.y == element.y+1 && gameState.you.head.x == element.x){
            moveSafety.down = false
        } 
        if(gameState.you.head.y == element.y-1 && gameState.you.head.x == element.x){
            moveSafety.up = false
        } 
        if(gameState.you.head.x == element.x-1 && gameState.you.head.y == element.y){
            moveSafety.right = false
        }
    })
    let wtf = -1
    function look(head, body, i, startingMove){
        wtf++
        if(i == 0){
            body.pop()
        }
        if(i < 4){
            if(allHazards.some(e => e.x === head.x+1 && e.y === head.y) == false && body.some(e => e.x === head.x+1 && e.y === head.y) == false){
                if(i == 0){startingMove = "r"}
                body.unshift({x:head.x+1,y:head.y})
                body.pop()
                i++
                look({x:head.x+1,y:head.y}, body, i, startingMove)  
            }
            if(allHazards.some(e => e.x === head.x-1 && e.y === head.y) == false && body.some(e => e.x === head.x-1 && e.y === head.y) == false){
                if(i == 0){startingMove = "l"}
                body.unshift({x:head.x-1,y:head.y})
                body.pop()
                i++
                look({x:head.x-1,y:head.y}, body, i, startingMove)    
            }
            if(allHazards.some(e => e.x === head.x && e.y === head.y+1) == false && body.some(e => e.x === head.x && e.y === head.y+1) == false){
                if(i == 0){startingMove = "u"}
                body.unshift({x:head.x,y:head.y+1})
                body.pop()
                i++
                look({x:head.x,y:head.y+1}, body, i, startingMove)    
            }
            if(allHazards.some(e => e.x === head.x && e.y === head.y-1) == false && body.some(e => e.x === head.x && e.y === head.y-1) == false){
                if(i == 0){startingMove = "d"}
                body.unshift({x:head.x,y:head.y-1})
                body.pop()
                i++
                look({x:head.x,y:head.y-1}, body, i, startingMove) 
            }
        } else {
            if(startingMove == "r"){
                lookBypass.right = true
            } else if(startingMove == "l"){
                lookBypass.left = true
            } else if(startingMove == "u"){
                lookBypass.up = true
            } else if(startingMove == "d"){
                lookBypass.down = true
            }
        }
    }
    look(gameState.you.head,gameState.you.body, 0)
    console.log(wtf)
    if(gameState.you.head.y < gameState.board.height-1){
        // do move thing plz
    }
    // Are there any safe moves left?
    
    //Object.keys(moveSafety) returns ["up", "down", "left", "right"]
    //.filter() filters the array based on the function provided as an argument (using arrow function syntax here)
    //In this case we want to filter out any of these directions for which moveSafety[direction] == false
    // console.log(gameState)
    const safeMoves = Object.keys(moveSafety).filter(direction => moveSafety[direction]);
    if (safeMoves.length == 0) {
        console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
        return { move: "down" };
    }
    let nextMove
    // checks if there is a good path to take. if does not matter choses random direction
    if(moveSafety.up == true && moveBypass.up == true){
        nextMove = 'up'
    } else if(moveSafety.right == true && moveBypass.right == true){
        nextMove = 'right'
    } else if(moveSafety.left == true && moveBypass.left == true){
        nextMove = 'left'
    } else if(moveSafety.down == true && moveBypass.down == true){
        nextMove = 'down'
    } else{
        // Choose a random move from the safe moves
        if(fINDSOMEFOODNOW == false){
            nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
        }else{
            nextMove = safeMoves[0];
        }
    }
    console.log(lookBypass)
    // console.log(gameState.you.body)
    console.log(`Safe: ${safeMoves}`)
    console.log(`Bypass: ${moveBypass.right},${moveBypass.left},${moveBypass.up},${moveBypass.down}`)
    console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    return { move: nextMove };
}


// to do:
// add so goes toward other snakes when longer
// add avoid snakes when smaller