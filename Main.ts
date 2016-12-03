/// <amd-dependency path="./node_modules/sigma/build/sigma.min"/>
/// <amd-dependency path="./node_modules/jquery/dist/jquery.min"/>

import * as Parser from './Parser';
import * as Lexer from './Lexer';
import * as Interpreter from './interprerter';
import * as AST from './AST';

function main() {
    console.log("starting");
    

$(document).ready( ()=> 
{
 console.log("inside ready func");
var lexer = new Lexer.Lexer("x=100; ");
    console.log(lexer);
    console.log(Parser);
    var parser = new Parser.parseMachine(lexer);
    //var interpreter = new Interpreter.Interpreter(parser);

    var tree = parser.parse();
    console.log(tree);
    
    let nodes = [tree];
    let edges = [];

    // we need to create a walker or visitor interface 
    // that works on any AST node type and runs some method
    // on each of its children...we also want to collect edges 
    // somehow

    //another alternatie is to create a children property on the base AST class
    // and have other types override this with their own children so there
    // is a common interface....


    var i,
    s,
    N = 100,
    E = 500,
    g = {
      nodes: [],
      edges: []
    };


// Generate a random graph:
for (i = 0; i < N; i++)
  g.nodes.push({
    id: 'n' + i,
    label: 'Node ' + i,
    x: Math.random(),
    y: Math.random(),
    size: 6,
    color: '#666'
  });
for (i = 0; i < E; i++)
  g.edges.push({
    id: 'e' + i,
    source: 'n' + (Math.random() * N | 0),
    target: 'n' + (Math.random() * N | 0),
    size: Math.random(),
    color: '#ccc'
  });
// Instantiate sigma:
s = new sigma(
    {
  graph: g,
  container: $('#graph-container').get(0)
    });
}
);
    //var result = interpreter.interpret();
    //console.log(result);
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