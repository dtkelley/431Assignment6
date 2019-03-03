"use strict";
exports.__esModule = true;
var Assignment6;
(function (Assignment6) {
    var NumC = /** @class */ (function () {
        function NumC(num) {
            this.num = num;
        }
        return NumC;
    }());
    var IdC = /** @class */ (function () {
        function IdC(id) {
            this.id = id;
        }
        return IdC;
    }());
    var StrC = /** @class */ (function () {
        function StrC(str) {
            this.str = str;
        }
        return StrC;
    }());
    var IfC = /** @class */ (function () {
        function IfC(test, trueClause, falseClause) {
            this.test = test;
            this.trueClause = trueClause;
            this.falseClause = falseClause;
        }
        return IfC;
    }());
    var LamC = /** @class */ (function () {
        function LamC(args, body) {
            this.args = args;
            this.body = body;
        }
        return LamC;
    }());
    var AppC = /** @class */ (function () {
        function AppC(func, params) {
            this.func = func;
            this.params = params;
        }
        return AppC;
    }());
    var NumV = /** @class */ (function () {
        function NumV(num) {
            this.num = num;
        }
        return NumV;
    }());
    var StrV = /** @class */ (function () {
        function StrV(str) {
            this.str = str;
        }
        return StrV;
    }());
    var BoolV = /** @class */ (function () {
        function BoolV(val) {
            this.val = val;
        }
        return BoolV;
    }());
    var CloV = /** @class */ (function () {
        function CloV(params, body, env) {
            this.params = params;
            this.body = body;
            this.env = env;
        }
        return CloV;
    }());
    var PrimV = /** @class */ (function () {
        function PrimV(operator) {
            this.operator = operator;
        }
        return PrimV;
    }());
    var Binding = /** @class */ (function () {
        function Binding(id, val) {
            this.id = id;
            this.val = val;
        }
        return Binding;
    }());
    var topEnv = [
        new Binding("+", new PrimV("+")),
        new Binding("-", new PrimV("-")),
        new Binding("*", new PrimV("*")),
        new Binding("/", new PrimV("/")),
        new Binding("<=", new PrimV("<=")),
        new Binding("equal?", new PrimV("equal?")),
        new Binding("true", new BoolV(true)),
        new Binding("false", new BoolV(false))
    ];
    Assignment6.serialize = function (val) {
        if (val instanceof NumV) {
            return String(val.num);
        }
        else if (val instanceof StrV) {
            return val.str;
        }
        else if (val instanceof BoolV) {
            return String(val.val);
        }
        else if (val instanceof CloV) {
            return "#<procedure>";
        }
        else if (val instanceof PrimV) {
            return "#<primop>";
        }
        else {
            throw new Error('Unrecognized value');
        }
    };
    console.log(Assignment6.serialize(new NumV(7)));
})(Assignment6 = exports.Assignment6 || (exports.Assignment6 = {}));
