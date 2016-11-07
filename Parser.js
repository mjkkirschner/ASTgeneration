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
        var node = this.compound_statement();
        if (this.current_token.type != Lexer.EOF) {
            this.error();
        }
        return node;
    };
    parseMachine.prototype.error = function () {
        throw Error('Invalid Syntax');
    };
    parseMachine.prototype.eat = function (token_type) {
        console.log("eating a token" + token_type);
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
        if (token.type == Lexer.PLUS) {
            this.eat(Lexer.PLUS);
            var node = this.factor();
            return new AST.UnaryOp(token, node);
        }
        else if (token.type == Lexer.MINUS) {
            this.eat(Lexer.MINUS);
            var node = this.factor();
            return new AST.UnaryOp(token, node);
        }
        else if (token.type == Lexer.INTEGER) {
            this.eat(Lexer.INTEGER);
            return new AST.Num(token);
        }
        else if (token.type == Lexer.LPAREN) {
            this.eat(Lexer.LPAREN);
            var node = this.expr();
            this.eat(Lexer.RPAREN);
            return node;
        }
        else {
            var node = this.variable();
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
    parseMachine.prototype.compound_statement = function () {
        var nodes = this.statement_list();
        var root = new AST.Compound();
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            root.children.push(node);
        }
        return root;
    };
    parseMachine.prototype.statement_list = function () {
        var node = this.statement();
        var results = [node];
        while (this.current_token.type == Lexer.SEMI) {
            this.eat(Lexer.SEMI);
            results.push(this.statement());
        }
        if (this.current_token.type == Lexer.ID) {
            this.error();
        }
        return results;
    };
    parseMachine.prototype.statement = function () {
        var node;
        if (this.current_token.type == Lexer.ID) {
            node = this.assignment_statement();
        }
        else if (this.current_token.type == Lexer.EOF) {
            node = this.empty();
        }
        else {
            node = this.compound_statement();
        }
        // else:
        //    node = self.empty()
        return node;
    };
    parseMachine.prototype.empty = function () {
        return new AST.NoOp();
    };
    parseMachine.prototype.assignment_statement = function () {
        var left = this.variable();
        var token = this.current_token;
        if (token.type == Lexer.ASSIGN) {
            this.eat(Lexer.ASSIGN);
        }
        else {
            this.eat(Lexer.SEMI);
        }
        var right = this.expr();
        var node = new AST.Assign(left, token, right);
        return node;
    };
    parseMachine.prototype.variable = function () {
        var node = new AST.Var(this.current_token);
        this.eat(Lexer.ID);
        return node;
    };
    return parseMachine;
}());
exports.parseMachine = parseMachine;
;
//# sourceMappingURL=Parser.js.map