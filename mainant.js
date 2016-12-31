"use strict";
const DesignScriptLexer_1 = require("./antlrStuff/DesignScriptLexer");
const DesignScriptParser_1 = require("./antlrStuff/DesignScriptParser");
const antlr4ts_1 = require('antlr4ts');
const AbstractParseTreeVisitor_1 = require('./node_modules/antlr4ts/tree/AbstractParseTreeVisitor');
console.log("starting Antlr test for ds");
class testVisitorImpl extends AbstractParseTreeVisitor_1.AbstractParseTreeVisitor {
    defaultResult() {
        return "some node";
    }
    visitFuncDef(ctx) {
        console.log("in func def");
        ctx.coreStmt().forEach(element => {
            console.log(element.getText());
        });
        return "we visited a function definition";
    }
    visitUnitRangeExpr(ctx) {
        console.log("in range");
        return "we visitied a range expression";
    }
}
// Create the lexer and parser
var stream = new antlr4ts_1.ANTLRInputStream("def method() { return = 0..100; }");
console.log(stream);
let lex = new DesignScriptLexer_1.DesignScriptLexer(stream);
//var tokens = lex.getAllTokens();
let tokStream = new antlr4ts_1.CommonTokenStream(lex);
let testparser = new DesignScriptParser_1.DesignScriptParser(tokStream);
// Parse the input, where `compilationUnit` is whatever entry point you defined
let result = testparser.program();
//console.log(result);
let visitor = new testVisitorImpl();
console.log(visitor.visit(result));
//# sourceMappingURL=mainant.js.map