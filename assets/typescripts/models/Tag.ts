export class Tag {
    constructor(
        public name:string = null,
        public color:string = null)
    {
    }
    
    static fromJSON(json:any) {
        if (json) {
            var name:string = json.name || null;
            var color:string = json.color || null;
            return new Tag(name, color);
        } else {
            return new Tag("", "");
        }
    }
}
