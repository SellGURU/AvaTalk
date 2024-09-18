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

    public getOldExpiredDate() {
        return TimeManegar.formatDate(this.previous_status_detail?.previous_type_end_date || new Date())
    }

    public getOldType() {
        return  this.previous_status_detail?.previous_type
    }    

}

export default UserType