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

        expect(k.type).toBe(1);
        expect(k.index).toBe(1);
        expect(k.name).toBe('Test Key');
    });

    it('should default to an empty name', function() {
        var stream = {
            type: 1,
            index: 1
        };

        var k = new Key();
        k.read(stream);

        expect(k.type).toBe(1);
        expect(k.index).toBe(1);
        expect(k.name).toBe(null);
    });

    it('should not allow direct mutation', function() {
        var k = new Key();

        expect(k.type).not.toBeDefined();
        k.type = 5;
        expect(k.type).not.toBeDefined();

        expect(k.index).not.toBeDefined();
        k.index = 5;
        expect(k.index).not.toBeDefined();
    });

    it('should allow updating the name', function() {
        var k = new Key();

        expect(k.name).toBe(null);

        k.name = 'test'
        expect(k.name).toBe('test');
    });

    it('should check for equality', function() {
        var stream = {
            type: 1,
            index: 1
        };

        var k = new Key();
        k.read(stream);

        expect(k.equals({})).toBe(false);

        var k2 = new Key();
        k2.read(stream);

        expect(k.equals(k2)).toBe(true);

        stream.index = 2;

        var k3 = new Key();
        k3.read(stream);

        expect(k.equals(k3)).toBe(false);
    });
});

});
