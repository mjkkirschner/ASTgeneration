"use strict";
// Token types
// EOF (end-of-file) token is used to indicate that
// there is no more input left for lexical analysis
exports.INTEGER = 'INTEGER';
exports.PLUS = 'PLUS';
exports.MINUS = 'MINUS';
exports.DIV = 'DIV';
exports.MULT = 'MULT';
exports.EOF = 'EOF';
exports.RPAREN = ')';
exports.LPAREN = '(';
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
exports.Token = Token;
var Lexer = (function () {
    function Lexer(text) {
        // client string input, e.g. "3 + 5", "12 - 5", etc
        this.text = text;
        // self.pos is an index into self.text
        this.position = 0;
        // current token instance
        this.current_char = this.text[this.position];
    }
    Lexer.prototype.error = function () {
        throw Error('Invalid Character');
    };
    Lexer.prototype.advance = function () {
        //"""Advance the 'pos' pointer and set the 'current_char' variable."""
        this.position += 1;
        if (this.position > (this.text).length - 1) {
            this.current_char = null; // Indicates end of input
        }
        else {
            this.current_char = this.text[this.position];
        }
    };
    Lexer.prototype.skip_whitespace = function () {
        while (this.current_char != null && isSpace(this.current_char))
            this.advance();
    };
    Lexer.prototype.integer = function () {
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
    Lexer.prototype.get_next_token = function () {
        while (this.current_char != null) {
            if (isSpace(this.current_char)) {
                this.skip_whitespace();
            }
            if (isNumeric(this.current_char)) {
                return new Token(exports.INTEGER, this.integer());
            }
            if (this.current_char == '+') {
                this.advance();
                return new Token(exports.PLUS, '+');
            }
            if (this.current_char == '-') {
                this.advance();
                return new Token(exports.MINUS, '-');
            }
            if (this.current_char == '*') {
                this.advance();
                return new Token(exports.MULT, '*');
            }
            if (this.current_char == '/') {
                this.advance();
                return new Token(exports.DIV, '/');
            }
            if (this.current_char == '(') {
                this.advance();
                return new Token(exports.LPAREN, '(');
            }
            if (this.current_char == ')') {
                this.advance();
                return new Token(exports.RPAREN, ')');
            }
            this.error();
        }
        return new Token(exports.EOF, null);
    };
    return Lexer;
}());
exports.Lexer = Lexer;
var Interpreter = (function () {
    function Interpreter(lexer) {
        this.lexer = lexer;
        this.current_token = this.lexer.get_next_token();
        // current token instance
    }
    Interpreter.prototype.error = function () {
        throw Error('Invalid Syntax');
    };
    Interpreter.prototype.eat = function (token_type) {
        //# compare the current token type with the passed token
        //# type and if they match then "eat" the current token
        //# and assign the next token to the self.current_token,
        //# otherwise raise an exception.
        if (this.current_token.type == token_type) {
            this.current_token = this.lexer.get_next_token();
        }
        else {
            this.error();
        }
    };
    Interpreter.prototype.factor = function () {
        var token = this.current_token;
        if (token.type == exports.INTEGER) {
            this.eat(exports.INTEGER);
            return token.value;
        }
        else if (token.type == exports.LPAREN) {
            this.eat(exports.LPAREN);
            var result = this.expr();
            this.eat(exports.RPAREN);
            return result;
        }
    };
    Interpreter.prototype.expr = function () {
        var result = this.term();
        //while the type of token is in the list of valid token types
        while ([exports.PLUS, exports.MINUS].indexOf(this.current_token.type) > -1) {
            var token = this.current_token;
            if (token.type == exports.PLUS) {
                this.eat(exports.PLUS);
                result = result + this.term();
            }
            else if (token.type == exports.MINUS) {
                this.eat(exports.MINUS);
                result = result - this.term();
            }
        }
        return result;
    };
    Interpreter.prototype.term = function () {
        //"""term : factor ((MUL | DIV) factor)*"""
        var result = this.factor();
        while ([exports.MULT, exports.DIV].indexOf(this.current_token.type) > -1) {
            var token = this.current_token;
            if (token.type == exports.MULT) {
                this.eat(exports.MULT);
                result = result * this.factor();
            }
            else if (token.type == exports.DIV) {
                this.eat(exports.DIV);
                result = result / this.factor();
            }
        }
        return result;
    };
    return Interpreter;
}());
//# sourceMappingURL=Lexer.js.map