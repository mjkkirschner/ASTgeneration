"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AST = (function () {
    function AST() {
    }
    return AST;
}());
exports.AST = AST;
var BinOp = (function (_super) {
    __extends(BinOp, _super);
    function BinOp(left, op, right) {
        _super.call(this);
        this.left = left;
        this.op = op;
        this.token = op;
        this.right = right;
    }
    return BinOp;
}(AST));
exports.BinOp = BinOp;
var UnaryOp = (function () {
    function UnaryOp(op, expr) {
        this.expr = expr;
        this.op = op;
        this.token = op;
    }
    return UnaryOp;
}());
exports.UnaryOp = UnaryOp;
var Num = (function (_super) {
    __extends(Num, _super);
    function Num(token) {
        _super.call(this);
        this.token = token;
        this.value = token.value;
    }
    return Num;
}(AST));
exports.Num = Num;
//# sourceMappingURL=AST.js.map