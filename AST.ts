
import * as Lexer from './Lexer';

export class AST {
    constructor() {

    }
}

export class Compound extends AST{
   
   children :AST[];

   constructor()
   {
    super();
    this.children = [];
   }
}

export class Assign extends AST
{
    left:AST;
    right:AST;
    op:Lexer.Token;
    token:Lexer.Token;

    constructor(left, op, right)
    {   super();
        this.left = left
        this.token = op;
        this.op = op;
        this.right = right
    }
}

export class Var extends AST
{
    token:Lexer.Token;
    value:any;
constructor(token:Lexer.Token){
        super();
        this.token = token;
        this.value = token.value;
    }
}

export class NoOp extends AST
{

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

