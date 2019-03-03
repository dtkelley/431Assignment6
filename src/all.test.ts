import { Assignment6 } from './main';

test('serialize 1', () => {
   expect(Assignment6.serialize(new Assignment6.NumV(1))).toBe("1");
});

test('serialize string', () => {
   expect(Assignment6.serialize(new Assignment6.StrV("hello"))).toBe("hello");
})