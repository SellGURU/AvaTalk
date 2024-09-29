type UserTypes = 'Trial' | 'Free' | 'Pro'
type previous_status_detailProps = {
    previous_type: UserTypes,
    previous_type_end_date:Date
}
import TimeManegar from "../TimeManegar"

class UserType {
    protected type : UserTypes
    protected date : Date
    protected endDate : Date
    protected nowDate: Date = TimeManegar.getDate()
    protected previous_status_detail : previous_status_detailProps | undefined
    constructor(type: UserTypes,date:Date,endDate:Date,previous_status_detail?:previous_status_detailProps){
        this.type = type
        this.date = date
        this.endDate = endDate
        this.previous_status_detail ={
            previous_type:previous_status_detail?.previous_type || 'Free',
            previous_type_end_date: new Date(previous_status_detail?.previous_type_end_date||'')
        }
    }

    public getType() {
        return this.type
    }

    getpenaltyDayUsed(){
        const date = new Date(this.date)

        if(new Date(this.nowDate.getTime() -date.getTime() +365).getDate() <= 14){
            return new Date(this.nowDate.getTime() -date.getTime()).getDate()
        }
        return 1
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
        return TimeManegar.formatDate(this.endDate)
    }

    public getDayremindToExpired(){
        const date = new Date(this.endDate)
        return Math.ceil((date.getTime() -this.nowDate.getTime()) / 86400000) - 1;
    }

    public getDayremindToExpiredFrom7Day(){
        return 7 - this.getDayremindToExpired()
    }

    public getDayremindToExpiredFrom7DayPercent(){
        if(this.getDayremindToExpiredFrom7Day() * 100 / 7 <= 100){
            return this.getDayremindToExpiredFrom7Day() * 100 / 7
        }
        return 100
    }    

    public getOldExpiredDate() {
        return TimeManegar.formatDate(this.previous_status_detail?.previous_type_end_date || new Date())
    }

    public getOldType() {
        return  this.previous_status_detail?.previous_type
    }    

    public setType(taypeName:UserTypes){
        this.type = taypeName
    }

}

export default UserType