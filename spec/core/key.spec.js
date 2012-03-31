define(['src/core/key'], function(Key) {

describe('Key', function() {
    it('should read data from json', function() {
        var stream = {
            type: 1,
            index: 1,
            name: 'Test Key'
        };

        var k = new Key();
        k.read(stream);

        expect(k.name).toBe('Test Key');
    });

    it('should fail to set a name', function() {
        var stream = {
            type: 1,
            index: 1
        };

        var k = new Key();
        k.read(stream);

        expect(k.name).toBe(null);
    });
});

});
