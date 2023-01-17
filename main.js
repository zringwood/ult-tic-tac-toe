var player = true
/* Determines which board is legal to play on.*/
var board = -1
/* Tracks the smaller cells */
var cells = Array(81);
cells.fill(0);
var board_status = Array(9);
board_status.fill(0)
function change_color(button){
   if(board != -1 && Math.floor(button.id/9) != board){
      return 0; 
   }

   if(player){
      button.style.backgroundColor = "#ff0000";
      cells[button.id] = 1;
   } else {
      button.style.backgroundColor = "#0000ff";
      cells[button.id] = 2;
   }
   player = !player;
   if(board != -1)
      board_status[board] = check_board(board)
   if(board_status[button.id%9] == 0){
      board = button.id%9;
   }else{
      board = -1;
   }
   var gamestate = check_game()
   if(gamestate == 1){
      document.getElementById("title").innerHTML = "Game Over! Player 1 Wins!"
   }else if(gamestate == 2){
      document.getElementById("title").innerHTML = "Game Over! Player 2 Wins!"
   }else if(gamestate == -1){
      document.getElementById("title").innerHTML = "Game Over! Draw!"
   }
   
}
/*Checks for a victory on a particular board, returns 0, 1 or 2 
depending on who won the board, 0 if the game is still being played, 
and -1 if the board was a draw */
function check_board(index){
   var init = index*9
   /*Check horizontal*/
   for(i = 0;i<9;i+=3){
      if(cells[init+i] != 0 && (cells[init+i] == cells[init+i+1] && cells[init+i+1] == cells[init+i+2])){
         return cells[init+i]
      }
   }
   /*Check Vertical*/
   for(i = 0;i<3;i++){
      if(cells[init+i] != 0 && (cells[init+i] == cells[init+i+3] && cells[init+i+3] == cells[init+i+6])){
         return cells[init+i]
      }
   }
   /*Check Diagonal*/
   if(cells[init] != 0 && (cells[init] == cells[init+4] && cells[init+4] == cells[init+8])){
      return cells[init]
   }
   if(cells[init+2] != 0 && (cells[init+2] == cells[init+4] && cells[init+4] == cells[init+6])){
      return cells[init+2]
   }
   var sum = 0
   /*Check Draw*/
   for(i = 0;i<9;i++){
      if(cells[init+i] != 0){
         sum++;
      }
   }
   if(sum == 9){
      return -1
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