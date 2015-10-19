/**
 * Created by adubois on 01/10/15.
 */
function NotEmptyException(msg){
    this.message = msg;
    this.name ="Not Empty";
}

var Paleto = function(){
    var plateau =[];
    var nb = 0;
    var player1 = "White";
    var player2 = "Black";
    var currentPlayer ;
    var that = this;
    var size ;
    this.setNbBalls= function( billes){
        nb += billes;
    };
    this.setCase= function(i , j, n){
        plateau[i][j] = n ;
    };

    this.transformation= function(a){
        var t = [a[0],a[1]];
        return t;
    };

    this.getCase = function (t) {

        var a = 'a';

        var col = t[0].charCodeAt(0)- a.charCodeAt(0);
        var res = parseInt(t[1])-1;


        return plateau[res][col];
    };
    this.getCase2 = function (i , j) {

        return plateau[i][j];
    };



    this.getNbBalls= function(){
        return nb;
    };

    this.getCurrentPlayer = function () {
      return currentPlayer;
    };

    this.setCurrentPlayer = function(player){
        currentPlayer = player;
    };

    this.ChangeTurn = function(){
        if (that.getCurrentPlayer() == "White"){
            that.setCurrentPlayer("Black");
        }else{
            that.setCurrentPlayer("White");
        }
    };

    this.play= function (w) {
        var t = that.transformation(w);
        var a ='a';

        var res = t[0].charCodeAt(0)- a.charCodeAt(0);
        var col = parseInt(t[1])-1;

        if (that.getCase(t) != 0){
            throw new NotEmptyException("deja utilise");

        }
        that.setCase(res,col,that.getCurrentPlayer());
        that.setNbBalls(1);
        return true;

    };
    var init = function () {
        nb = 0;
        var i,j;
        for(i = 0 ; i < 6 ; i++){
            plateau[i]= [];
            for ( j = 0; j < 6 ; j++){
                that.setCase(i,j,0);
            }
        }
        currentPlayer = player1;
        size = 6;
    };
    this.getTabSize= function(){
        var i,j;
        var tmp;
        for( i = 'a' ; i < 'f' ; i++){
            for (j = 1; j < 6; j++){
                tmp = that.transformation([i,j]);

                if (that.getCase(tmp) != 0) return 1;
            }
        }

        return 0;
    };

    this.rotation = function(quart ){
        var i,j;
        var offsetI, offsetJ ;
        var tmp = new Array(3);
        switch (quart){
            case 1:
                offsetI = 0 ; offsetJ = 0;
                break;
            case 2 :
                offsetI = 0 ; offsetJ = size/2;
                break;
            case 3:
                offsetI = size/2 ; offsetJ = 0;
                break;
            case 4: offsetI = size/2 ; offsetJ = size/2;
        }

        for (var k = 0; k < 3 ; k++){
            tmp[k] = new Array(3);
        }

        for(i =0 ;i< 3 ; i++){
            for(j = 0; j< 3 ; j++){
                tmp[i][j] = this.getCase2((2-j)+offsetI,i+offsetJ);
            }
        }
        for(i =0 ;i< 3 ; i++){
            for(j = 0; j< 3 ; j++){
                this.setCase(i+offsetI,j+offsetJ,tmp[i][j]);

            }
        }

        that.ChangeTurn();
        return true;
    };

    this.antirotation= function (quart){
        var i,j;
        var tmp = new Array(3);
        var offsetI, offsetJ ;
        switch (quart){
            case 1:
                offsetI = 0 ; offsetJ = 0;
                break;
            case 2 :
                offsetI = 0 ; offsetJ = size/2;
                break;
            case 3:
                offsetI = size/2 ; offsetJ = 0;
                break;
            case 4: offsetI = size/2 ; offsetJ = size/2;
        }


        for (var k = 0; k < 3 ; k++){
            tmp[k] = new Array(3);
        }

        if (quart == 1){
            for(i =0 ;i< 3 ; i++){
                for(j = 0; j< 3 ; j++){
                    tmp[i][j] = this.getCase2(j+offsetI,(2-i)+offsetJ);
                }
            }
            for(i =0 ;i< 3 ; i++){
                for(j = 0; j< 3 ; j++){
                    this.setCase(i+offsetI,j+offsetJ,tmp[i][j]);
                    // tmp[i][j] = this.getCase(2-j,i);
                }
            }

        }
        that.ChangeTurn();
        return true;
    };
    init();


};


