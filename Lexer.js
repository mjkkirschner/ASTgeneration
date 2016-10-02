// Token types
// EOF (end-of-file) token is used to indicate that
// there is no more input left for lexical analysis
var INTEGER = 'INTEGER';
var PLUS = 'PLUS';
var MINUS = 'MINUS';
var EOF = 'EOF';
function isSpace(ch) {
    if ((ch == ' ') || (ch == '\t') || (ch == '\n')) {
        return true;
    }
    return false;
}
function isNumeric(obj) {
    return !isNaN(obj - parseFloat(obj));
}
var Token = (function () {
    function Token(type, value) {
        //token type: INTEGER, PLUS, MINUS, or EOF
        this.type = type;
        //token value: non-negative integer value, '+', '-', or None
        this.value = value;
    }
    ///"""String representation of the class instance.
    Token.prototype.toString = function () {
        return this.toString();
    };
    return Token;
}());
var Interpreter = (function () {
    function Interpreter(text) {
        // client string input, e.g. "3 + 5", "12 - 5", etc
        this.text = text;
        // self.pos is an index into self.text
        this.position = 0;
        // current token instance
        this.current_token = null;
        this.current_char = this.text[this.position];
    }
    Interpreter.prototype.error = function () {
        throw Error('Error parsing input');
    };
    Interpreter.prototype.advance = function () {
        //"""Advance the 'pos' pointer and set the 'current_char' variable."""
        this.position += 1;
        if (this.position > (this.text).length - 1) {
            this.current_char = null; // Indicates end of input
        }
        else {
            this.current_char = this.text[this.position];
        }
    };
    Interpreter.prototype.skip_whitespace = function () {
        while (this.current_char != null && isSpace(this.current_char))
            this.advance();
    };
    Interpreter.prototype.integer = function () {
        ///"""Return a (multidigit) integer consumed from the input."""
        var result = '';
        while (this.current_char != null && isNumeric(this.current_char)) {
            result += this.current_char;
            this.advance();
        }
        return new Number(result);
    };
    //"""Lexical analyzer (also known as scanner or tokenizer)
    //This method is responsible for breaking a sentence
    //apart into tokens.
    //"""
    Interpreter.prototype.get_next_token = function () {
        while (this.current_char != null) {
            if (isSpace(this.current_char)) {
                this.skip_whitespace();
            }
            if (isNumeric(this.current_char)) {
                return new Token(INTEGER, this.integer());
            }
            if (this.current_char == '+') {
                this.advance();
                return new Token(PLUS, '+');
            }
            if (this.current_char == '-') {
                this.advance();
                return new Token(MINUS, '-');
            }
            this.error();
        }
        return new Token(EOF, null);
    };
    Interpreter.prototype.eat = function (token_type) {
        //# compare the current token type with the passed token
        //# type and if they match then "eat" the current token
        //# and assign the next token to the self.current_token,
        //# otherwise raise an exception.
        if (this.current_token.type == token_type) {
            this.current_token = this.get_next_token();
        }
        else {
            this.error();
        }
    };
    Interpreter.prototype.expr = function () {
        //"""Parser / Interpreter
        var result = 0;
        //expr -> INTEGER PLUS INTEGER
        //expr -> INTEGER MINUS INTEGER
        //"""
        //# set current token to the first token taken from the input
        this.current_token = this.get_next_token();
        //# we expect the current token to be an integer
        var left = this.current_token;
        this.eat(INTEGER);
        // # we expect the current token to be either a '+' or '-'
        var op = this.current_token;
        if (op.type == PLUS) {
            this.eat(PLUS);
        }
        else {
            this.eat(MINUS);
        }
        // # we expect the current token to be an integer
        var right = this.current_token;
        this.eat(INTEGER);
        //# after the above call the self.current_token is set to
        //# EOF token
        //# at this point either the INTEGER PLUS INTEGER or
        //# the INTEGER MINUS INTEGER sequence of tokens
        //# has been successfully found and the method can just
        //# return the result of adding or subtracting two integers,
        //# thus effectively interpreting client input
        if (op.type == PLUS) {
            result = left.value + right.value;
        }
        else {
            result = left.value - right.value;
        }
        return result;
    };
    return Interpreter;
}());
function main() {
    var interpreter = new Interpreter("3+ 3");
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
}
;
main();
//# sourceMappingURL=Lexer.js.map