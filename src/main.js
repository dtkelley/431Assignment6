"use strict";
exports.__esModule = true;
var A6;
(function (A6) {
    var NumC = /** @class */ (function () {
        function NumC(num) {
            this.num = num;
        }
        return NumC;
    }());
    A6.NumC = NumC;
    var IdC = /** @class */ (function () {
        function IdC(id) {
            this.id = id;
        }
        return IdC;
    }());
    A6.IdC = IdC;
    var StrC = /** @class */ (function () {
        function StrC(str) {
            this.str = str;
        }
        return StrC;
    }());
    A6.StrC = StrC;
    var IfC = /** @class */ (function () {
        function IfC(test, trueClause, falseClause) {
            this.test = test;
            this.trueClause = trueClause;
            this.falseClause = falseClause;
        }
        return IfC;
    }());
    A6.IfC = IfC;
    var LamC = /** @class */ (function () {
        function LamC(args, body) {
            this.args = args;
            this.body = body;
        }
        return LamC;
    }());
    A6.LamC = LamC;
    var AppC = /** @class */ (function () {
        function AppC(func, params) {
            this.func = func;
            this.params = params;
        }
        return AppC;
    }());
    A6.AppC = AppC;
    var NumV = /** @class */ (function () {
        function NumV(num) {
            this.num = num;
        }
        return NumV;
    }());
    A6.NumV = NumV;
    var StrV = /** @class */ (function () {
        function StrV(str) {
            this.str = str;
        }
        return StrV;
    }());
    A6.StrV = StrV;
    var BoolV = /** @class */ (function () {
        function BoolV(val) {
            this.val = val;
        }
        return BoolV;
    }());
    A6.BoolV = BoolV;
    var CloV = /** @class */ (function () {
        function CloV(params, body, env) {
            this.params = params;
            this.body = body;
            this.env = env;
        }
        return CloV;
    }());
    A6.CloV = CloV;
    var PrimV = /** @class */ (function () {
        function PrimV(operator) {
            this.operator = operator;
        }
        return PrimV;
    }());
    A6.PrimV = PrimV;
    var Binding = /** @class */ (function () {
        function Binding(id, val) {
            this.id = id;
            this.val = val;
        }
        return Binding;
    }());
    A6.Binding = Binding;
    A6.topEnv = [
        new Binding("+", new PrimV("+")),
        new Binding("-", new PrimV("-")),
        new Binding("*", new PrimV("*")),
        new Binding("/", new PrimV("/")),
        new Binding("<=", new PrimV("<=")),
        new Binding("equal?", new PrimV("equal?")),
        new Binding("true", new BoolV(true)),
        new Binding("false", new BoolV(false))
    ];
    A6.extendEnv = function (env, bindings) {
        return env.concat(bindings, env);
    };
    A6.envLookup = function (env, id) {
        for (var i = 0; i < env.length; i++) {
            if (env[i].id === id) {
                return env[i].val;
            }
        }
        throw new Error("ZHRL: Binding not found");
    };
    A6.serialize = function (val) {
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
    A6.myAdd = function (val1, val2) {
        if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
            throw new Error("ZHRL: Invalid operands for '+'");
        }
        return new NumV(val1.num + val2.num);
    };
    A6.mySubtract = function (val1, val2) {
        if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
            throw new Error("ZHRL: Invalid operands for '-'");
        }
        return new NumV(val1.num - val2.num);
    };
    A6.myMult = function (val1, val2) {
        if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
            throw new Error("ZHRL: Invalid operands for '*'");
        }
        return new NumV(val1.num * val2.num);
    };
    A6.myDivide = function (val1, val2) {
        if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
            throw new Error("ZHRL: Invalid operands for '/'");
        }
        if (val2.num === 0) {
            throw new Error("ZHRL: Division by zero is undefined");
        }
        return new NumV(val1.num / val2.num);
    };
    A6.myLessEqual = function (val1, val2) {
        if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
            throw new Error("ZHRL: Invalid operands for '<='");
        }
        return new BoolV(val1.num <= val2.num);
    };
    A6.myEqual = function (val1, val2) {
        if (val1 instanceof NumV && val2 instanceof NumV) {
            return new BoolV(val1.num === val2.num);
        }
        else if (val1 instanceof StrV && val2 instanceof StrV) {
            return new BoolV(val1.str === val2.str);
        }
        else if (val1 instanceof BoolV && val2 instanceof BoolV) {
            return new BoolV(val1.val === val2.val);
        }
        return new BoolV(false);
    };
    A6.isReserved = function (str) {
        return str === "var" || str === "if" || str === "lam" || str === "=";
    };
    A6.interp = function (exp, env) {
        if (exp instanceof IdC) {
            return A6.envLookup(env, exp.id);
        }
        else if (exp instanceof NumC) {
            return new NumV(exp.num);
        }
        else if (exp instanceof StrC) {
            return new StrV(exp.str);
        }
        else if (exp instanceof IfC) {
            var test_1 = A6.interp(exp.test, env);
            if (!(test_1 instanceof BoolV)) {
                throw new Error("ZHRL: cannot resolve to boolean");
            }
            if (test_1) {
                return A6.interp(exp.trueClause, env);
            }
            else {
                return A6.interp(exp.falseClause, env);
            }
        }
        else if (exp instanceof LamC) {
            return new CloV(exp.args, exp.body, env);
        }
        else if (exp instanceof AppC) {
            var func = A6.interp(exp.func, env);
            if (func instanceof PrimV) {
                if (exp.params.length === 2) {
                    var val1 = A6.interp(exp.params[0], env);
                    var val2 = A6.interp(exp.params[1], env);
                    switch (func.operator) {
                        case '+':
                            return A6.myAdd(val1, val2);
                        case '-':
                            return A6.mySubtract(val1, val2);
                        case '*':
                            return A6.myMult(val1, val2);
                        case '/':
                            return A6.myDivide(val1, val2);
                        case '<=':
                            return A6.myLessEqual(val1, val2);
                        case 'equal?':
                            return A6.myEqual(val1, val2);
                        default:
                            throw new Error("ZHRL: Unrecognized primitive operator");
                    }
                }
                else {
                    throw new Error("ZHRL: invalid number of operands for primitive operation");
                }
            }
            else if (func instanceof CloV) {
                var newBindings = [];
                var newEnv = void 0;
                if (exp.params.length !== func.params.length) {
                    throw new Error("ZHRL: Incorrect number of params");
                }
                for (var i = 0; i < exp.params.length; i++) {
                    newBindings.push(new Binding(func.params[i], A6.interp(exp.params[i], env)));
                }
                newEnv = A6.extendEnv(func.env, newBindings);
                A6.interp(func.body, newEnv);
            }
            else {
                throw new Error("ZHRL: Invalid function application");
            }
        }
        else {
            throw new Error("ZHRL: Unimplemented expression type");
        }
    };
    A6.hasWhitespace = function (s) {
        return /\s/g.test(s);
    };
    A6.hasDuplicates = function (arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i] === arr[j]) {
                    return true;
                }
            }
        }
        return false;
    };
    A6.validID = function (input) {
        return (typeof input == 'string') && isNaN(Number(input))
            && !A6.hasWhitespace(input) && !A6.isReserved(input);
    };
    A6.parse = function (input) {
        if (input.length === 1) {
            var firstInput = input[0];
            var num = Number(firstInput);
            if (!isNaN(num)) {
                return new NumC(num);
            }
            else if (firstInput.charAt(0) === '"'
                && firstInput.charAt(firstInput.length - 1) === '"') {
                return new StrC(firstInput.substring(1, firstInput.length - 1));
            }
            else if (!A6.isReserved(firstInput)) {
                return new IdC(firstInput);
            }
            else {
                throw new Error("ZHRL: Invalid use of reserved word");
            }
        }
        else if (input.length === 4 && input[0] === 'if') {
            return new IfC(A6.parse(input[1]), A6.parse(input[2]), A6.parse(input[3]));
        }
        else if (input[0] === 'lam' && input.length === 3) {
            var args = [];
            for (var i = 0; i < input[1].length; i++) {
                if (A6.validID(input[1][i])) {
                    args.push(input[1][i]);
                }
                else {
                    throw new Error("ZHRL: Invalid argument");
                }
            }
            if (A6.hasDuplicates(args)) {
                throw new Error("ZHRL: Duplicate arg names");
            }
            return new LamC(args, A6.parse(input[2]));
        }
        else if (input[0] === 'var' && input.length > 2) {
            var newVars = [];
            var bodies = [];
            var lam = void 0;
            for (var i = 1; i < input.length - 1; i++) {
                if (input[i] instanceof Array && input[i].length === 3
                    && input[i][1] === '=') {
                    var id = input[i][0];
                    var body = void 0;
                    if (!A6.validID(id)) {
                        throw new Error("ZHRL: Invalid id");
                    }
                    body = A6.parse(input[i][2]);
                    newVars.push(id);
                    bodies.push(body);
                }
                else {
                    throw new Error("ZHRL: Invalid variable decleration");
                }
            }
            if (A6.hasDuplicates(newVars)) {
                throw new Error("ZHRL: Duplicate variable name");
            }
            lam = new LamC(newVars, A6.parse(input[input.length - 1]));
            return new AppC(lam, bodies);
        }
        else if (input.length === 2 && input[1] instanceof Array) {
            var func = A6.parse(input[0]);
            var params = [];
            for (var i = 0; i < input[1].length; i++) {
                params.push(A6.parse(input[1][i]));
            }
            return new AppC(func, params);
        }
    };
})(A6 = exports.A6 || (exports.A6 = {}));
