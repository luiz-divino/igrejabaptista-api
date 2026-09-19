export class UserVerificationError extends Error{
    constructor(){
        super("User not allowed");
        this.name = 'UserVerificationError';
    }
}