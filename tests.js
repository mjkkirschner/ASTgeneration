"use strict";
var Parser = require('./Parser');
var Lexer = require('./Lexer');
var chai = require('chai');
var AST = require('./AST');
var expect = chai.expect; // we are using the "expect" style of Chai
describe('lexer', function () {
    it('should lex a simple assigment correctly', function () {
        var lexer = new Lexer.Lexer("x=100; ");
        console.log(lexer);
        var t = lexer.get_next_token();
        var tokens = [];
        while (t.type != Lexer.EOF) {
            tokens.push(t);
            console.log(t);
            t = lexer.get_next_token();
        }
        expect(tokens.map(function (token) { return token.type; })).to.deep.equal([Lexer.ID, Lexer.ASSIGN, Lexer.INTEGER, Lexer.SEMI]);
    });
});
describe('parser', function () {
    it('should generate an AST for a simple assigment correctly', function () {
        var lexer = new Lexer.Lexer("x=100; ");
        console.log(lexer);
        var parser = new Parser.parseMachine(lexer);
        var tree = parser.parse();
        console.log(JSON.stringify(tree));
        //TODO fix equal to
        var tree2 = new AST.Compound();
        tree2.children.push(new AST.Assign(new AST.Var(new Lexer.Token(Lexer.ID, 'x')), new Lexer.Token(Lexer.ASSIGN, "="), new AST.Num(new Lexer.Token(Lexer.INTEGER, 100))));
        tree2.children.push(new AST.NoOp());
        expect(JSON.stringify(tree)).to.equal(JSON.stringify(tree2));
    });
    it('should generate an AST for an assigment and expression', function () {
        var lexer = new Lexer.Lexer("x= 100 + 100; ");
        console.log(lexer);
        var parser = new Parser.parseMachine(lexer);
        var tree = parser.parse();
        console.log(JSON.stringify(tree));
        //TODO fix equal to
        var tree2 = new AST.Compound();
        tree2.children.push(new AST.Assign(new AST.Var(new Lexer.Token(Lexer.ID, 'x')), new Lexer.Token(Lexer.ASSIGN, "="), new AST.BinOp(new AST.Num(new Lexer.Token(Lexer.INTEGER, 100)), new Lexer.Token(Lexer.PLUS, "+"), new AST.Num(new Lexer.Token(Lexer.INTEGER, 100)))));
        tree2.children.push(new AST.NoOp());
        expect(JSON.stringify(tree)).to.equal(JSON.stringify(tree2));
    });
});
//# sourceMappingURL=tests.js.map