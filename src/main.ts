export module Assignment6 {
   export type ExprC = NumC | IdC | StrC | IfC | LamC | AppC;

   export class NumC {
      num: number;
      constructor(num: number) {
         this.num = num;
      }
   }

   export class IdC {
      id: string;
      constructor(id: string) {
         this.id = id;
      }
   }

   export class StrC {
      str: string;
      constructor(str: string) {
         this.str = str;
      }
   }

   export class IfC {
      test: ExprC;
      trueClause: ExprC;
      falseClause: ExprC;
      constructor(test: ExprC, trueClause: ExprC, falseClause: ExprC) {
         this.test = test;
         this.trueClause = trueClause;
         this.falseClause = falseClause;
      }
   }

   export class LamC {
      args: string[]
      body: ExprC;
      constructor(args: string[], body: ExprC) {
         this.args = args;
         this.body = body;
      }
   }

   export class AppC {
      func: ExprC;
      params: ExprC[];
      constructor(func: ExprC, params: ExprC[]) {
         this.func = func;
         this.params = params;
      }
   }

   export type Value = NumV | StrV | BoolV | CloV | PrimV;

   export class NumV {
      num: number;
      constructor(num: number) {
         this.num = num;
      }
   }

   export class StrV {
      str: string;
      constructor(str: string) {
         this.str = str;
      }
   }

   export class BoolV {
      val: boolean;
      constructor(val: boolean) {
         this.val = val;
      }
   }

   export class CloV {
      params: string[];
      body: ExprC;
      env: Environment;

      constructor(params: string[], body: ExprC, env: Environment) {
         this.params = params;
         this.body = body;
         this.env = env;
      }
   }

   export class PrimV {
      operator: string;

      constructor(operator: string) {
         this.operator = operator;
      }
   }

   export class Binding {
      id: string;
      val: Value;

      constructor(id: string, val: Value) {
         this.id = id;
         this.val = val;
      }
   }

   export type Environment = Binding[];

   export var topEnv: Environment = [
      new Binding("+", new PrimV("+")),
      new Binding("-", new PrimV("-")),
      new Binding("*", new PrimV("*")),
      new Binding("/", new PrimV("/")),
      new Binding("<=", new PrimV("<=")),
      new Binding("equal?", new PrimV("equal?")),
      new Binding("true", new BoolV(true)),
      new Binding("false", new BoolV(false))
   ];

   export var extendEnv = function(env : Environment, bindings : Binding[]) : Binding[] {
      return env.concat(bindings, env);
   };

   export var envLookup = function(env : Environment, id : string) : Value {
      for (let i = 0; i < env.length; i++) {
         if (env[i].id === id) {
            return env[i].val;
         }
      }
      throw new Error("ZHRL: Binding not found");
   }

   export var serialize = function (val: Value): string {
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

   export var myAdd = function(val1 : Value, val2 : Value) : Value {
      if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
         throw new Error("ZHRL: Invalid operands for '+'");
      }

      return new NumV(val1.num + val2.num);
   };

   export var mySubtract = function(val1 : Value, val2 : Value) : Value {
      if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
         throw new Error("ZHRL: Invalid operands for '-'");
      }

      return new NumV(val1.num - val2.num);
   };

   export var myMult = function(val1 : Value, val2 : Value) : Value {
      if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
         throw new Error("ZHRL: Invalid operands for '*'");
      }

      return new NumV(val1.num * val2.num);
   };

   export var myDivide = function(val1 : Value, val2 : Value) : Value {
      if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
         throw new Error("ZHRL: Invalid operands for '/'");
      }

      if (val2.num === 0) {
         throw new Error("ZHRL: Division by zero is undefined");
      }

      return new NumV(val1.num / val2.num);
   };

   export var myLessEqual = function(val1 : Value, val2 : Value) : Value {
      if (!(val1 instanceof NumV) || !(val2 instanceof NumV)) {
         throw new Error("ZHRL: Invalid operands for '<='");
      }

      return new BoolV(val1.num <= val2.num);
   };

   export var myEqual = function(val1 : Value, val2 : Value) : Value {
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

   export var isReserved = function(str : String) : boolean {
      return str === "var" || str === "if" || str === "lam" || str === "=";
   };

   export var interp = function(exp : ExprC, env : Environment) : Value {
      if (exp instanceof IdC) {
         return envLookup(env, exp.id);
      }
      else if (exp instanceof NumC) {
         return new NumV(exp.num);
      }
      else if (exp instanceof StrC) {
         return new StrV(exp.str);
      }
      else if (exp instanceof IfC) {
         let test = interp(exp.test, env);

         if (!(test instanceof BoolV)) {
            throw new Error("ZHRL: cannot resolve to boolean");
         }

         if (test) {
            return interp(exp.trueClause, env);
         }
         else {
            return interp(exp.falseClause, env);
         }
      }
      else if (exp instanceof LamC) {
         return new CloV(exp.args, exp.body, env);
      }
      else if (exp instanceof AppC) {
         let func = interp(exp.func, env);

         if (func instanceof PrimV) {
            if (exp.params.length === 2) {
               let val1 = interp(exp.params[0], env);
               let val2 = interp(exp.params[1], env);
               switch (func.operator) {
                  case '+':
                     return myAdd(val1, val2);
                  case '-':
                     return mySubtract(val1, val2);
                  case '*':
                     return myMult(val1, val2);
                  case '/':
                     return myDivide(val1, val2);
                  case '<=':
                     return myLessEqual(val1, val2);
                  case 'equal?':
                     return myEqual(val1, val2);
                  default:
                     throw new Error("ZHRL: Unrecognized primitive operator");
               }
            }
            else {
               throw new Error("ZHRL: invalid number of operands for primitive operation");
            }
         }
         else if (func instanceof CloV) {
            let newBindings = [];
            let newEnv;

            for (let i = 0; i < exp.params.length; i++) {
               newBindings.push(new Binding(func.params[i], interp(exp.params[i], env)));
            }

            newEnv = extendEnv(func.env, newBindings);

            interp(func.body, newEnv);
         }
         else {
            throw new Error("ZHRL: Invalid function application");
         }
      }
      else {
         throw new Error("ZHRL: Unimplemented expression type");
      }
   }

   export var parse = function(input : any) : ExprC {
      if (input.length === 1) {
         let firstInput = input[0]
         let num = Number(firstInput);
         if (!isNaN(num)) {
            return new NumC(num);
         }
         else if (firstInput.charAt(0) === '"' && firstInput.charAt(firstInput.length - 1) === '"') {
            return new StrC(firstInput.substring(1, firstInput.length - 1));
         }
         else {
            return new IdC(firstInput);
         }
      }
      else if (input.length === 4 && input[0] === 'if') {
         return new IfC(parse(input[1]), parse(input[2]), parse(input[3]));
      }
      // else if () {

      // }
      // else if () {

      // }
      else if (input.length === 2 && input[1] instanceof Array) {
         let func = parse(input[0]);
         let params = [];
         for (let i = 0; i < input[1].length; i++) {
            params.push(parse(input[1][i]));
         }
         return new AppC(func, params);
      }
   }
}