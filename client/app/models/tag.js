var Tag = (function () {
    function Tag(name, color) {
        if (name === void 0) { name = null; }
        if (color === void 0) { color = null; }
        this.name = name;
        this.color = color;
    }
    Tag.fromJSON = function (json) {
        if (json) {
            var name = json.name || null;
            var color = json.color || null;
            return new Tag(name, color);
        }
        else {
            return new Tag("", "");
        }
    };
    return Tag;
})();
exports.Tag = Tag;

//# sourceMappingURL=Tag.js.map
