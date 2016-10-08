
import * as AST from './AST';
import * as Parser from './Parser';


// Token types
// EOF (end-of-file) token is used to indicate that
// there is no more input left for lexical analysis
export var INTEGER = 'INTEGER';
export var PLUS = 'PLUS';
export var MINUS = 'MINUS';
export var DIV = 'DIV';
export var MULT = 'MULT';
export var EOF = 'EOF';
export var RPAREN = ')';
export var LPAREN = '(';

function isSpace(ch: any): boolean {
    if ((ch == ' ') || (ch == '\t') || (ch == '\n')) {
        return true;
    }
    return false;

}


function isNumeric(obj: any) {
    return !isNaN(obj - parseFloat(obj));
}


export class Token {
    type: string;
    value: any;
    constructor(type: string, value: any) {
        //token type: INTEGER, PLUS, MINUS, or EOF
        this.type = type;
        //token value: non-negative integer value, '+', '-', or None
        this.value = value;
    }
    ///"""String representation of the class instance.
    public toString() {
        return this.toString();
    }
}

export class Lexer {
    text: string;
    position: number;
    current_char: string;

    constructor(text: string) {
        // client string input, e.g. "3 + 5", "12 - 5", etc
        this.text = text;
        // self.pos is an index into self.text
        this.position = 0;
        // current token instance
        this.current_char = this.text[this.position];
    }

    error() {
        throw Error('Invalid Character')
    }


    advance() {
        //"""Advance the 'pos' pointer and set the 'current_char' variable."""
        this.position += 1;
        if (this.position > (this.text).length - 1) {
            this.current_char = null;  // Indicates end of input
        }

        else {
            this.current_char = this.text[this.position];
        }

    }


    skip_whitespace() {
        while (this.current_char != null && isSpace(this.current_char))
            this.advance();
    }


    integer() {
        ///"""Return a (multidigit) integer consumed from the input."""
        let result = '';
        while (this.current_char != null && isNumeric(this.current_char)) {
            result += this.current_char;
            this.advance();
        }

        return new Number(result)
    }

    //"""Lexical analyzer (also known as scanner or tokenizer)
    //This method is responsible for breaking a sentence
    //apart into tokens.
    //"""
    get_next_token() {

        while (this.current_char != null) {

            if (isSpace(this.current_char)) {
                this.skip_whitespace();
            }
            if (isNumeric(this.current_char)) {
                return new Token(INTEGER, this.integer())
            }
            if (this.current_char == '+') {
                this.advance()
                return new Token(PLUS, '+')
            }
            if (this.current_char == '-') {

                this.advance()
                return new Token(MINUS, '-')
            }
            if (this.current_char == '*') {

                this.advance()
                return new Token(MULT, '*')

            }
            if (this.current_char == '/') {

                this.advance()
                return new Token(DIV, '/')
            }
            if (this.current_char == '(') {
                this.advance()
                return new Token(LPAREN, '(')

            }
            if (this.current_char == ')') {

                this.advance()
                return new Token(RPAREN, ')')
            }
            this.error();
        }

        return new Token(EOF, null)

    }
}

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

    current_token: Token;
    parser: Parser.parseMachine;

    constructor(parser: Parser.parseMachine) {
        super();
        this.parser = parser;
    }

    //****visitors*****
     visit_BinOp(node:AST.BinOp)
     {
        if (node.op.type == PLUS){
            return this.visit(node.left) + this.visit(node.right)
        }
        else if (node.op.type == MINUS){
               return this.visit(node.left) - this.visit(node.right)
        }
         else if (node.op.type == MULT){
               return this.visit(node.left) * this.visit(node.right)
        }
         else if (node.op.type == DIV){
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

