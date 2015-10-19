/**
 * Created by adubois on 01/10/15.
 */
function NotEmptyException(msg) {
    "use strict";
    this.message = msg;
    this.name = "Not Empty";
}

var Paleto = function () {
    "use strict";
    var plateau = [], nb = 0,
        player1 = "White",
        player2 = "Black",
        currentPlayer,
        that = this,
        size;
    this.setNbBalls = function (billes) {
        nb += billes;
    };
    this.setCase = function (i, j, n) {
        plateau[i][j] = n;
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
    this.getCurrentPlayer = function () {
        return currentPlayer;
    };
    this.setCurrentPlayer = function (player) {
        currentPlayer = player;
    };
    this.ChangeTurn = function () {
        if (that.getCurrentPlayer() === "White") {
            that.setCurrentPlayer("Black");
        } else {
            that.setCurrentPlayer("White");
        }
    };
    this.play = function (w) {
        var t = that.transformation(w), a = 'a', res, col;
        res = t[0].charCodeAt(0) - a.charCodeAt(0);
        col = parseInt(t[1]) - 1;
        if (that.getCase(t) !== 0) {
            throw new NotEmptyException("deja utilise");
        }
        that.setCase(res, col, that.getCurrentPlayer());
        that.setNbBalls(1);
        return true;
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
    /*this.getTabSize = function () {
        var i, j, tmp;
        for (i = 'a'; i < 'f'; i++) {
            for (j = 1; j < 6; j++) {
                tmp = that.transformation([i, j]);
                if (that.getCase(tmp) !== 0) return 1;
            }
        }
        return 0;
    };*/
   /* this.offset = function (quart) {
        var offsetI, offsetJ;
        switch (quart) {
            case 1 :
                offsetI = 0;
                offsetJ = 0;
                break;
            case 2 :
                offsetI = 0;
                offsetJ = size / 2;
                break;
            case 3 :
                offsetI = size / 2;
                offsetJ = 0;
                break;
            case 4 :
                offsetI = size / 2;
                offsetJ = size / 2;
                break;
        }
        return [offsetI, offsetJ];
    };*/
    this.create2DArray = function(){
        var arr = new Array(3), col;
        for (col = 0; col < 3; col++) {
            arr[col] = new Array(3);
        }
        return arr;
    };
    this.subArray = function(offsetI ,offsetJ) {
        var arr, line, col;
        arr = this.create2DArray();
        for (line = 0; line < 3; line++) {
            for (col = 0; col < 3; col++) {
                arr[line][col] = this.getCase2((2 - col) + offsetI, line + offsetJ);
            }
        }
        return arr;
    };
    this.rotation = function (offsetI, offsetJ) {
        var line, col, tmp ;

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

        tmp = this.antiSubRotation(offsetI,offsetJ);

            for (line = 0; line < 3; line++) {
                for (col = 0; col < 3; col++) {
                    this.setCase(line + offsetI, col + offsetJ, tmp[line][col]);
                }
            }

        that.ChangeTurn();
        return true;
    };
    init();


};


