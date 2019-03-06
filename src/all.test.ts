import { Assignment6 } from './main';

//:::::::::: ENVIRONMENT TESTS ::::::::::
var mtEnv: Assignment6.Environment = [];

test('extendEnv', () => {
   expect(Assignment6.extendEnv(mtEnv, [new Assignment6.Binding("+", new Assignment6.PrimV("+"))]))
   .toEqual([new Assignment6.Binding("+", new Assignment6.PrimV("+"))])
})

test('envLookup', () => {
   expect(Assignment6.envLookup(Assignment6.topEnv, "+"))
   .toEqual(new Assignment6.PrimV("+"))
});

test ('envLookup notfound', () => {
   expect(() => {Assignment6.envLookup(Assignment6.topEnv, "nope")})
   .toThrowError("ZHRL: Binding not found")
});

//:::::::::: SERIALIZE TESTS ::::::::::

test('serialize num', () => {
   expect(Assignment6.serialize(new Assignment6.NumV(1)))
   .toEqual("1");
});

test('serialize string', () => {
   expect(Assignment6.serialize(new Assignment6.StrV("hello")))
   .toEqual("hello");
});

test('serialize bool', () => {
   expect(Assignment6.serialize(new Assignment6.BoolV(true)))
   .toEqual("true");
});

test('serialize clo', () => {
   expect(Assignment6.serialize(new Assignment6.CloV(["f", "g"], new Assignment6.NumV(1), Assignment6.topEnv)))
   .toEqual("#<procedure>")
});

test ('serialize prim', () => {
   expect(Assignment6.serialize(new Assignment6.PrimV("+")))
   .toEqual("#<primop>")
});

//:::::::::: PRIMOP TESTS ::::::::::

test ('myadd', () => {
   expect(Assignment6.myAdd(new Assignment6.NumV(1), new Assignment6.NumV(2)))
   .toEqual(new Assignment6.NumV(3))
});

test ('myadd nonnumber', () => {
   expect(() => {Assignment6.myAdd(new Assignment6.NumV(1), new Assignment6.BoolV(true))})
   .toThrowError("ZHRL: Invalid operands for '+'")
});

test ('mysub', () => {
   expect(Assignment6.mySubtract(new Assignment6.NumV(1), new Assignment6.NumV(2)))
   .toEqual(new Assignment6.NumV(-1))
});

test ('mysub nonnumber', () => {
   expect(() => {Assignment6.mySubtract(new Assignment6.BoolV(false), new Assignment6.BoolV(true))})
   .toThrowError("ZHRL: Invalid operands for '-'")
});

test ('mymult', () => {
   expect(Assignment6.myMult(new Assignment6.NumV(1), new Assignment6.NumV(2)))
   .toEqual(new Assignment6.NumV(2))
});

test ('mymult nonnumber', () => {
   expect(() => {Assignment6.myMult(new Assignment6.NumV(1), new Assignment6.BoolV(true))})
   .toThrowError("ZHRL: Invalid operands for '*'")
});

test ('mydiv', () => {
   expect(Assignment6.myDivide(new Assignment6.NumV(2), new Assignment6.NumV(2)))
   .toEqual(new Assignment6.NumV(1))
});

test ('mydivby0', () => {
   expect(() => {Assignment6.myDivide(new Assignment6.NumV(2), new Assignment6.NumV(0))})
   .toThrowError("ZHRL: Division by zero is undefined")
});

test ('mydiv nonnumber', () => {
   expect(() => {Assignment6.myDivide(new Assignment6.NumV(1), new Assignment6.BoolV(true))})
   .toThrowError("ZHRL: Invalid operands for '/'")
});

test ('myadd', () => {
   expect(Assignment6.myAdd(new Assignment6.NumV(1), new Assignment6.NumV(2)))
   .toEqual(new Assignment6.NumV(3))
});

test ('myleq 1', () => {
   expect(Assignment6.myLessEqual(new Assignment6.NumV(1), new Assignment6.NumV(2)))
   .toEqual(new Assignment6.BoolV(true))
});

test ('myleq 2', () => {
   expect(Assignment6.myLessEqual(new Assignment6.NumV(3), new Assignment6.NumV(2)))
   .toEqual(new Assignment6.BoolV(false))
});

test ('myleq nonnumber', () => {
   expect(() => {Assignment6.myLessEqual(new Assignment6.NumV(1), new Assignment6.BoolV(true))})
   .toThrowError("ZHRL: Invalid operands for '<='")
});

test ('myequal num1', () => {
   expect(Assignment6.myEqual(new Assignment6.NumV(1), new Assignment6.NumV(2)))
   .toEqual(new Assignment6.BoolV(false))
});

test ('myequal num2', () => {
   expect(Assignment6.myEqual(new Assignment6.NumV(2), new Assignment6.NumV(2)))
   .toEqual(new Assignment6.BoolV(true))
});

test ('myequal bool', () => {
   expect(Assignment6.myEqual(new Assignment6.BoolV(false), new Assignment6.BoolV(false)))
   .toEqual(new Assignment6.BoolV(true))
});

test ('myequal str', () => {
   expect(Assignment6.myEqual(new Assignment6.StrV("hello world"), new Assignment6.StrV("hello world")))
   .toEqual(new Assignment6.BoolV(true))
});

//:::::::::: INTERP HELPER TESTS ::::::::::

test ('reserved 1 ', () => {
   expect(Assignment6.isReserved("lam"))
   .toEqual(true)
});

test ('reserved 2', () => {
   expect(Assignment6.isReserved("notreserved"))
   .toEqual(false)
});

//:::::::::: INTERP TESTS ::::::::::

test ('interp idc', () => {
   expect(Assignment6.interp(new Assignment6.IdC("+"), Assignment6.topEnv))
   .toEqual(new Assignment6.PrimV("+"))
});

test ('interp numc', () => {
   expect(Assignment6.interp(new Assignment6.NumC(9), Assignment6.topEnv))
   .toEqual(new Assignment6.NumV(9))
});

test ('interp strc', () => {
   expect(Assignment6.interp(new Assignment6.StrC("goodbye"), Assignment6.topEnv))
   .toEqual(new Assignment6.StrV("goodbye"))
});

test ('interp ifc', () => {
   expect(Assignment6.interp(new Assignment6.IfC(new Assignment6.IdC("true"), new Assignment6.NumC(2), new Assignment6.NumC(9)), Assignment6.topEnv))
   .toEqual(new Assignment6.NumV(2))
});

test ('interp ifc invalid', () => {
   expect(() => (Assignment6.interp(new Assignment6.IfC(new Assignment6.NumC(5), new Assignment6.NumC(2), new Assignment6.NumC(9)), Assignment6.topEnv)))
   .toThrowError("ZHRL: cannot resolve to boolean")
});

test ('interp lamc', () => {
   expect(Assignment6.interp(new Assignment6.LamC(["arg1", "arg2"], new Assignment6.NumC(12)), Assignment6.topEnv))
   .toEqual(new Assignment6.CloV(["arg1", "arg2"], new Assignment6.NumC(12), Assignment6.topEnv))
})

test ('interp appc', () => {
   expect(Assignment6.interp(new Assignment6.AppC(new Assignment6.IdC("+"), [(new Assignment6.NumC(2)), (new Assignment6.NumC(3))]), Assignment6.topEnv))
   .toEqual(new Assignment6.NumV(5))
});

test ('interp appc invalid primop', () => {
   expect(() => (Assignment6.interp(new Assignment6.AppC(new Assignment6.IdC("equal?"), [(new Assignment6.NumC(2)), (new Assignment6.NumC(3)),  (new Assignment6.NumC(4))]), Assignment6.topEnv)))
   .toThrowError("ZHRL: invalid number of operands for primitive operation")
});

//:::::::::: PARSE HELPER TESTS ::::::::::

test ('haswhitespace', () => {
   expect(Assignment6.hasWhitespace("hello there is white space here"))
   .toEqual(true)
});

test ('hasDuplicates', () => {
   expect(Assignment6.hasDuplicates(["hello", "this", "this", "is", "a", "dup"]))
   .toEqual(true)
})

test ('validId', () => {
   expect(Assignment6.validID("valid"))
   .toEqual(true)
})

test ('INvalidId', () => {
   expect(Assignment6.validID("not valid"))
   .toEqual(false)
})

test ('INvalidNumId', () => {
   expect(Assignment6.validID("3"))
   .toEqual(false)
})