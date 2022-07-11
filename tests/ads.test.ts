import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";

const defaultObj = {
    title: 'Test',
    description: 'Testowy opis',
}

beforeAll(async () => {
    const ad = new AdRecord(defaultObj);
    await ad.insert();
})

afterAll(async () => {
    await pool.end();
})

test('AdRecord.getOne returns null from database for unexisting entrty.', async () => {
    const ad = await AdRecord.getOne('asc');
    expect(ad).toBeNull();
});

test('AdRecord.findAll returns array of found entries', async () => {
    const ad = await AdRecord.findAll('');
    expect(ad).not.toEqual([]);
    expect(ad[0].id).toBeDefined();
});
test('AdRecord.findAll returns array of found entries when searching for "e"', async () => {
    const ad = await AdRecord.findAll('e');
    expect(ad).not.toEqual([]);
    expect(ad[0].id).toBeDefined();
})
test('AdRecord.findAll returns empty array of found entries when searching for "x"', async () => {
    const ad = await AdRecord.findAll('x');
    expect(ad).toEqual([]);
})
test('AdRecord.insert returns new UUID', async () => {
    const defObj = {
        title: 'Nauka',
        description: 'Poczytać 15min',
    }
    const ad = new AdRecord(defObj);
    await ad.insert();
    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
})

test('AdRecord.delete', async () => {
    const ad = new AdRecord(defaultObj);
    await ad.insert();
    // await ad.delete();
    const af = await AdRecord.getOne(ad.id);
    expect(ad.id).toBeDefined();
    expect(af).toBeNull();
    // expect(typeof ad.id).toBe('string');
})
