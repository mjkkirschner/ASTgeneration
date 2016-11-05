"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lexer = require('./Lexer');
var NodeVisitor = (function () {
    function NodeVisitor() {
    }
    //TODO implement this without the method lookup...
    //does javascript do virtual dispatch?
    NodeVisitor.prototype.visit = function (node) {
        var method_name = 'visit_' + node.constructor['name'];
        console.log(method_name);
        var visitor = this[method_name].bind(this);
        return visitor(node);
    };
    return NodeVisitor;
}());
var Interpreter = (function (_super) {
    __extends(Interpreter, _super);
    function Interpreter(parser) {
        _super.call(this);
        this.parser = parser;
    }
    //****visitors*****
    Interpreter.prototype.visit_BinOp = function (node) {
        if (node.op.type == Lexer.PLUS) {
            return this.visit(node.left) + this.visit(node.right);
        }
        else if (node.op.type == Lexer.MINUS) {
            return this.visit(node.left) - this.visit(node.right);
        }
        else if (node.op.type == Lexer.MULT) {
            return this.visit(node.left) * this.visit(node.right);
        }
        else if (node.op.type == Lexer.DIV) {
            return this.visit(node.left) / this.visit(node.right);
        }
    };
    Interpreter.prototype.visit_UnaryOp = function (node) {
        if (node.op.type == Lexer.PLUS) {
            return +this.visit(node.expr);
        }
        else if (node.op.type == Lexer.MINUS) {
            return -this.visit(node.expr);
        }
    };
    Interpreter.prototype.visit_Num = function (node) {
        return node.value;
    };
    Interpreter.prototype.error = function () {
        throw Error('Invalid Syntax');
    };
    Interpreter.prototype.interpret = function () {
        var tree = this.parser.parse();
        console.log(tree);
        return this.visit(tree);
    };
    return Interpreter;
}(NodeVisitor));
exports.Interpreter = Interpreter;
//# sourceMappingURL=interprerter.js.map