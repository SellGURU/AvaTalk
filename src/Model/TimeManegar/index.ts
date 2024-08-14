class TimeManegar {
    static nowDate :Date = new Date()

    static getDate() {
        return this.nowDate
    }

    static renderDate() {
        return this.nowDate.getUTCFullYear() +'-'+Number(this.nowDate.getUTCMonth()+1)+"-"+this.nowDate.getUTCDate()
    }
    static nextDay() {
        this.nowDate.setDate(this.nowDate.getDate() + 1);
    }    
}

export default TimeManegar