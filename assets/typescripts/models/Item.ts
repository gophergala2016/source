import {User} from './User';
import {Tag} from './Tag';

export class Item {

    constructor(
        public id:number = 0,
        public githubURL:string = null,
        public author:string = null,
        public name:string = null,
        public description:string = null,
        public createdAt:string = null,
        public view:number = 0,
        public star:number = 0,
    
        public user:User = null,
        public tag:Array<Tag> = null)
    {
    }

    static fromJSON(json:any) {
        if (json) {
            var id:number = json.id || 0;
            var githubURL:string = json.github_url || null;
            var author:string = json.author || null;
            var name:string = json.name || null;
            var description:string = json.description || null;
            var createdAt:string = json.created_at || null;
            var view:number = json.view || 0;
            var star:number = json.star || 0;
            var user:User = User.fromJSON(json.user);
            var tags:Array<Tag> = null;
            for (var i = json.tags.length - 1; i >= 0; i--) {
                 var tag:Tag = Tag.fromJSON(json.tags[i]);
                 tags.push(tag);
            }
            return new Item(id, githubURL, author, name, description, createdAt, view, star, user, tags);
        } else {
            return new Item(0, null, null, null, null, null, 0, 0, null, null);
        }
    }
}
