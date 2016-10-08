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
//# sourceMappingURL=Lexer.js.map