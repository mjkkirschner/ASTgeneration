
// Token types
// EOF (end-of-file) token is used to indicate that
// there is no more input left for lexical analysis
var INTEGER = 'INTEGER';
var PLUS = 'PLUS';
var MINUS = 'MINUS';
var EOF = 'EOF';

function isSpace(ch:any):boolean{
if ((ch == ' ') || (ch == '\t') || (ch == '\n')){
    return true;
}
return false;

}


function isNumeric(obj:any) {
    return !isNaN(obj - parseFloat(obj));
}


class Token {
    type:string;
    value:any;
    constructor(type:string, value:any){
        //token type: INTEGER, PLUS, MINUS, or EOF
        this.type = type;
        //token value: non-negative integer value, '+', '-', or None
        this.value = value;
    }
    ///"""String representation of the class instance.
    public toString()
    {
       return this.toString();
    }
}
class Interpreter{

    text:string;
    position:number;
    current_token:Token;
    current_char: string;

    constructor(text:string){
        // client string input, e.g. "3 + 5", "12 - 5", etc
        this.text = text;
        // self.pos is an index into self.text
        this.position = 0;
        // current token instance
        this.current_token = null;
        this.current_char = this.text[this.position];
    }

     error(){
    throw Error('Error parsing input')
     }
     

     advance(){
  //"""Advance the 'pos' pointer and set the 'current_char' variable."""
        this.position += 1;
        if (this.position > (this.text).length - 1){
            this.current_char = null;  // Indicates end of input
        }
            
        else{
            this.current_char = this.text[this.position];
        }
          
     }
      

     skip_whitespace(){
   while (this.current_char != null && isSpace(this.current_char))
            this.advance();
     }
     

     integer(){
        ///"""Return a (multidigit) integer consumed from the input."""
 let result = '';
        while (this.current_char !=  null &&  isNumeric(this.current_char)){
            result += this.current_char;
            this.advance();
        }
            
        return new Number(result)
}
       
        //"""Lexical analyzer (also known as scanner or tokenizer)
        //This method is responsible for breaking a sentence
        //apart into tokens.
        //"""
     get_next_token(){

             while (this.current_char != null)
             {

           

            if (isSpace(this.current_char)){
                this.skip_whitespace();
            }
               

            if (isNumeric(this.current_char)){
                 return new Token(INTEGER, this.integer())
            }
               

            if (this.current_char == '+'){
                    this.advance()
                return new Token(PLUS, '+')
            }
               

            if (this.current_char == '-'){

                this.advance()
                return new Token(MINUS, '-')

            }
            this.error();
             }

        return new Token(EOF, null)

     }

       
       

     eat(token_type:any){
        //# compare the current token type with the passed token
        //# type and if they match then "eat" the current token
        //# and assign the next token to the self.current_token,
        //# otherwise raise an exception.
        if (this.current_token.type == token_type){
            this.current_token = this.get_next_token()
        }
           
        else{
            this.error()
        }
           
     }
        

     expr():number{
        //"""Parser / Interpreter
        let result = 0;
        //expr -> INTEGER PLUS INTEGER
        //expr -> INTEGER MINUS INTEGER
        //"""
        //# set current token to the first token taken from the input
        this.current_token = this.get_next_token()

        //# we expect the current token to be an integer
        let left = this.current_token;
        this.eat(INTEGER);

       // # we expect the current token to be either a '+' or '-'
        let op = this.current_token;
        if (op.type == PLUS){
            this.eat(PLUS);
        }
       
        else{
            this.eat(MINUS);
        }

       // # we expect the current token to be an integer
        let right = this.current_token;
        this.eat(INTEGER);
        //# after the above call the self.current_token is set to
        //# EOF token

        //# at this point either the INTEGER PLUS INTEGER or
        //# the INTEGER MINUS INTEGER sequence of tokens
        //# has been successfully found and the method can just
        //# return the result of adding or subtracting two integers,
        //# thus effectively interpreting client input
        if (op.type == PLUS){
         result = left.value + right.value
        }
            
        else{
         result = left.value - right.value
        }
           
        return result
}
}
 function main(){
 
 
   var interpreter = new Interpreter("3+ 3");
        var result = interpreter.expr();
        console.log(result);

  /*      var stdin = process.stdin;

stdin.addListener("data", function(d) {
    try{
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    console.log("you entered: [" + 
        d.toString().trim() + "]");

         var interpreter = new Interpreter(d.toString());
        var result = interpreter.expr();
        console.log(result);
    }
    catch(ex){
         throw new Error(EOF);
    }

  });
  */
 };

main();