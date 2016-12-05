/// <amd-dependency path="./node_modules/jquery/dist/jquery.min"/>

//cant really load sigma stuff with AMD since sigma will finish loading after the plugins which require it is already loaded...
//and they are not set up for AMD... (note only two slashes below)
// <amd-dependency path="./node_modules/sigma/build/sigma.min"/>
// <amd-dependency path ="./node_modules/sigma/plugins/sigma.layout.forceAtlas2/worker.js">
// <amd-dependency path ="./node_modules/sigma/plugins/sigma.layout.forceAtlas2/supervisor.js">

import * as Parser from './Parser';
import * as Lexer from './Lexer';
import * as Interpreter from './interprerter';
import * as AST from './AST';



class TreeWalker {
  OutNodes: any[];
  OutEdges: any[];
  tree: AST.AST;
  constructor(tree: AST.AST) {
    this.OutNodes = [];
    this.OutEdges = [];
    this.tree = tree;
  }

  public ComputeSigmaNodes(): {nodes:any[],edges:any[]} {
    let rootNode = {
          id: this.tree.ID.toString(),
          label: this.tree.constructor['name'],
          x: Math.random(),
          y: Math.random(),
          size: 6,
          color: '#666'

        }
        this.OutNodes.push(rootNode);
    this.internalvisit(this.tree);
    return {nodes:this.OutNodes,edges:this.OutEdges};
  }

  private internalvisit(node: AST.AST) {

    if (node.children) {
      for (let child of node.children) {
        let newNode = {
          id: child.ID.toString(),
          label: child.constructor['name'],
          x: Math.random(),
          y: Math.random(),
          size: 6,
          color: '#666'

        }
        console.log(newNode);
        this.OutNodes.push(newNode);

        //push edges from the parent node to each current
        //child we just created
        let newEdge = {
          id: node.ID.toString() + child.ID.toString(),
          source: node.ID.toString(),
          target: child.ID.toString(),
          size: Math.random(),
          color: '#ccc'
        }
        console.log(newEdge);
        this.OutEdges.push(newEdge);
        this.internalvisit(child);

      }

    }
  }


}



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
    
  var treewWalker = new TreeWalker(tree);
  var sigmaData = treewWalker.ComputeSigmaNodes();


    var i,
    s,
    N = 100,
    E = 500,
    g = {
      nodes:sigmaData.nodes,
      edges: sigmaData.edges
    };

// Instantiate sigma:
s = new sigma(
    {
  graph: g,
  container: $('#graph-container').get(0)
    });
    s.startForceAtlas2({worker:false,barnesHutOptimize:false});
    setTimeout(()=> {s.stopForceAtlas2()},1000);
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