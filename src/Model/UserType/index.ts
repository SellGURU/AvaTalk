type UserTypes = 'Trial' | 'Free' | 'Pro'
import TimeManegar from "../TimeManegar"

class UserType {
    protected type : UserTypes
    protected date : Date
    protected nowDate: Date = TimeManegar.getDate()
    constructor(type: UserTypes,date:Date){
        this.type = type
        this.date = date
    }

    public getType() {
        return this.type
    }

    public getDayUsed() {
        const date = new Date(this.date)
        if(new Date(this.nowDate.getTime() -date.getTime()).getDate() <= 14){
            return new Date(this.nowDate.getTime() -date.getTime()).getDate()
        }
        return 14
    }

    public getPercentDayUsed() {
        const date = new Date(this.date)
        if(new Date(this.nowDate.getTime() -date.getTime()).getDate() * 100 / 14 <= 100){
            return new Date(this.nowDate.getTime() -date.getTime()).getDate() * 100 / 14
        }
        return 100
    }

    public getPercentDayReminded() {
        return 100 - this.getPercentDayUsed() 
    }    

    public getDaysReminded() {
        return 14 - this.getDayUsed()
    }

    public getDateExpired() {
        return TimeManegar.formatDate(this.date)
    }

}

export default UserType