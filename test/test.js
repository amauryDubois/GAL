/**
 * Created by adubois on 01/10/15.
 */
MonTestCase = TestCase("MonTestCase");

MonTestCase.prototype.testPlateauVide = function(){
    var paleto = new Paleto();

    assertTrue(paleto.getNbBalls() == 0);
};


MonTestCase.prototype.testBegin = function(){
    var paleto = new Paleto();
    assertTrue(paleto.getCurrentPlayer() == "White");
};

MonTestCase.prototype.testPlace = function(){
    var paleto = new Paleto();
    assertTrue(paleto.play("a1") == true);
};

MonTestCase.prototype.testnewNbBall = function(){
    var paleto = new Paleto();
    paleto.play("a1");
    assertTrue(paleto.getNbBalls() == 1);
};

MonTestCase.prototype.testnewPosition = function(){
    var paleto = new Paleto();
    paleto.play("a1");

    paleto.rotation(0,0,1);
    assertTrue(paleto.getCase("c1") == "White");
    assertTrue(paleto.getCurrentPlayer() == "Black");
};
/*
MonTestCase.prototype.testnewPosition2 = function(){
    var paleto = new Paleto();
    paleto.play("d1");
    paleto.rotation(2);
    assertTrue(paleto.getCase("d1") == 0);
};

MonTestCase.prototype.testnewPosition4 = function(){
    var paleto = new Paleto();
    paleto.play("a1");
    paleto.rotation(3);

    assertTrue(paleto.getCase("a1") == "White");
};

MonTestCase.prototype.testnewPosition3 = function(){
    var paleto = new Paleto();
    paleto.play("a1");
    paleto.rotation(4);
    assertTrue(paleto.getCurrentPlayer() == "Black");
};*/

MonTestCase.prototype.testBlackPlayNb = function(){
    var paleto = new Paleto();
    paleto.play("a1");
    paleto.rotation(0,0,1);
    paleto.play("a1");
    assertTrue(paleto.getNbBalls() == 2);
    assertTrue(paleto.getCase("a1") == "Black");
};

MonTestCase.prototype.testBlackPlayRot = function(){
    var paleto = new Paleto();
    paleto.play("a1");
    paleto.rotation(0,0,1);
    paleto.play("a1");
    paleto.antirotation(0,0,1);
    assertTrue(paleto.getCase("a1") == "White");
};

MonTestCase.prototype.testBlackPlayException = function(){
    var paleto = new Paleto();
    paleto.play("a1");
    paleto.rotation(0,0,1);
    paleto.play("a1");
    paleto.antirotation(0,0,1);
    assertTrue(paleto.getCase("a1") == "White");
    assertException(function(){paleto.play("a1")},"Not Empty");
};