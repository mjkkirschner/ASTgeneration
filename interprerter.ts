
import * as Lexer from './Lexer';
import * as AST from './AST';
import * as Parser from './Parser';

class NodeVisitor{
    constructor(){

    }
    //TODO implement this without the method lookup...
    //does javascript do virtual dispatch?
     visit(node:AST.AST)
     {
        var method_name = 'visit_' + node.constructor['name'];
        console.log(method_name);
        var visitor = this[method_name].bind(this);
        return visitor(node);
     }
}
export class Interpreter extends NodeVisitor {

    current_token: Lexer.Token;
    parser: Parser.parseMachine;

    constructor(parser: Parser.parseMachine) {
        super();
        this.parser = parser;
    }

    //****visitors*****
     visit_BinOp(node:AST.BinOp)
     {
        if (node.op.type == Lexer.PLUS){
            return this.visit(node.left) + this.visit(node.right)
        }
        else if (node.op.type == Lexer.MINUS){
               return this.visit(node.left) - this.visit(node.right)
        }
         else if (node.op.type == Lexer.MULT){
               return this.visit(node.left) * this.visit(node.right)
        }
         else if (node.op.type == Lexer.DIV){
               return this.visit(node.left) / this.visit(node.right)
        }
     }

    visit_Num(node:AST.Num)
    {
        return node.value
    }
        
    error() {
        throw Error('Invalid Syntax');
    }

    interpret(){
        var tree = this.parser.parse();
        return this.visit(tree);
    }
      


}