// ============================================================
// MGIT HOLIDAY CALENDAR
// 2026 - 2030
// ============================================================


// ============================================================
// 2026 HOLIDAYS
// ============================================================

const holidays2026 = {

    "01-01-2026": "New Year",
    "14-01-2026": "Bhogi",
    "15-01-2026": "Sankranti / Pongal",
    "16-01-2026": "Kanumu",
    "26-01-2026": "Republic Day",

    "15-02-2026": "Maha Shivaratri",
    "03-03-2026": "Holi",
    "19-03-2026": "Ugadi",
    "21-03-2026": "Ramzan / Eid-ul-Fitr",
    "27-03-2026": "Sri Rama Navami",

    "03-04-2026": "Good Friday",
    "14-04-2026": "Dr. B.R. Ambedkar Jayanti",
    "27-05-2026": "Bakrid / Eid-ul-Adha",
    "26-06-2026": "Muharram",

    "10-08-2026": "Bonalu",
    "15-08-2026": "Independence Day",
    "26-08-2026": "Eid Milad-un-Nabi",

    "04-09-2026": "Sri Krishna Janmashtami",
    "14-09-2026": "Vinayaka Chavithi",
    "02-10-2026": "Gandhi Jayanti",
    "19-10-2026": "Durgashtami / Mahanavami",
    "20-10-2026": "Vijaya Dasami / Dussehra",

    "07-11-2026": "Naraka Chaturdashi",
    "08-11-2026": "Diwali",
    "24-11-2026": "Karthika Purnima / Guru Nanak Jayanti",

    "25-12-2026": "Christmas",
    "26-12-2026": "Following Day of Christmas"

};


// ============================================================
// 2027 HOLIDAYS
// ============================================================

const holidays2027 = {

    "01-01-2027": "New Year",
    "26-01-2027": "Republic Day"

};


// ============================================================
// 2028 HOLIDAYS
// ============================================================

const holidays2028 = {

    "01-01-2028": "New Year",
    "26-01-2028": "Republic Day"

};


// ============================================================
// 2029 HOLIDAYS
// ============================================================

const holidays2029 = {

    "01-01-2029": "New Year",
    "26-01-2029": "Republic Day"

};


// ============================================================
// 2030 HOLIDAYS
// ============================================================

const holidays2030 = {

    "01-01-2030": "New Year",
    "26-01-2030": "Republic Day"

};


// ============================================================
// ALL YEARS
// ============================================================

const allHolidays = {

    2026: holidays2026,
    2027: holidays2027,
    2028: holidays2028,
    2029: holidays2029,
    2030: holidays2030

};


// ============================================================
// CURRENT YEAR / MONTH
// ============================================================

let currentYear = 2026;
let currentMonth = 0;


// ============================================================
// WEEKLY HOLIDAY
// Sunday + 2nd Saturday + 4th Saturday
// ============================================================

function getWeeklyHolidayName(date) {

    const day = date.getDay();
    const dateNumber = date.getDate();


    // Every Sunday
    if (day === 0) {
        return "Sunday";
    }


    // Every Saturday
    if (day === 6) {

        // 2nd Saturday
        if (dateNumber >= 8 && dateNumber <= 14) {
            return "2nd Saturday";
        }


        // 4th Saturday
        if (dateNumber >= 22 && dateNumber <= 28) {
            return "4th Saturday";
        }

    }


    return null;
}


// ============================================================
// HOLIDAY NAME
// ============================================================

function getHolidayName(date) {

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const dateKey = `${day}-${month}-${year}`;

    const yearHolidays = allHolidays[year] || {};


    // Special holiday has priority
    if (yearHolidays[dateKey]) {
        return yearHolidays[dateKey];
    }


    // Weekly holiday
    return getWeeklyHolidayName(date);

}


// ============================================================
// HOLIDAY CHECK
// ============================================================

function isHoliday(date) {

    return getHolidayName(date) !== null;

}


// ============================================================
// HOLIDAY TYPE
// ============================================================

function getHolidayType(date) {

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const dateKey = `${day}-${month}-${year}`;

    const yearHolidays = allHolidays[year] || {};


    if (yearHolidays[dateKey]) {
        return "special";
    }


    if (getWeeklyHolidayName(date)) {
        return "weekly";
    }


    return "working";

}


// ============================================================
// MONTH STATISTICS
// ============================================================

function updateMonthStatistics() {

    const daysInMonth = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();


    let holidays = 0;
    let workingDays = 0;


    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const date = new Date(
            currentYear,
            currentMonth,
            day
        );


        if (isHoliday(date)) {

            holidays++;

        } else {

            workingDays++;

        }

    }


    document.getElementById("monthTotalDays").textContent =
        daysInMonth;


    document.getElementById("monthHolidays").textContent =
        holidays;


    document.getElementById("monthWorkingDays").textContent =
        workingDays;

}


// ============================================================
// RENDER CALENDAR
// ============================================================

function renderCalendar() {

    const calendar =
        document.getElementById("calendar");


    calendar.innerHTML = "";


    const monthNames = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];


    document.getElementById("monthYear").textContent =
        `${monthNames[currentMonth]} ${currentYear}`;


    const firstDay = new Date(
        currentYear,
        currentMonth,
        1
    ).getDay();


    const daysInMonth = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();


    // Empty cells
    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const emptyDay =
            document.createElement("div");


        emptyDay.className = "day";


        emptyDay.style.visibility =
            "hidden";


        calendar.appendChild(emptyDay);

    }


    // Create calendar days
    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const date = new Date(
            currentYear,
            currentMonth,
            day
        );


        const dayElement =
            document.createElement("div");


        dayElement.className = "day";


        // Day number
        const numberElement =
            document.createElement("div");


        numberElement.className =
            "day-number";


        numberElement.textContent =
            day;


        dayElement.appendChild(
            numberElement
        );


        // Holiday
        const holidayName =
            getHolidayName(date);


        const holidayType =
            getHolidayType(date);


        if (holidayName) {

            if (holidayType === "special") {

                dayElement.classList.add(
                    "special-holiday"
                );

            } else {

                dayElement.classList.add(
                    "weekly-holiday"
                );

            }


            const holidayElement =
                document.createElement("div");


            holidayElement.className =
                "holiday-name";


            holidayElement.textContent =
                holidayName;


            dayElement.appendChild(
                holidayElement
            );

        }


        // Today
        const today = new Date();


        if (

            today.getFullYear() === currentYear &&

            today.getMonth() === currentMonth &&

            today.getDate() === day

        ) {

            dayElement.classList.add(
                "today"
            );

        }


        calendar.appendChild(
            dayElement
        );

    }


    // Update monthly statistics
    updateMonthStatistics();

}


// ============================================================
// YEAR STATISTICS
// ============================================================

function getYearStatistics(year) {

    let totalDays = 0;
    let totalHolidays = 0;
    let workingDays = 0;


    const startDate =
        new Date(year, 0, 1);


    const endDate =
        new Date(year + 1, 0, 1);


    let currentDate =
        new Date(startDate);


    while (currentDate < endDate) {

        totalDays++;


        if (isHoliday(currentDate)) {

            totalHolidays++;

        } else {

            workingDays++;

        }


        currentDate.setDate(
            currentDate.getDate() + 1
        );

    }


    return {

        totalDays,
        totalHolidays,
        workingDays

    };

}


// ============================================================
// COMPLETED / REMAINING HOLIDAYS
// ============================================================

function getHolidayProgress(year) {

    const today = new Date();


    let completed = 0;
    let remaining = 0;


    const startDate =
        new Date(year, 0, 1);


    const endDate =
        new Date(year + 1, 0, 1);


    let currentDate =
        new Date(startDate);


    while (currentDate < endDate) {

        if (isHoliday(currentDate)) {

            if (currentDate < today) {

                completed++;

            } else {

                remaining++;

            }

        }


        currentDate.setDate(
            currentDate.getDate() + 1
        );

    }


    return {

        completed,
        remaining

    };

}


// ============================================================
// UPDATE YEAR STATISTICS
// ============================================================

function updateStatistics() {

    const stats =
        getYearStatistics(currentYear);


    const progress =
        getHolidayProgress(currentYear);


    document.getElementById(
        "totalDays"
    ).textContent =
        stats.totalDays;


    document.getElementById(
        "totalHolidays"
    ).textContent =
        stats.totalHolidays;


    document.getElementById(
        "completedHolidays"
    ).textContent =
        progress.completed;


    document.getElementById(
        "remainingHolidays"
    ).textContent =
        progress.remaining;


    document.getElementById(
        "workingDays"
    ).textContent =
        stats.workingDays;

}


// ============================================================
// CHANGE YEAR
// ============================================================

function changeYear(year) {

    currentYear = year;

    currentMonth = 0;


    renderCalendar();

    updateStatistics();

    updateYearButtons();

}


// ============================================================
// YEAR BUTTON ACTIVE
// ============================================================

function updateYearButtons() {

    const buttons =
        document.querySelectorAll(
            ".year-selector button"
        );


    buttons.forEach(button => {

        if (
            Number(button.textContent) === currentYear
        ) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");

        }

    });

}


// ============================================================
// PREVIOUS MONTH
// ============================================================

function previousMonth() {

    currentMonth--;


    if (currentMonth < 0) {

        currentMonth = 11;
        currentYear--;

    }


    if (currentYear < 2026) {

        currentYear = 2026;
        currentMonth = 0;

    }


    renderCalendar();

    updateStatistics();

    updateYearButtons();

}


// ============================================================
// NEXT MONTH
// ============================================================

function nextMonth() {

    currentMonth++;


    if (currentMonth > 11) {

        currentMonth = 0;
        currentYear++;

    }


    if (currentYear > 2030) {

        currentYear = 2030;
        currentMonth = 11;

    }


    renderCalendar();

    updateStatistics();

    updateYearButtons();

}


// ============================================================
// INITIAL LOAD
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCalendar();

        updateStatistics();

        updateYearButtons();

    }
);