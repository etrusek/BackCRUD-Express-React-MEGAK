import {AdRecord} from "../records/ad.record";


const defautObj = {
    title: 'Test',
    description: 'Testowy opis',
}
test('Can build AdRecord', () => {
    const ad = new AdRecord(defautObj)
    expect(ad.title).toBe('Test');
    expect(ad.description).toBe('Testowy opis');

})


