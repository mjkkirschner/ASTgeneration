"use strict";
var Parser = require('./Parser');
var Lexer = require('./Lexer');
var Interpreter = require('./interprerter');
function main() {
    console.log("starting");
    var lexer = new Lexer.Lexer("(3+6)*100");
    console.log(lexer);
    console.log(Parser);
    var parser = new Parser.parseMachine(lexer);
    var interpreter = new Interpreter.Interpreter(parser);
    var result = interpreter.interpret();
    console.log(result);
    //var result = interpreter.expr();
    //console.log(tree);
    /*      var stdin = process.stdin;
  
  stdin.addListener("data", function(d) {
      try{
      // note:  d is an object, and when converted to a string it will
      // end with a linefeed.  so we (rather crudely) account for that
      // with toString() and then trim()
      console.log("you entered: [" +
          d.toString().trim() + "]");
  
           var interpreter = new Interpreter(d.toString());
          var result = interpreter.expr();
          console.log(result);
      }
      catch(ex){
           throw new Error(EOF);
      }
  
    });
    */
}
;
main();
//# sourceMappingURL=Main.js.map