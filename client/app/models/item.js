var User_1 = require('./User');
var Tag_1 = require('./Tag');
var Item = (function () {
    function Item(id, githubURL, author, name, description, createdAt, view, star, user, tag) {
        if (id === void 0) { id = 0; }
        if (githubURL === void 0) { githubURL = null; }
        if (author === void 0) { author = null; }
        if (name === void 0) { name = null; }
        if (description === void 0) { description = null; }
        if (createdAt === void 0) { createdAt = null; }
        if (view === void 0) { view = 0; }
        if (star === void 0) { star = 0; }
        if (user === void 0) { user = null; }
        if (tag === void 0) { tag = null; }
        this.id = id;
        this.githubURL = githubURL;
        this.author = author;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.view = view;
        this.star = star;
        this.user = user;
        this.tag = tag;
    }
    Item.fromJSON = function (json) {
        if (json) {
            var id = json.id || 0;
            var githubURL = json.github_url || null;
            var author = json.author || null;
            var name = json.name || null;
            var description = json.description || null;
            var createdAt = json.created_at || null;
            var view = json.view || 0;
            var star = json.star || 0;
            var user = User_1.User.fromJSON(json.user);
            var tags = null;
            for (var i = json.tags.length - 1; i >= 0; i--) {
                var tag = Tag_1.Tag.fromJSON(json.tags[i]);
                tags.push(tag);
            }
            return new Item(id, githubURL, author, name, description, createdAt, view, star, user, tags);
        }
        else {
            return new Item(0, null, null, null, null, null, 0, 0, null, null);
        }
    };
    return Item;
})();
exports.Item = Item;

//# sourceMappingURL=Item.js.map
