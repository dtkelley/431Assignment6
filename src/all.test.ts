import { A6 } from './main';

//:::::::::: ENVIRONMENT TESTS ::::::::::
var mtEnv: A6.Environment = [];

test('extendEnv', () => {
   expect(A6.extendEnv(mtEnv, [new A6.Binding("+", new A6.PrimV("+"))]))
   .toEqual([new A6.Binding("+", new A6.PrimV("+"))])
})

test('envLookup', () => {
   expect(A6.envLookup(A6.topEnv, "+"))
   .toEqual(new A6.PrimV("+"))
});

test ('envLookup notfound', () => {
   expect(() => {A6.envLookup(A6.topEnv, "nope")})
   .toThrowError("ZHRL: Binding not found")
});

//:::::::::: SERIALIZE TESTS ::::::::::

test('serialize num', () => {
   expect(A6.serialize(new A6.NumV(1)))
   .toEqual("1");
});

test('serialize string', () => {
   expect(A6.serialize(new A6.StrV("hello")))
   .toEqual("hello");
});

test('serialize bool', () => {
   expect(A6.serialize(new A6.BoolV(true)))
   .toEqual("true");
});

test('serialize clo', () => {
   expect(A6.serialize(new A6.CloV(["f", "g"], new A6.NumV(1), A6.topEnv)))
   .toEqual("#<procedure>")
});

test ('serialize prim', () => {
   expect(A6.serialize(new A6.PrimV("+")))
   .toEqual("#<primop>")
});

//:::::::::: PRIMOP TESTS ::::::::::

test ('myadd', () => {
   expect(A6.myAdd(new A6.NumV(1), new A6.NumV(2)))
   .toEqual(new A6.NumV(3))
});

test ('myadd nonnumber', () => {
   expect(() => {A6.myAdd(new A6.NumV(1), new A6.BoolV(true))})
   .toThrowError("ZHRL: Invalid operands for '+'")
});

test ('mysub', () => {
   expect(A6.mySubtract(new A6.NumV(1), new A6.NumV(2)))
   .toEqual(new A6.NumV(-1))
});

test ('mysub nonnumber', () => {
   expect(() => {A6.mySubtract(new A6.BoolV(false), new A6.BoolV(true))})
   .toThrowError("ZHRL: Invalid operands for '-'")
});

test ('mymult', () => {
   expect(A6.myMult(new A6.NumV(1), new A6.NumV(2)))
   .toEqual(new A6.NumV(2))
});

test ('mymult nonnumber', () => {
   expect(() => {A6.myMult(new A6.NumV(1), new A6.BoolV(true))})
   .toThrowError("ZHRL: Invalid operands for '*'")
});

test ('mydiv', () => {
   expect(A6.myDivide(new A6.NumV(2), new A6.NumV(2)))
   .toEqual(new A6.NumV(1))
});

test ('mydivby0', () => {
   expect(() => {A6.myDivide(new A6.NumV(2), new A6.NumV(0))})
   .toThrowError("ZHRL: Division by zero is undefined")
});

test ('mydiv nonnumber', () => {
   expect(() => {A6.myDivide(new A6.NumV(1), new A6.BoolV(true))})
   .toThrowError("ZHRL: Invalid operands for '/'")
});

test ('myadd', () => {
   expect(A6.myAdd(new A6.NumV(1), new A6.NumV(2)))
   .toEqual(new A6.NumV(3))
});

test ('myleq 1', () => {
   expect(A6.myLessEqual(new A6.NumV(1), new A6.NumV(2)))
   .toEqual(new A6.BoolV(true))
});

test ('myleq 2', () => {
   expect(A6.myLessEqual(new A6.NumV(3), new A6.NumV(2)))
   .toEqual(new A6.BoolV(false))
});

test ('myleq nonnumber', () => {
   expect(() => {A6.myLessEqual(new A6.NumV(1), new A6.BoolV(true))})
   .toThrowError("ZHRL: Invalid operands for '<='")
});

test ('myequal num1', () => {
   expect(A6.myEqual(new A6.NumV(1), new A6.NumV(2)))
   .toEqual(new A6.BoolV(false))
});

test ('myequal num2', () => {
   expect(A6.myEqual(new A6.NumV(2), new A6.NumV(2)))
   .toEqual(new A6.BoolV(true))
});

test ('myequal bool', () => {
   expect(A6.myEqual(new A6.BoolV(false), new A6.BoolV(false)))
   .toEqual(new A6.BoolV(true))
});

test ('myequal str', () => {
   expect(A6.myEqual(new A6.StrV("hello world"), new A6.StrV("hello world")))
   .toEqual(new A6.BoolV(true))
});

//:::::::::: INTERP HELPER TESTS ::::::::::

test ('reserved 1 ', () => {
   expect(A6.isReserved("lam"))
   .toEqual(true)
});

test ('reserved 2', () => {
   expect(A6.isReserved("notreserved"))
   .toEqual(false)
});

//:::::::::: INTERP TESTS ::::::::::

test ('interp idc', () => {
   expect(A6.interp(new A6.IdC("+"), A6.topEnv))
   .toEqual(new A6.PrimV("+"))
});

test ('interp numc', () => {
   expect(A6.interp(new A6.NumC(9), A6.topEnv))
   .toEqual(new A6.NumV(9))
});

test ('interp strc', () => {
   expect(A6.interp(new A6.StrC("goodbye"), A6.topEnv))
   .toEqual(new A6.StrV("goodbye"))
});

test ('interp ifc', () => {
   expect(A6.interp(new A6.IfC(new A6.IdC("true"), new A6.NumC(2), new A6.NumC(9)), A6.topEnv))
   .toEqual(new A6.NumV(2))
});

test ('interp ifc invalid', () => {
   expect(() => (A6.interp(new A6.IfC(new A6.NumC(5), new A6.NumC(2), new A6.NumC(9)), A6.topEnv)))
   .toThrowError("ZHRL: cannot resolve to boolean")
});

test ('interp lamc', () => {
   expect(A6.interp(new A6.LamC(["arg1", "arg2"], new A6.NumC(12)), A6.topEnv))
   .toEqual(new A6.CloV(["arg1", "arg2"], new A6.NumC(12), A6.topEnv))
})

test ('interp appc', () => {
   expect(A6.interp(new A6.AppC(new A6.IdC("+"), [(new A6.NumC(2)), (new A6.NumC(3))]), A6.topEnv))
   .toEqual(new A6.NumV(5))
});

test ('interp appc invalid primop', () => {
   expect(() => (A6.interp(new A6.AppC(new A6.IdC("equal?"), [(new A6.NumC(2)), (new A6.NumC(3)),  (new A6.NumC(4))]), A6.topEnv)))
   .toThrowError("ZHRL: invalid number of operands for primitive operation")
});

//:::::::::: PARSE HELPER TESTS ::::::::::

test ('haswhitespace', () => {
   expect(A6.hasWhitespace("hello there is white space here"))
   .toEqual(true)
});

test ('hasDuplicates', () => {
   expect(A6.hasDuplicates(["hello", "this", "this", "is", "a", "dup"]))
   .toEqual(true)
})

test ('validId', () => {
   expect(A6.validID("valid"))
   .toEqual(true)
})

test ('INvalidId', () => {
   expect(A6.validID("not valid"))
   .toEqual(false)
})

test ('INvalidNumId', () => {
   expect(A6.validID("3"))
   .toEqual(false)
})