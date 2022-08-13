import moment from 'moment'

export class DaysService {
    getNumberOfDays(year, month){
        const momentMonth = moment.utc(`${year}-${month}`, 'YYYY-MMM');

        let counter = this._isWorkingDay(momentMonth) ? 1 : 0;
        for (let i=1; i < momentMonth.daysInMonth();i++){
            const newDay = momentMonth.add(1, 'days');
            if (this._isWorkingDay(newDay)){
                counter++
            }
        }

        return counter;
    }

    _isWorkingDay(momentDate){
        const dayNumber = momentDate.isoWeekday()

        return dayNumber !== 6 && dayNumber !== 7;
    }
}
