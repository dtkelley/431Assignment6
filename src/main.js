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
    Assignment6.NumC = NumC;
    var IdC = /** @class */ (function () {
        function IdC(id) {
            this.id = id;
        }
        return IdC;
    }());
    Assignment6.IdC = IdC;
    var StrC = /** @class */ (function () {
        function StrC(str) {
            this.str = str;
        }
        return StrC;
    }());
    Assignment6.StrC = StrC;
    var IfC = /** @class */ (function () {
        function IfC(test, trueClause, falseClause) {
            this.test = test;
            this.trueClause = trueClause;
            this.falseClause = falseClause;
        }
        return IfC;
    }());
    Assignment6.IfC = IfC;
    var LamC = /** @class */ (function () {
        function LamC(args, body) {
            this.args = args;
            this.body = body;
        }
        return LamC;
    }());
    Assignment6.LamC = LamC;
    var AppC = /** @class */ (function () {
        function AppC(func, params) {
            this.func = func;
            this.params = params;
        }
        return AppC;
    }());
    Assignment6.AppC = AppC;
    var NumV = /** @class */ (function () {
        function NumV(num) {
            this.num = num;
        }
        return NumV;
    }());
    Assignment6.NumV = NumV;
    var StrV = /** @class */ (function () {
        function StrV(str) {
            this.str = str;
        }
        return StrV;
    }());
    Assignment6.StrV = StrV;
    var BoolV = /** @class */ (function () {
        function BoolV(val) {
            this.val = val;
        }
        return BoolV;
    }());
    Assignment6.BoolV = BoolV;
    var CloV = /** @class */ (function () {
        function CloV(params, body, env) {
            this.params = params;
            this.body = body;
            this.env = env;
        }
        return CloV;
    }());
    Assignment6.CloV = CloV;
    var PrimV = /** @class */ (function () {
        function PrimV(operator) {
            this.operator = operator;
        }
        return PrimV;
    }());
    Assignment6.PrimV = PrimV;
    var Binding = /** @class */ (function () {
        function Binding(id, val) {
            this.id = id;
            this.val = val;
        }
        return Binding;
    }());
    Assignment6.Binding = Binding;
    Assignment6.topEnv = [
        new Binding("+", new PrimV("+")),
        new Binding("-", new PrimV("-")),
        new Binding("*", new PrimV("*")),
        new Binding("/", new PrimV("/")),
        new Binding("<=", new PrimV("<=")),
        new Binding("equal?", new PrimV("equal?")),
        new Binding("true", new BoolV(true)),
        new Binding("false", new BoolV(false))
    ];
    Assignment6.extendEnv = function (env, bindings) {
        return env.concat(bindings, env);
    };
    Assignment6.envLookup = function (env, id) {
        for (var i = 0; i < env.length; i++) {
            if (env[i].id === id) {
                return env[i].val;
            }
        }
        throw new Error("ZHRL: Binding not found");
    };
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
    Assignment6.myAdd = function (val1, val2) {
        if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
            throw new Error("ZHRL: Invalid operands for '+'");
        }
        return new NumV(val1.num + val2.num);
    };
    Assignment6.mySubtract = function (val1, val2) {
        if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
            throw new Error("ZHRL: Invalid operands for '-'");
        }
        return new NumV(val1.num - val2.num);
    };
    Assignment6.myMult = function (val1, val2) {
        if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
            throw new Error("ZHRL: Invalid operands for '*'");
        }
        return new NumV(val1.num * val2.num);
    };
    Assignment6.myDivide = function (val1, val2) {
        if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
            throw new Error("ZHRL: Invalid operands for '/'");
        }
        if (val2.num === 0) {
            throw new Error("ZHRL: Division by zero is undefined");
        }
        return new NumV(val1.num / val2.num);
    };
    Assignment6.myLessEqual = function (val1, val2) {
        if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
            throw new Error("ZHRL: Invalid operands for '<='");
        }
        return new BoolV(val1.num <= val2.num);
    };
    Assignment6.myEqual = function (val1, val2) {
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
    Assignment6.isReserved = function (str) {
        return str === "var" || str === "if" || str === "lam" || str === "=";
    };
    Assignment6.interp = function (exp, env) {
        if (exp instanceof IdC) {
            return Assignment6.envLookup(env, exp.id);
        }
        else if (exp instanceof NumC) {
            return new NumV(exp.num);
        }
        else if (exp instanceof StrC) {
            return new StrV(exp.str);
        }
        else if (exp instanceof IfC) {
            var test_1 = Assignment6.interp(exp.test, env);
            if (!(test_1 instanceof BoolV)) {
                throw new Error("ZHRL: cannot resolve to boolean");
            }
            if (test_1) {
                return Assignment6.interp(exp.trueClause, env);
            }
            else {
                return Assignment6.interp(exp.falseClause, env);
            }
        }
        else if (exp instanceof LamC) {
            return new CloV(exp.args, exp.body, env);
        }
        else if (exp instanceof AppC) {
            var func = Assignment6.interp(exp.func, env);
            if (func instanceof PrimV) {
                if (exp.params.length === 2) {
                    var val1 = Assignment6.interp(exp.params[0], env);
                    var val2 = Assignment6.interp(exp.params[2], env);
                    switch (func.operator) {
                        case '+':
                            return Assignment6.myAdd(val1, val2);
                        case '-':
                            return Assignment6.mySubtract(val1, val2);
                        case '*':
                            return Assignment6.myMult(val1, val2);
                        case '/':
                            return Assignment6.myDivide(val1, val2);
                        case '<=':
                            return Assignment6.myLessEqual(val1, val2);
                        case 'equal?':
                            return Assignment6.myEqual(val1, val2);
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
                for (var i = 0; i < exp.params.length; i++) {
                    newBindings.push(new Binding(func.params[i], Assignment6.interp(exp.params[i], env)));
                }
                newEnv = Assignment6.extendEnv(func.env, newBindings);
                Assignment6.interp(func.body, newEnv);
            }
            else {
                throw new Error("ZHRL: Invalid function application");
            }
        }
        else {
            throw new Error("ZHRL: Unimplemented expression type");
        }
    };
    Assignment6.hasWhitespace = function (s) {
        return /\s/g.test(s);
    };
    Assignment6.parse = function (input) {
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
            else if (!Assignment6.isReserved(firstInput)) {
                return new IdC(firstInput);
            }
            else {
                throw new Error("ZHRL: Invalid use of reserved word");
            }
        }
        else if (input.length === 4 && input[0] === 'if') {
            return new IfC(Assignment6.parse(input[1]), Assignment6.parse(input[2]), Assignment6.parse(input[3]));
        }
        else if (input[0] === 'lam' && input.length === 3) {
            var args = [];
            for (var i = 0; i < input[1].length; i++) {
                if (input[1][i] instanceof String && isNaN(Number(input[1][i]))
                    && !Assignment6.hasWhitespace(input[1][i]) && !Assignment6.isReserved(input[1][i])) {
                    args.push(input[1][i]);
                }
                else {
                    throw new Error("ZHRL: Invalid argument");
                }
            }
            return new LamC(args, Assignment6.parse(input[2]));
        }
        // else if () {
        // }
        else if (input.length === 2 && input[1] instanceof Array) {
            var func = Assignment6.parse(input[0]);
            var params = [];
            for (var i = 0; i < input[1].length; i++) {
                params.push(Assignment6.parse(input[1][i]));
            }
            return new AppC(func, params);
        }
    };
})(Assignment6 = exports.Assignment6 || (exports.Assignment6 = {}));
