class TimeManegar {
    static nowDate :Date = new Date()

    static getDate() {
        return this.nowDate
    }

    static renderDate() {
        return this.formatDate(this.nowDate)
    }
    static nextDay() {
        this.nowDate.setDate(this.nowDate.getDate() + 1);
    } 
    static previousDay() {
        this.nowDate.setDate(this.nowDate.getDate() - 1);
    } 
    
    static nextMonth() {
        this.nowDate.setDate(this.nowDate.getDate() + 30);
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

    static formatDateMonthName(dateString: string | Date) {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        // Format the date as DD-Month-YYYY
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', options);
    
        // Remove any commas from the formatted date
        const cleanedDate = formattedDate.replace(/,/g, '');
    
        // Split and rearrange the date components
        const [month, day, year] = cleanedDate.split(' ');
    
        // Create the desired format: "Jan 12 204"
        return `${month} ${day} ${year}`;
    }
}

export default TimeManegar