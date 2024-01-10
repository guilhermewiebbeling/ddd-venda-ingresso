import { Name } from "./name.vo";

test('Must create a valid name', () => {
    const name = new Name('aaaaa');
    expect(name.value).toBe('aaaaa');
})
