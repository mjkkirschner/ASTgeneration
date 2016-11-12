import * as Parser from './Parser';
import * as Lexer from './Lexer';
import * as Interpreter from './interprerter';
import * as chai from 'chai';
import * as AST from './AST';

var expect = chai.expect; // we are using the "expect" style of Chai

describe('lexer', function () {
    it('should lex a simple assigment correctly', function () {
        let lexer = new Lexer.Lexer("x=100; ");
        console.log(lexer);
        let t = lexer.get_next_token();
        let tokens:Lexer.Token[] = [];
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
        let lexer = new Lexer.Lexer("x=100; ");
        console.log(lexer);
        let parser = new Parser.parseMachine(lexer);
        let tree = parser.parse();
        console.log(JSON.stringify(tree));
        //TODO fix equal to
        let tree2 = new AST.Compound();
        tree2.children.push(new AST.Assign(
            new AST.Var(new Lexer.Token(Lexer.ID,'x')),
            new Lexer.Token(Lexer.ASSIGN,"="),
            new AST.Num(new Lexer.Token(Lexer.INTEGER,100))));
        tree2.children.push(new AST.NoOp());

       expect(JSON.stringify(tree)).to.equal(JSON.stringify(tree2));
    });

    it('should generate an AST for an assigment and expression', function () {
        let lexer = new Lexer.Lexer("x= 100 + 100; ");
        console.log(lexer);
        let parser = new Parser.parseMachine(lexer);
        let tree = parser.parse();
        console.log(JSON.stringify(tree));
        //TODO fix equal to
        let tree2 = new AST.Compound();
        tree2.children.push(new AST.Assign(
            new AST.Var(new Lexer.Token(Lexer.ID,'x')),
            new Lexer.Token(Lexer.ASSIGN,"="),
            new AST.BinOp(new AST.Num(new Lexer.Token(Lexer.INTEGER,100))
             , new Lexer.Token(Lexer.PLUS,"+"),
             new AST.Num(new Lexer.Token(Lexer.INTEGER,100)))));
        tree2.children.push(new AST.NoOp());

       expect(JSON.stringify(tree)).to.equal(JSON.stringify(tree2));
    });


});
