/**
 * Created by adubois on 01/10/15.
 */
function NotEmptyException(msg) {
    "use strict";
    this.message = msg;
    this.name = "Not Empty";
}

var Paleto = function (nbJ,mod) {
    "use strict";
    var plateau = [], nb = 0,
        player1 = "White",
        player2 = "Black",
        playerXl1 = "Red",
        playerXl2 = "Yellow",
        playerXl3 = "green",
        playerXl4 = "Blue",
        mode = mod,
        nbJoueur = nbJ,
        currentPlayer,
        that = this,
        size;

    this.setNbBalls = function (billes) {
        nb += billes;
    };
    this.setCase = function (i, j, n) {
        plateau[i][j] = n;
    };
    this.getmod = function () {
        return mode;
    };
    this.transformation = function (a) {
        var t = [a[0], a[1]];
        return t;
    };

    this.getCase = function (t) {
        var a = 'a', col, res;

        col = t[0].charCodeAt(0) - a.charCodeAt(0);
        res = parseInt(t[1]) - 1;
        return plateau[res][col];
    };
    this.getCase2 = function (i, j) {
        return plateau[i][j];
    };
    this.getNbBalls = function () {
        return nb;
    };
    this.getNbJoueur = function () {
        return nbJoueur;
    };
    this.getCurrentPlayer = function () {
        return currentPlayer;
    };
    this.setCurrentPlayer = function (player) {
        currentPlayer = player;
    };
    this.ChangeTurn = function () {
        if ( this.getNbJoueur() == 2 ) {
            this.changeNormal();
        } else {
            this.changeXL();
        }
    };
    this.changeNormal = function () {
        if (that.getCurrentPlayer() === "White") {
            that.setCurrentPlayer("Black");
        } else {
            that.setCurrentPlayer("White");
        }
    };
    this.changeXL = function () {
        if (this.getNbJoueur() == 3) {
            this.changeXL3();
        } else {
            this.changeXL4();
        }
    };
    this.changeXL3 = function () {
        switch (this.getCurrentPlayer()){
            case "Red":
                    this.setCurrentPlayer("Yellow");
                    break;
            case "Yellow":
                    this.setCurrentPlayer("Green");
            default :
                    this.setCurrentPlayer("Red");
                    break;
        }
    };
    this.changeXL4 = function () {
        switch (this.getCurrentPlayer()){
            case "Red":
                this.setCurrentPlayer("Yellow");
                break;
            case "Yellow":
                this.setCurrentPlayer("Blue");
            case "Green":
                this.setCurrentPlayer("Blue")
            default :
                this.setCurrentPlayer("Red");
                break;
        }
    };
    this.play = function (w) {
        var t = that.transformation(w), a = 'a', line, col;
        line = parseInt(t[1]) - 1;
        col = t[0].charCodeAt(0) - a.charCodeAt(0);
        if (that.getCase(t) !== 0) {
            throw new NotEmptyException("deja utilise");
        }

        that.setCase(line, col, that.getCurrentPlayer());
        that.setNbBalls(1);
        return true;
    };

    var initXL = function() {
        nb = 0;
        var line, col;
        for (line = 0; line < 9; line++) {
            plateau[line] = [];
            for (col = 0; col < 9; col++) {
                that.setCase(line, col, 0);
            }
        }
        currentPlayer = playerXl1;
        size = 9;
    };

    var init = function () {
        nb = 0;
        var line, col;
        for (line = 0; line < 6; line++) {
            plateau[line] = [];
            for (col = 0; col < 6; col++) {
                that.setCase(line, col, 0);
            }
        }
        currentPlayer = player1;
        size = 6;
    };

    this. getSize = function () {
        return size;
    };
    this.create2DArray = function() {
        var arr = new Array(3), col;
        for (col = 0; col < 3; col++) {
            arr[col] = new Array(3);
        }
        return arr;
    };
    this.subArray = function(offsetI, offsetJ) {
        var arr, line, col;
        arr = this.create2DArray();
        for (line = 0; line < 3; line++) {
            for (col = 0; col < 3; col++) {
                // console.log(this.getCase2((2 - col) + offsetI, line + offsetJ));
                arr[line][col] = this.getCase2((2 - col) + offsetI, line + offsetJ);
            }
        }
        return arr;
    };
    this.offsetLigne = function(offsetI){
        var res = offsetI * (3);
        return res;
    };
    this.offsetCol = function(offsetJ) {
        var res = offsetJ * (3);
        return res;
    };
    this.rotation = function (offsetI, offsetJ) {
        var line, col, tmp;
        offsetI = this.offsetLigne(offsetI);
        offsetJ = this.offsetCol(offsetJ);
        tmp = this.subArray(offsetI, offsetJ);

        for (line = 0; line < 3; line++) {
            for (col = 0; col < 3; col++) {
                this.setCase(line + offsetI, col + offsetJ, tmp[line][col]);
            }
        }
        that.ChangeTurn();
        return true;
    };

    this.antiSubRotation = function(offsetI, offsetJ) {
        var arr = this.create2DArray(), line, col;
        for (line = 0; line < 3; line++) {
            for (col = 0; col < 3; col++) {
                arr[line][col] = this.getCase2(col + offsetI, (2 - line) + offsetJ);
            }
        }
        return arr;
    };
    this.antirotation = function (offsetI, offsetJ) {
        var line, col, tmp;
        offsetI = this.offsetLigne(offsetI);
        offsetJ = this.offsetCol(offsetJ);
        tmp = this.antiSubRotation(offsetI, offsetJ);

        for (line = 0; line < 3; line++) {
            for (col = 0; col < 3; col++) {
                this.setCase(line + offsetI, col + offsetJ, tmp[line][col]);
            }
        }

        that.ChangeTurn();
        return true;
    };
    this.null = function () {
        if(this.getNbBalls() != 36) {
            return true;
        }
        return false;
    };
    this.Windiag = function (coup) {
        var t = this.transformation(coup), a = 'a', col, ligne;
        col = t[0].charCodeAt(0) - a.charCodeAt(0);
        ligne = parseInt(t[1]) - 1;
        if((this.cptAlignDiagUp(ligne, col) + this.cptAlignDiagDown(ligne, col) - 1) >= 5) {
            return true;
        }
        else{

            return false;
        }
    };
    this.WinHorizontal = function (coup) {
        var t = this.transformation(coup), a = 'a', col, ligne;
        col = t[0].charCodeAt(0) - a.charCodeAt(0);
        ligne = parseInt(t[1]) - 1;

        if((this.cptAlignRight(ligne, col) + this.cptAlignLeft(ligne, col) - 1)  >= 5) {
            return true;
        }
        else{

            return false;
        }
    };
    this.WinVertical = function (coup) {
        var t = this.transformation(coup), a = 'a', col, ligne;
        col = t[0].charCodeAt(0) - a.charCodeAt(0);
        ligne = parseInt(t[1]) - 1;

        if((this.cptAlignUp(ligne, col) +this.cptAlignBottom(ligne, col) - 1)  >= 5) {
            return true;
        }
        return false;
    };
    this.cptAlignUp = function (ligne,col) {
        if (this.getCase2(ligne, col) != undefined && this.getCase2(ligne, col) == this.getCurrentPlayer() ) {
            return 1 + this.cptAlignBottom(--ligne, col);
        }
        return 0;
    };
    this.cptAlignBottom = function (ligne,col) {
        if(this.getCase2(ligne,col) != undefined &&this.getCase2(ligne,col) == this.getCurrentPlayer() ){
            return 1+ this.cptAlignBottom(++ligne, col);
        }
        return 0;
    };
    this.cptAlignLeft = function (ligne, col) {
        if (this.getCase2(ligne, col) != undefined &&this.getCase2(ligne, col) == this.getCurrentPlayer() ) {
            return 1 + this.cptAlignLeft(ligne, --col);
        }
        return 0;
    };
    this.cptAlignRight = function (ligne,col) {
        if(this.getCase2(ligne,col) != undefined &&this.getCase2(ligne,col) == this.getCurrentPlayer() ){
            return 1+ this.cptAlignRight(ligne,++col);
        }
        return 0;
    };
    this.cptAlignDiagUp = function (ligne,col) {

        if (ligne >= 0 && col >= 0){
            if(this.getCase2(ligne,col) != undefined &&this.getCase2(ligne,col) == this.getCurrentPlayer() ){
                return 1+ this.cptAlignDiagUp(--ligne,--col);
            }
            else{
                return 0;
            }
        }
        return 0;
    };
    this.cptAlignDiagDown = function (ligne,col) {
        if(ligne < size && col< size){
            if(this.getCase2(ligne,col) != undefined &&this.getCase2(ligne,col) == this.getCurrentPlayer() ){
                return 1+ this.cptAlignDiagDown(++ligne,++col);
            }
            else{
                return 0;
            }
        }
        return 0;
    };
    this.wichPartLr= function (part) {
        if (part == 'l'){
            return 0;
        }
        if (part == 'r'){
            return 1;
        }
    };
    this.wichPart= function (part) {
        var res = new Array (2);
        if (part[0] == 't') { // top
            res[0] = 0;
        }
        else { // bottom
            res[0] = 1;
        }
        res[1] =  this.wichPartLr(part[1]);
        return res;
    };
    this.put = function(coup){ //jshint ignore:line
        var w = new Array(2), part = new Array(2), offsets = new Array(2);
        w[0]=coup[0];
        w[1] = coup[1];
        part[0] =coup[3];
        part[1] =coup[4];
        offsets = this.wichPart(part);
        this.play(w);
        if (coup[2] == 'c'){
            this.rotation(offsets[0],offsets[1]);
        }else{
            this.antirotation(offsets[0],offsets[1]);
        }
        if(this.Windiag(w) || this.WinHorizontal(w) || this.WinVertical(w)){
            console.log("on as gagne");
        }
    };


    if (this.getmod() != undefined) {
        initXL();
    }else{
        init();
    }


};



