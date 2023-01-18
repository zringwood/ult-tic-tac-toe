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

   if(check_board(board_status, 1) == 1){
      document.getElementById("title").innerHTML = "Game Over! Player 1 Wins!"
   }else if(check_board(board_status, 2) == 2){
      document.getElementById("title").innerHTML = "Game Over! Player 2 Wins!"
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
