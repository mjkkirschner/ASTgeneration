import * as Lexer from './Lexer';
import * as AST from './AST';

export class parseMachine {


    current_token: Lexer.Token;
    lexer: Lexer.Lexer;

    constructor(lexer: Lexer.Lexer) {
        this.lexer = lexer;
        this.current_token = this.lexer.get_next_token();

        // current token instance
    }

    parse():AST.AST{
    let node = this.compound_statement();
    if (this.current_token.type != Lexer.EOF){
        this.error();
    }
        return node;
    }
        

    error() {
        throw Error('Invalid Syntax');
    }



    eat(token_type: any) {
        console.log("eating a token"+token_type);
        //# compare the current token type with the passed token
        //# type and if they match then "eat" the current token
        //# and assign the next token to the self.current_token,
        //# otherwise raise an exception.
        if (this.current_token.type == token_type) {
            this.current_token = this.lexer.get_next_token()
        }

        else {
            this.error()
        }

    }


    factor(): AST.AST {
        let token = this.current_token


        if (token.type == Lexer.PLUS) {
            this.eat(Lexer.PLUS)
            let node = this.factor();
            return new AST.UnaryOp(token,node);
        }
        else if (token.type == Lexer.MINUS) {
            this.eat(Lexer.MINUS)
            let node = this.factor();
            return new AST.UnaryOp(token,node);
        }

        else if (token.type == Lexer.INTEGER) {
            this.eat(Lexer.INTEGER)
            return new AST.Num(token);
        }


        else if (token.type == Lexer.LPAREN) {
            this.eat(Lexer.LPAREN)
            let node = this.expr()
            this.eat(Lexer.RPAREN)
            return node;
        }
        else
        {
        let node = this.variable();
        return node;
        }



    }


    expr(): AST.AST {

        let node = this.term();
        let BinNode: AST.BinOp;
        //while the type of token is in the list of valid token types
        while ([Lexer.PLUS, Lexer.MINUS].indexOf(this.current_token.type) > -1) {
            let token = this.current_token;

            if (token.type == Lexer.PLUS) {
                this.eat(Lexer.PLUS)
                //result = result + this.term();
            }
            else if (token.type == Lexer.MINUS) {
                this.eat(Lexer.MINUS)
                //result = result - this.term();
            }
            BinNode = new AST.BinOp(node,token,this.term());

        }
        return BinNode || node;
    };

    term():AST.AST {
        //"""term : factor ((MUL | DIV) factor)*"""
        let node = this.factor();
        let BinNode:AST.BinOp;

        while ([Lexer.MULT, Lexer.DIV].indexOf(this.current_token.type) > -1) {
            let token = this.current_token;
            if (token.type == Lexer.MULT) {
                this.eat(Lexer.MULT)
                //result = result * this.factor();

            }

            else if (token.type == Lexer.DIV) {
                this.eat(Lexer.DIV)
                //result = result / this.factor()
            }
            BinNode = new AST.BinOp(node,token,this.factor());
        }
        return BinNode || node;
    };

    compound_statement(): AST.AST 
    {
        let nodes = this.statement_list();

        let root = new AST.Compound();
        for (let node of nodes) {
            root.children.push(node)
        }
        return root;
    }
   
    
    statement_list(): AST.AST[] {
        let node = this.statement();
        let results = [node];

        while (this.current_token.type == Lexer.SEMI)
         {
            this.eat(Lexer.SEMI);
            results.push(this.statement())
        }

        if (this.current_token.type == Lexer.ID) {
            this.error();
        }

        return results;
    }

  statement():AST.AST
    {
        let node:AST.AST;
    if (this.current_token.type == Lexer.ID)
    {
          node = this.assignment_statement();
    }
    else if(this.current_token.type == Lexer.EOF) {
        node = this.empty();
    }
    else{
        node = this.compound_statement();
    }
      
   // else:
    //    node = self.empty()
    return node
}

empty():AST.AST{
    return new AST.NoOp();
}
 assignment_statement(){

    
    let left = this.variable();
    let token = this.current_token;
    if(token.type == Lexer.ASSIGN){
        this.eat(Lexer.ASSIGN);
    }
    else{
        this.eat(Lexer.SEMI);
    }
    let right = this.expr();
    let node = new AST.Assign(left, token, right);
    return node;
 }
 variable(){
    
    let node = new AST.Var(this.current_token);
    this.eat(Lexer.ID);
    return node;
 }
};