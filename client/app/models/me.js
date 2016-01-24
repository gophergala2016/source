var Me = (function () {
    function Me(name, avatarURL, location, accessToken) {
        if (name === void 0) { name = null; }
        if (avatarURL === void 0) { avatarURL = null; }
        if (location === void 0) { location = null; }
        if (accessToken === void 0) { accessToken = null; }
        this.name = name;
        this.avatarURL = avatarURL;
        this.location = location;
        this.accessToken = accessToken;
    }
    Me.fromJSON = function (json) {
        if (json) {
            var name = json.name || null;
            var avatarURL = json.avatar_url || null;
            var location = json.location || null;
            var accessToken = json.access_token || null;
            return new Me(name, avatarURL, location, accessToken);
        }
        else {
            return new Me(null, null, null, null);
        }
    };
    return Me;
})();
exports.Me = Me;

//# sourceMappingURL=Me.js.map
