import { Name } from "./name.vo";

test('Deve criar um nome válido', () => {
    const name = new Name('aaaaa');
    expect(name.value).toBe('aaaaa');
})
