
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
export var ID = 'ID';
export var ASSIGN = '=';
export var SEMI = ';';

//not going to use these pascal tokens
//let RESERVED_KEYWORDS: {BEGIN:Token,END:Token};
//RESERVED_KEYWORDS.BEGIN = new Token('BEGIN', 'BEGIN')
//RESERVED_KEYWORDS.END = new Token('END', 'END')




function isSpace(ch: any): boolean {
    if ((ch == ' ') || (ch == '\t') || (ch == '\n')) {
        return true;
    }
    return false;
}


function isNumeric(obj: any) {
    return !isNaN(obj - parseFloat(obj));
}

function isAlNum(obj: any):boolean {
    return /^[a-z0-9]+$/i.test(obj);
}

function isAlpha(str) {
  return /^[a-zA-Z]+$/.test(str);
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
    RESERVED_KEYWORDS: {};



    constructor(text: string) {
        // client string input, e.g. "3 + 5", "12 - 5", etc
        this.text = text;
        // self.pos is an index into self.text
        this.position = 0;
        // current token instance
        this.current_char = this.text[this.position];
        this.RESERVED_KEYWORDS = {};
    }

    peek():string{
    let peek_pos = this.position + 1
    if (peek_pos > (this.text.length - 1))
        return null;
    else{
        return this.text[peek_pos]
    }
}
   
    id():Token{


    let result = ''
    while(this.current_char != null && isAlNum(this.current_char)){

        result += this.current_char;
        this.advance();
    }
    
    let token = new Token(ID, result);
    if(result in this.RESERVED_KEYWORDS){
        
        token = this.RESERVED_KEYWORDS[result];
    }
 
    return token;
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


            if(isAlpha(this.current_char))
            {
                return this.id();
            }
            if(this.current_char == "=")
            {
               this.advance();
               return new Token(ASSIGN,'=');
            }
             if(this.current_char == ";")
            {
               this.advance();
               return new Token(SEMI,';');
            }

            if (isSpace(this.current_char)) {
                this.skip_whitespace();
                continue;
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


