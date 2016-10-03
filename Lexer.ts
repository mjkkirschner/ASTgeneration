
// Token types
// EOF (end-of-file) token is used to indicate that
// there is no more input left for lexical analysis
var INTEGER = 'INTEGER';
var PLUS = 'PLUS';
var MINUS = 'MINUS';
var DIV = 'DIV';
var MULT = 'MULT';
var EOF = 'EOF';
var RPAREN = ')';
var LPAREN = '(';

function isSpace(ch: any): boolean {
    if ((ch == ' ') || (ch == '\t') || (ch == '\n')) {
        return true;
    }
    return false;

}


function isNumeric(obj: any) {
    return !isNaN(obj - parseFloat(obj));
}


class Token {
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

class Lexer {
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

class Interpreter {


    current_token: Token;
    lexer: Lexer;

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.current_token = this.lexer.get_next_token();

        // current token instance
    }

    error() {
        throw Error('Invalid Syntax');
    }



    eat(token_type: any) {
        //# compare the current token type with the passed token
        //# type and if they match then "eat" the current token
        //# and assign the next token to the self.current_token,
        //# otherwise raise an exception.
        if (this.current_token.type == token_type) {
            this.current_token = this.lexer.get_next_token()
        }

        else {
            this.error()
        }

    }


    factor(): number {
        let token = this.current_token

        if (token.type == INTEGER) {
            this.eat(INTEGER)
            return token.value;
        }


        else if (token.type == LPAREN) {
            this.eat(LPAREN)
            let result = this.expr()
            this.eat(RPAREN)
            return result
        }


    }


    expr(): number {

        let result = this.term();

        //while the type of token is in the list of valid token types
        while ([PLUS, MINUS].indexOf(this.current_token.type) > -1) {
            let token = this.current_token;

            if (token.type == PLUS) {
                this.eat(PLUS)
                result = result + this.term();
            }
            else if (token.type == MINUS) {
                this.eat(MINUS)
                result = result - this.term();
            }

        }
        return result;
    }

    term() {
        //"""term : factor ((MUL | DIV) factor)*"""
        let result = this.factor();

        while ([MULT, DIV].indexOf(this.current_token.type) > -1) {
            let token = this.current_token;
            if (token.type == MULT) {
                this.eat(MULT)
                result = result * this.factor();

            }

            else if (token.type == DIV) {
                this.eat(DIV)
                result = result / this.factor()
            }
        }
        return result
    }
}

function main() {
    console.log("starting");
    var lexer = new Lexer("(3+6)*100");
    var interpreter = new Interpreter(lexer);
    var result = interpreter.expr();
    console.log(result);

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