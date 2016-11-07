import * as Parser from './Parser';
import * as Lexer from './Lexer';
import * as Interpreter from './interprerter';
import * as chai from 'chai';
var expect = chai.expect; // we are using the "expect" style of Chai

describe('lexer', function () {
    it('should lex a simple assigment correctly', function () {
        var lexer = new Lexer.Lexer("x=100; ");
        console.log(lexer);
        var t = lexer.get_next_token();
        var tokens:Lexer.Token[] = [];
        while (t.type != Lexer.EOF) {
            tokens.push(t);
            console.log(t);
            t = lexer.get_next_token();
        }
        expect(tokens.map(token=>{return token.type})).to.deep.equal([Lexer.ID,Lexer.ASSIGN,Lexer.INTEGER,Lexer.SEMI]);
    });
}); 

describe('parser', function () {
    it('should generate an AST for a simple assigment correctly', function () {
        var lexer = new Lexer.Lexer("x=100; ");
        console.log(lexer);
        var parser = new Parser.parseMachine(lexer);
        var tree = parser.parse();
        console.log(tree);
        //TODO fix equal to
       // expect(tree).to.deep.equal();
    });

});
