import { Cookie } from '../common/Cookie';

export class Me {
    constructor(
        public name:string = null,
        public avatarURL:string = null,
        public location:string = null)
    {
    }

    static fromJSON(json:any) {
        if (json) {
            var name:string = json.name || null;
            var avatarURL:string = json.avatar_url || null;
            var location:string = json.location || null;
            var accessToken:string = json.access_token || null;
            // Cookie
            Cookie.setCookie('accessToken', accessToken);
            return new Me(name, avatarURL, location);
        } else {
            return new Me(null, null, null);
        }
    }
}