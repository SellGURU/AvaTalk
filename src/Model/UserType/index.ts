type UserTypes = 'Trial' | 'Free' | 'Pro'

class UserType {
    protected type : UserTypes
    protected date : Date
    constructor(type: UserTypes,date:Date){
        this.type = type
        this.date = date
    }

    public getType() {
        return this.type
    }

    public getDayUsed() {
        const date = new Date(this.date)
        return new Date(new Date().getTime() -date.getTime()).getDate()
    }

    getPercentDayUsed() {
        const date = new Date(this.date)
        return new Date(new Date().getTime() -date.getTime()).getDate() * 100 / 14
    }
}

export default UserType