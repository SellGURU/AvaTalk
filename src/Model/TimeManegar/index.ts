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
    
    static nextMonth() {
        this.nowDate.setDate(this.nowDate.getMonth() + 1);
    } 

    static formatDate(dateString:string | Date) {
        // Create a Date object from the input string
        const date = new Date(dateString);

        // Extract year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');

        // Return formatted date as YYYY-MM-DD
        return `${year}-${day}-${month}`;
}
}

export default TimeManegar