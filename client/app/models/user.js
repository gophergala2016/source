var User = (function () {
    function User(name, avatarURL) {
        if (name === void 0) { name = null; }
        if (avatarURL === void 0) { avatarURL = null; }
        this.name = name;
        this.avatarURL = avatarURL;
    }
    User.fromJSON = function (json) {
        if (json) {
            var name = json.name || null;
            var avatarURL = json.avatar_url || null;
            return new User(name, avatarURL);
        }
        else {
            return new User(null, null);
        }
    };
    return User;
})();
exports.User = User;

//# sourceMappingURL=User.js.map
