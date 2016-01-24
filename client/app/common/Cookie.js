/**
 * Class Cookie - Holds static functions to deal with Cookies
 *
 *  @copyright https://github.com/BCJTI/ng2-cookies
 *
 */
var Cookie = (function () {
    function Cookie() {
    }
    /**
     * Retrieves a single cookie by it's name
     *
     * @param  {string} name Identification of the Cookie
     * @returns The Cookie's value
     */
    Cookie.getCookie = function (name) {
        var myWindow = window;
        name = myWindow.escape(name);
        var regexp = new RegExp('(?:^' + name + '|;\s*' + name + ')=(.*?)(?:;|$)', 'g');
        var result = regexp.exec(document.cookie);
        return (result === null) ? null : myWindow.unescape(result[1]);
    };
    /**
     * Save the Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} value Cookie's value
     * @param  {number} expires Cookie's expiration date in days from now. If it's undefined the cookie is a session Cookie
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     */
    Cookie.setCookie = function (name, value, expires, path, domain) {
        var myWindow = window;
        var cookieStr = myWindow.escape(name) + '=' + myWindow.escape(value) + ';';
        if (expires) {
            var dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
            cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
        }
        if (path) {
            cookieStr += 'path=' + path + ';';
        }
        if (domain) {
            cookieStr += 'domain=' + domain + ';';
        }
        // console.log(cookieStr);
        document.cookie = cookieStr;
    };
    /**
     * Removes specified Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     */
    Cookie.deleteCookie = function (name, path, domain) {
        // If the cookie exists
        if (Cookie.getCookie(name)) {
            Cookie.setCookie(name, '', -1, path, domain);
        }
    };
    return Cookie;
})();
exports.Cookie = Cookie;

//# sourceMappingURL=Cookie.js.map
