document.addEventListener('DOMContentLoaded', (e) => {
    const grid = document.querySelector('.grid');
    let candyAudio = new Audio('candy.mp3')
    let audioCrack = new Audio('crack.mp3')
    const scoreDisplay = document.getElementById('score')
    const width = 8;
    const squares = []
    const candyColors = [
        'url(images/red.png)', 
        'url(images/blue.png)', 
        'url(images/orange.png)', 
        'url(images/green.png)', 
        'url(images/purple.png)', 
        'url(images/yellow.png)'
    ]
    let score = 0
    // create board 

    let createBoard = () => {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.style.backgroundSize = 'cover'
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColor];
            grid.appendChild(square)
            squares.push(square)
        }
    }

    createBoard();

    // drag the candies 
    let colorBeingDragged
    let colorBeingReplaced
    let squareBeingDragged
    let squareBeingReplaced
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage
        squareBeingDragged = parseInt(this.id)
        console.log(colorBeingDragged)
        console.log(this.id, 'dragstart')
    }
    function dragOver(e) {
        e.preventDefault()
        console.log(this.id, 'dragover')
    }
    function dragEnter(e) {
        e.preventDefault()
        console.log(this.id, 'dragenter')
    }
    function dragLeave() {
        console.log(this.id, 'dragleave')
    }
    
    function dragDrop() {
        console.log(this.id, 'dragdrop')
        colorBeingReplaced = this.style.backgroundImage
        candyAudio.play()
        squareBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        squares[squareBeingDragged].style.backgroundImage = colorBeingReplaced
    }

    function dragEnd() {
        console.log(this.id, 'dragend')
        let validMoves = [
            squareBeingDragged  -1, 
            squareBeingDragged  -width,
            squareBeingDragged +1,
            squareBeingDragged +width
        ]

        let validMove = validMoves.includes(squareBeingReplaced)

        if(squareBeingReplaced && validMove){
            squareBeingReplaced = null
        } else if (squareBeingReplaced && !validMove){
            squares[squareBeingReplaced].style.backgroundImage = colorBeingReplaced;
            squares[squareBeingDragged].style.backgroundImage = colorBeingDragged;  
        } else{
            squares[squareBeingDragged].style.backgroundImage = colorBeingDragged;  

        } 
        
        
    }
    // drop candies once has been cleared 

    function moveDown(){
        for(let i=0; i<55; i++){
            if(squares[i + width].style.backgroundImage === ''){
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ""
                const firstRow = [0,1,2,3,4,5,6,7]
                    const isFirstRow = firstRow.includes(i)
                    if(isFirstRow && squares[i].style.backgroundImage === ''){
                        let randomColor = Math.floor(Math.random()*candyColors.length)
                        squares[i].style.backgroundImage = candyColors[randomColor]
                    }
            }
        }
    }

    // check section start here 
    function checkRowForFour(){

        for (let i=0; i<60; i++){
            let rowOfFour = [i, i+1, i+2, i+3 ]
            let decidedColor = squares[i].style.backgroundImage;
            const isblank = squares[i].style.backgroundImage === ''
            const notValid = [5,6,7, 13, 14,15, 21, 22,23,30,31,38,39, 45, 46,47, 53, 54,55]
            if(notValid.includes(i)) continue
            if(rowOfFour.every(index => squares[index].style.backgroundImage===decidedColor && !isblank)){
                audioCrack.play()

                score += 4
                scoreDisplay.innerHTML = score
                rowOfFour.forEach(index =>{
                    squares[index].style.backgroundImage = ''
                    
                })
            }
        }
    }
    checkRowForFour()
    function checkColumnForFour(){
        for (let i=0; i<47; i++){
            let columnOfFour = [i, i+width, i+width*2, i+width*3 ]
            let decidedColor = squares[i].style.backgroundImage;
            const isblank = squares[i].style.backgroundImage === ''

            if(columnOfFour.every(index => squares[index].style.backgroundImage===decidedColor && !isblank)){
                score += 4
                scoreDisplay.innerHTML = score
                columnOfFour.forEach(index =>{
                    squares[index].style.backgroundImage = ''
                    
                })
            }
        }
    }
    checkColumnForFour()
    // check section ends here
    function checkRowForThree(){
        for (let i=0; i<61; i++){
            let rowOfThree = [i, i+1, i+2 ]
            let decidedColor = squares[i].style.backgroundImage;
            const isblank = squares[i].style.backgroundImage === ''
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
            if(notValid.includes(i)) continue
            if(rowOfThree.every(index => squares[index].style.backgroundImage===decidedColor && !isblank)){
                score += 3
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index =>{
                    squares[index].style.backgroundImage = ''
                    
                })
            }
        }
    }
    checkRowForThree()
    function checkColumnForThree(){
        for (let i=0; i<47; i++){
            let columnOfThree = [i, i+width, i+width*2 ]
            let decidedColor = squares[i].style.backgroundImage;
            const isblank = squares[i].style.backgroundImage === ''

            if(columnOfThree.every(index => squares[index].style.backgroundImage===decidedColor && !isblank)){
                score += 3
                scoreDisplay.innerHTML = score
                columnOfThree.forEach(index =>{
                    squares[index].style.backgroundImage = ''
                    
                })
            }
        }
    }
    checkColumnForThree()

   window.setInterval(function(){
    moveDown()
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
   },100)
})