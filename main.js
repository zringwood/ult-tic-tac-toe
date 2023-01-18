var player = 1
/* Determines which board is legal to play on.*/
var board = -1
/* Tracks the smaller cells */
var cells = Array(81);
cells.fill(0);
/* Tracks the larger boards */
var board_status = Array(9);
board_status.fill(0)
//These are all the winning states on a 3x3 board. 
const w_states = [[0,0,0,0,0,0,1,1,1], [0,0,0,1,1,1,0,0,0],[1,1,1,0,0,0,0,0,0],[1,0,0,1,0,0,1,0,0], [0,1,0,0,1,0,0,1,0],[0,0,1,0,0,1,0,0,1],[1,0,0,0,1,0,0,0,1], [0,0,1,0,1,0,1,0,0]]
function update_game(button){
   if(board != -1 && Math.floor(button.id/9) != board){
      return 0; 
   }

   if(player == 1){
      button.style.backgroundColor = "#ff0000";
      cells[button.id] = 1;
   } else if(player == 2){
      button.style.backgroundColor = "#0000ff";
      cells[button.id] = 2;
   }
   
   if(board != -1){
      board_status[board] = check_board(cells.slice(board*9,board*9+9), player);
   }
   if(board_status[button.id%9] == 0){
      board = button.id%9;
   }else{
      board = -1;
   }
   player = player%2 + 1;
   var gamestate = check_game();
   if(gamestate == 1){
      document.getElementById("title").innerHTML = "Game Over! Player 1 Wins!"
   }else if(gamestate == 2){
      document.getElementById("title").innerHTML = "Game Over! Player 2 Wins!"
   }else if(gamestate == -1){
      document.getElementById("title").innerHTML = "Game Over! Draw!"
   }
   
}
/*Checks for a victory on a particular board, returns 0, 1 or 2 
depending on who won the board, 0 if the game is still being played*/
function check_board(board, p){
   for(let i in w_states){
      let match = true
      for(let j in w_states[i]){
         if(w_states[i][j]==1 && board[j] != p){
            match = false;
         }
      }
      if(match){
         return p;
      }
   }
   return 0
}
/*Checks the larger game to see if either player has won*/
function check_game(){
   /*Check horizontal*/
   for(i = 0;i<9;i+=3){
      if(board_status[i] != 0 && (board_status[i] == board_status[i+1] && board_status[i+1] == board_status[i+2])){
         return board_status[i]
      }
   }
   /*Check Vertical*/
   for(i = 0;i<3;i++){
      if(board_status[i] != 0 && (board_status[i] == board_status[i+3] && board_status[i+3] == board_status[i+6])){
         return board_status[i]
      }
   }
   /*Check Diagonal*/
   if(board_status[i] != 0 && (board_status[i] == board_status[i+4] && board_status[i+4] == board_status[i+8])){
      return board_status[i]
   }
   if(board_status[i+2] != 0 && (board_status[i+2] == board_status[i+4] && board_status[i+4] == board_status[i+6])){
      return board_status[i+2]
   }
   var sum = 0
   /*Check Draw*/
   for(i = 0;i<9;i++){
      if(board_status[i] != 0){
         sum++;
      }
   }
   if(sum == 9){
      return -1
   }
   return 0
}