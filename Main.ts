import * as Parser from './Parser';
import * as Lexer from './Lexer';
import * as Interpreter from './interprerter';

function main() {
    console.log("starting");
    var lexer = new Lexer.Lexer("x=100; ");
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
};

main();