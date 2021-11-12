import * as bcrypt from "bcryptjs";


export class HashManager {

    public hash(text: string): string {
        const rounds = 12;
        const salt = bcrypt.genSaltSync(rounds);
        const result = bcrypt.hashSync(text, salt);
        return result;
    }

    public compare(text: string, hash: string): boolean{
        return bcrypt.compareSync(text, hash);
    }

}