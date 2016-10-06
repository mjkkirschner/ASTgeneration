"use strict";
var Lexer = require('./Lexer');
var AST = require('./AST');
var parseMachine = (function () {
    function parseMachine(lexer) {
        this.lexer = lexer;
        this.current_token = this.lexer.get_next_token();
        // current token instance
    }
    parseMachine.prototype.parse = function () {
        return this.expr();
    };
    parseMachine.prototype.error = function () {
        throw Error('Invalid Syntax');
    };
    parseMachine.prototype.eat = function (token_type) {
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
    parseMachine.prototype.factor = function () {
        var token = this.current_token;
        if (token.type == Lexer.INTEGER) {
            this.eat(Lexer.INTEGER);
            return new AST.Num(token);
        }
        else if (token.type == Lexer.LPAREN) {
            this.eat(Lexer.LPAREN);
            var node = this.expr();
            this.eat(Lexer.RPAREN);
            return node;
        }
    };
    parseMachine.prototype.expr = function () {
        var node = this.term();
        var BinNode;
        //while the type of token is in the list of valid token types
        while ([Lexer.PLUS, Lexer.MINUS].indexOf(this.current_token.type) > -1) {
            var token = this.current_token;
            if (token.type == Lexer.PLUS) {
                this.eat(Lexer.PLUS);
            }
            else if (token.type == Lexer.MINUS) {
                this.eat(Lexer.MINUS);
            }
            BinNode = new AST.BinOp(node, token, this.term());
        }
        return BinNode || node;
    };
    ;
    parseMachine.prototype.term = function () {
        //"""term : factor ((MUL | DIV) factor)*"""
        var node = this.factor();
        var BinNode;
        while ([Lexer.MULT, Lexer.DIV].indexOf(this.current_token.type) > -1) {
            var token = this.current_token;
            if (token.type == Lexer.MULT) {
                this.eat(Lexer.MULT);
            }
            else if (token.type == Lexer.DIV) {
                this.eat(Lexer.DIV);
            }
            BinNode = new AST.BinOp(node, token, this.factor());
        }
        return BinNode || node;
    };
    ;
    return parseMachine;
}());
exports.parseMachine = parseMachine;
;
//# sourceMappingURL=Parser.js.map