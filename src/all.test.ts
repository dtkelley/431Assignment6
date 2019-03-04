import { Assignment6 } from './main';

test('serialize num', () => {
   expect(Assignment6.serialize(new Assignment6.NumV(1))).toBe("1");
});

test('serialize string', () => {
   expect(Assignment6.serialize(new Assignment6.StrV("hello"))).toBe("hello");
});

test('serialize bool', () => {
   expect(Assignment6.serialize(new Assignment6.BoolV(true))).toBe("true");
});

test('serialize clo', () => {
   expect(Assignment6.serialize(new Assignment6.CloV(["f", "g"], new Assignment6.NumV(1), Assignment6.topEnv))).toBe("#<procedure>")
});

test ('serialize prim', () => {
   expect(Assignment6.serialize(new Assignment6.PrimV("+"))).toBe("#<primop>")
});

test ('myadd', () => {
   expect(Assignment6.myAdd(new Assignment6.NumV(1), new Assignment6.NumV(2))).toEqual(new Assignment6.NumV(3))
});

test ('mysub', () => {
   expect(Assignment6.mySubtract(new Assignment6.NumV(1), new Assignment6.NumV(2))).toEqual(new Assignment6.NumV(-1))
});

test ('mymult', () => {
   expect(Assignment6.myMult(new Assignment6.NumV(1), new Assignment6.NumV(2))).toEqual(new Assignment6.NumV(2))
});

test ('mydiv', () => {
   expect(Assignment6.myDivide(new Assignment6.NumV(2), new Assignment6.NumV(2))).toEqual(new Assignment6.NumV(1))
});

/* test ('mydivby0', () => {
   expect(Assignment6.myDivide(new Assignment6.NumV(2), new Assignment6.NumV(0))).toThrowError(new Error("ZHRL: Division by zero is undefined"))
}); */

test ('myadd', () => {
   expect(Assignment6.myAdd(new Assignment6.NumV(1), new Assignment6.NumV(2))).toEqual(new Assignment6.NumV(3))
});

test ('myleq 1', () => {
   expect(Assignment6.myLessEqual(new Assignment6.NumV(1), new Assignment6.NumV(2))).toEqual(new Assignment6.BoolV(true))
});

test ('myleq 2', () => {
   expect(Assignment6.myLessEqual(new Assignment6.NumV(3), new Assignment6.NumV(2))).toEqual(new Assignment6.BoolV(false))
});

test ('myequal 1', () => {
   expect(Assignment6.myEqual(new Assignment6.NumV(1), new Assignment6.NumV(2))).toEqual(new Assignment6.BoolV(false))
});

test ('myequal 2', () => {
   expect(Assignment6.myEqual(new Assignment6.NumV(2), new Assignment6.NumV(2))).toEqual(new Assignment6.BoolV(true))
});

test ('reserved 1 ', () => {
   expect(Assignment6.isReserved("lam")).toEqual(true)
});

test ('reserved 2', () => {
   expect(Assignment6.isReserved("notreserved")).toEqual(false)
});

////////////////////////////////////////////////////////

test ('interp idc', () => {
   expect(Assignment6.interp(new Assignment6.IdC("+"), Assignment6.topEnv)).toEqual(new Assignment6.PrimV("+"))
});

test ('interp numc', () => {
   expect(Assignment6.interp(new Assignment6.NumC(9), Assignment6.topEnv)).toEqual(new Assignment6.NumV(9))
});

test ('interp strc', () => {
   expect(Assignment6.interp(new Assignment6.StrC("goodbye"), Assignment6.topEnv)).toEqual(new Assignment6.StrV("goodbye"))
});

test ('interp ifc', () => {
   expect(Assignment6.interp(new Assignment6.IfC(new Assignment6.IdC("true"), new Assignment6.NumC(2), new Assignment6.NumC(9)), Assignment6.topEnv)).toEqual(new Assignment6.NumV(2))
});

test ('lamc', () => {
   expect(Assignment6.interp(new Assignment6.LamC(["arg1", "arg2"], new Assignment6.NumC(12)), Assignment6.topEnv)).toEqual(new Assignment6.CloV(["arg1", "arg2"], new Assignment6.NumC(12), Assignment6.topEnv))
})

test ('appc', () => {
   expect(Assignment6.interp(new Assignment6.AppC(new Assignment6.IdC("+"), [(new Assignment6.NumC(2)), (new Assignment6.NumC(3))]), Assignment6.topEnv)).toEqual(new Assignment6.NumV(5))
});

/////////////////////////////////////////////////////