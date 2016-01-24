export class User {
    constructor(
        public name:string = null,
        public avatarURL:string = null)
    {
    }
    static fromJSON(json:any) {
        if (json) {
            var name:string = json.name || null;
            var avatarURL:string = json.avatar_url || null;
            return new User(name, avatarURL);
        } else {
            return new User(null, null);
        }
    }
}
