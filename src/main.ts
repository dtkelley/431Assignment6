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

   export var extendEnv = function(env : Environment, bindings : Binding[]) {
      return env.concat(bindings, env);
   };

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

   // export var interp = function(exp : ExprC, env : Environment) : Value {
   //    if (exp instance)
   // }
}