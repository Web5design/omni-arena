var Spell = require("../models/spell");

module.exports = {
    run: function(connection, collections, data) {
        if (connection.player == null) {
            return {error: "Invalid spell event"};
        }
        if (!connection.player.get('alive')) {
            return {error: "Can't cast while dead."};
        }
        if (data.x == null || data.y == null) {
            return {error: "Invalid spell event"};
        }
        var newID = collections.spells.nextID();
        var newSpell = new Spell({
            id: newID,
            x: connection.player.get('x'),
            y: connection.player.get('y'),
            player: connection.player,
            color: connection.player.get('color')
        });
        collections.spells.add(newSpell);
        newSpell.projectTowards(data.x, data.y, 0.6, collections, function(spell) {
            collections.spells.remove(spell);
        });
    }
}