type UserTypes = 'Trial' | 'Free' | 'Pro'

class UserType {
    protected type : UserTypes
    protected date : Date
    protected nowDate: Date = new Date()
    constructor(type: UserTypes,date:Date){
        this.type = type
        this.date = date
    }

    public getType() {
        return this.type
    }

    public getDayUsed() {
        const date = new Date(this.date)
        return new Date(this.nowDate.getTime() -date.getTime()).getDate()
    }

    public getPercentDayUsed() {
        const date = new Date(this.date)
        return new Date(this.nowDate.getTime() -date.getTime()).getDate() * 100 / 14
    }

    public nextDay() {
        this.nowDate.setDate(this.nowDate.getDate() + 1);
    }
}

export default UserType