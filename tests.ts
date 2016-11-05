import * as Parser from './Parser';
import * as Lexer from './Lexer';
import * as Interpreter from './interprerter';

function test() {
    console.log("starting");
    var lexer = new Lexer.Lexer("x=100; ");
    console.log(lexer);
    var t = lexer.get_next_token();
while (t.type != Lexer.EOF){
    console.log(t);
    t = lexer.get_next_token();
}


};

test();