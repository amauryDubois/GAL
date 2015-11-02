/**
 * Created by adubois on 01/10/15.
 */
MonTestCase = TestCase("MonTestCase");

MonTestCase.prototype.testPlateauVide = function(){
    var paleto = new Paleto(2);

    assertTrue(paleto.getNbBalls() == 0);
};


MonTestCase.prototype.testBegin = function(){
    var paleto = new Paleto(2);
    assertTrue(paleto.getCurrentPlayer() == "White");
};

MonTestCase.prototype.testPlace = function(){
    var paleto = new Paleto(2);
    assertTrue(paleto.play("a1") == true);
};

MonTestCase.prototype.testnewNbBall = function(){
    var paleto = new Paleto(2);
    paleto.play("a1");
    assertTrue(paleto.getNbBalls() == 1);
};

MonTestCase.prototype.testnewPosition = function(){
    var paleto = new Paleto(2);
    paleto.play("a1");

    paleto.rotation(0,0);

    assertTrue(paleto.getCase("c1") == "White");
    assertTrue(paleto.getCurrentPlayer() == "Black");
};

MonTestCase.prototype.testBlackPlayNb = function(){
    var paleto = new Paleto(2);
    paleto.play("a1");
    paleto.rotation(0,0);
    paleto.play("a1");
    assertTrue(paleto.getNbBalls() == 2);
    assertTrue(paleto.getCase("a1") == "Black");
};

MonTestCase.prototype.testBlackPlayRot = function(){
    var paleto = new Paleto(2);
    paleto.play("a1");
    paleto.rotation(0,0);
    paleto.play("a1");
    paleto.antirotation(0,0);
    assertTrue(paleto.getCase("a1") == "White");
};

MonTestCase.prototype.testBlackPlayException = function(){
    var paleto = new Paleto(2);
    paleto.play("a1");
    paleto.rotation(0,0);
    paleto.play("a1");
    paleto.antirotation(0,0);
    assertTrue(paleto.getCase("a1") == "White");
    assertException(function(){paleto.play("a1")},"Not Empty");
};

MonTestCase.prototype.testlittlegame = function(){
    var paleto = new Paleto(2);

    paleto.play("a1");
    paleto.rotation(0,0);

    paleto.play("a1");
    paleto.antirotation(0,0);

    paleto.play("b1");

    paleto.rotation(0,0);

    paleto.play("a2");
    paleto.antirotation(0,0);

    paleto.play("c1");
    paleto.rotation(0,0);

    paleto.play("a3");
    paleto.antirotation(0,0);

    paleto.play("d1");
    paleto.antirotation(0,1);

    paleto.play("f3");
    paleto.rotation(0,1);


    assertTrue(paleto.getNbBalls() == 8);
    assertTrue(paleto.getCase("a1") == "White");
    assertTrue(paleto.getCase("b1") == "White");
    assertTrue(paleto.getCase("c1") == "White");
    assertTrue(paleto.getCase("d1") == "White");
    assertTrue(paleto.getCase("a3") == "Black");
    assertTrue(paleto.getCase("b3") == "Black");
    assertTrue(paleto.getCase("c3") == "Black");
    assertTrue(paleto.getCase("d3") == "Black");

};

MonTestCase.prototype.testlittle2game = function() {
    var paleto = new Paleto(2);

    paleto.play("a1");
    paleto.rotation(0,0);

    paleto.play("a1");
    paleto.antirotation(0,0);

    paleto.play("b1");
    paleto.rotation(0,0);

    paleto.play("a2");
    paleto.antirotation(0,0);

    paleto.play("c1");
    paleto.rotation(0,0);

    paleto.play("a3");
    paleto.antirotation(0,0);

    paleto.play("d1");
    paleto.antirotation(0,1);

    paleto.play("f3");
    paleto.rotation(0,1);

    paleto.play("e1");
    // paleto.rotation(0,3);

    assertTrue(paleto.getNbBalls() == 9);
    assertTrue(paleto.getCase("a1") == "White");
    assertTrue(paleto.getCase("b1") == "White");
    assertTrue(paleto.getCase("c1") == "White");
    assertTrue(paleto.getCase("d1") == "White");
    assertTrue(paleto.getCase("a3") == "Black");
    assertTrue(paleto.getCase("b3") == "Black");
    assertTrue(paleto.getCase("c3") == "Black");
    assertTrue(paleto.getCase("d3") == "Black");
    assertTrue(paleto.WinHorizontal("e1") == true);
};

MonTestCase.prototype.testlittle3game = function() {
    var paleto = new Paleto(2);

    paleto.put("c4cbl");
    paleto.put("d4abr");
    paleto.put("c3ctl");
    paleto.put("c3ctl");
    paleto.put("c4cbl");
    paleto.put("e5cbr");
    paleto.put("b1ctl");
    paleto.put("b2ctr");
    paleto.put("c4cbl");
    paleto.play("c3");
    paleto.Windiag("c3");
};

MonTestCase.prototype.testlittle3game = function() {
    var paleto = new Paleto(2);
    var coups = new Array();

    coups =
        ["a1cbl" ,"d1cbr" ,"b1cbl" ,"e1cbr" ,"c1cbl" ,"f1cbr",
            "a2cbl" ,"d2cbr" ,"b2cbl" ,"e2cbr" ,"c2cbl" ,"f2cbr",
            "a3cbl" ,"d3cbr" ,"b3cbl" ,"e3cbr" ,"c3cbl" ,"f3cbr",
            "b5ctl" ,"a4ctr" ,"e4ctl" ,"b4ctr" ,"f4ctl" ,"d4ctr",
            "d5ctl" ,"a5ctr" ,"f5ctl" ,"c4ctr" ,"a6ctl" ,"c5ctr",
            "b6ctl" ,"e5ctr" ,"d6ctl" ,"c6ctr" ,"f6ctl" ,"e6ct"];
    for (i in coups ){
        paleto.put(coups[i]);

    }
    assertFalse(paleto.null());
};

MonTestCase.prototype.testXlgame = function() {
    var paleto = new Paleto(4,"XL");
    paleto.play("d1");
    paleto.rotation(2,0);
    paleto.play("i9");
    paleto.antirotation(2,2);
    console.log(paleto.getCase2(6,8));
    console.log(paleto.getCurrentPlayer());
    assertTrue(paleto.getNbBalls() == 2);
};