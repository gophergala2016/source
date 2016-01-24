var Cookie_1 = require('../common/Cookie');
var Me = (function () {
    function Me(name, avatarURL, location) {
        if (name === void 0) { name = null; }
        if (avatarURL === void 0) { avatarURL = null; }
        if (location === void 0) { location = null; }
        this.name = name;
        this.avatarURL = avatarURL;
        this.location = location;
    }
    Me.fromJSON = function (json) {
        if (json) {
            var name = json.name || null;
            var avatarURL = json.avatar_url || null;
            var location = json.location || null;
            var accessToken = json.access_token || null;
            // Cookie
            Cookie_1.Cookie.setCookie('accessToken', accessToken);
            return new Me(name, avatarURL, location);
        }
        else {
            return new Me(null, null, null);
        }
    };
    return Me;
})();
exports.Me = Me;

//# sourceMappingURL=Me.js.map
