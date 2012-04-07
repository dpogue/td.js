define(['src/core/resmgr', 'src/models/game_object'], function(mgr, GameObject) {

describe('GameObject', function() {
    it('should be set from a JSON object', function() {
        var stream = {
            key: {
                type: 0,
                index: 1,
                name: 'Test Game Object'
            },
            x: 10,
            y: 5,
            r: 90,
            s: 1.5
        };

        var go = mgr.read(stream);

        expect(go.ClsIdx).toBe(GameObject.prototype.ClsIdx);
        expect(go instanceof GameObject).toBe(true);

        expect(go.position_x).toBe(10);
        expect(go.position_y).toBe(5);
        expect(go.position[0]).toBe(10);
        expect(go.position[1]).toBe(5);
        expect(go.rotation).toBe(90);
        expect(go.scale).toBe(1.5);

        var diff = {
            key: {
                type: 0,
                index: 1,
                name: 'Test Game Object'
            },
            r: 180
        };
        go.read(diff);

        expect(go.position_x).toBe(10);
        expect(go.position_y).toBe(5);
        expect(go.rotation).toBe(180);
    });
});

});
