
import * as Lexer from './Lexer';
import * as GUID from './Guid';


export class AST {
    parent:AST
    children :AST[];
    ID:GUID.GUID;
    token:Lexer.Token

    constructor() {
    this.parent = null;
    this.children = [];
    this.ID = new GUID.GUID();
    this.token = null;
    }
}

export class Compound extends AST{
   
   constructor()
   {
    super();
   }
}

export class Assign extends AST
{
    left:AST;
    right:AST;
    op:Lexer.Token;
    token:Lexer.Token;

    constructor(left:AST, op:Lexer.Token, right:AST)
    {   super();
        this.left = left
        this.token = op;
        this.op = op;
        this.right = right
        this.children = [this.left,this.right];
        this.left.parent = this;
        this.right.parent = this;
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
 constructor()
   {
    super();
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
        this.children = [this.left,this.right];
         this.left.parent = this;
        this.right.parent = this;
    }
}

export class UnaryOp extends AST{
    token: Lexer.Token;
    op: Lexer.Token;
    expr:AST
    constructor(op: Lexer.Token,expr: AST)
    {   
        super();
        this.expr = expr;
        this.op = op;
        this.token = op;
        this.children = [expr];
        this.expr.parent = this;
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

