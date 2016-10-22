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
        return this.expr()
    }
        

    error() {
        throw Error('Invalid Syntax');
    }



    eat(token_type: any) {
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
};