
import * as Lexer from './Lexer';

export class AST {
    constructor() {

    }
}


export class BinOp extends AST {
    left: AST;
    right: AST;
    token: Lexer.Token;
    op: Lexer.Token;

    constructor(left: AST, op: Lexer.Token, right: AST) {
        super();
        this.left = left;
        this.op = op;
        this.token = op;
        this.right = right;
    }
}

export class UnaryOp{
    token: Lexer.Token;
    op: Lexer.Token;
    expr:AST
    constructor(op: Lexer.Token,expr: AST)
    {
        this.expr = expr;
        this.op = op;
        this.token = op;
    }
}


export class Num extends AST {
    
    token: Lexer.Token;
    value: any;
constructor(token:Lexer.Token)
{       super();
        this.token = token;
        this.value = token.value;
}
}

