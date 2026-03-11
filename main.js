const fs = require("fs");

// ============================================================
// Function 1: getShiftDuration(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getShiftDuration(startTime, endTime) {
    function timeToSeconds(timeStr) {
        timeStr = timeStr.trim();
        let parts = timeStr.split(" ");
        let timePart = parts[0];
        let period = parts[1].toLowerCase();
        let [hours, minutes, seconds] = timePart.split(":").map(Number);
        if (period === "pm" && hours !== 12) hours += 12;
        if (period === "am" && hours === 12) hours = 0;
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    let startSeconds = timeToSeconds(startTime);
    let endSeconds   = timeToSeconds(endTime);
    let diffSeconds  = endSeconds - startSeconds;

    // Handle overnight shifts (end time is next day)
    if (diffSeconds < 0) {
        diffSeconds += 24 * 3600;
    }

    let h  = Math.floor(diffSeconds / 3600);
    let m  = Math.floor((diffSeconds % 3600) / 60);
    let s  = diffSeconds % 60;
    let mm = m < 10 ? "0" + m : String(m);
    let ss = s < 10 ? "0" + s : String(s);

    return h + ":" + mm + ":" + ss;
}


// ============================================================
// Function 2: getIdleTime(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getIdleTime(startTime, endTime) {
    function timeToSeconds(timeStr) {
        timeStr = timeStr.trim();
        let parts = timeStr.split(" ");
        let timePart = parts[0];
        let period = parts[1].toLowerCase();
        let [hours, minutes, seconds] = timePart.split(":").map(Number);
        if (period === "pm" && hours !== 12) hours += 12;
        if (period === "am" && hours === 12) hours = 0;
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    let startSeconds  = timeToSeconds(startTime);
    let endSeconds    = timeToSeconds(endTime);
    let deliveryStart = 8 * 3600;   // 8:00 AM
    let deliveryEnd   = 22 * 3600;  // 10:00 PM

    let idleSeconds = 0;

    // Idle BEFORE 8:00 AM
    if (startSeconds < deliveryStart) {
        idleSeconds += deliveryStart - startSeconds;
    }

    // Idle AFTER 10:00 PM
    if (endSeconds > deliveryEnd) {
        idleSeconds += endSeconds - deliveryEnd;
    }

    let h  = Math.floor(idleSeconds / 3600);
    let m  = Math.floor((idleSeconds % 3600) / 60);
    let s  = idleSeconds % 60;
    let mm = m < 10 ? "0" + m : String(m);
    let ss = s < 10 ? "0" + s : String(s);

    return h + ":" + mm + ":" + ss;
}

// ============================================================
// Function 3: getActiveTime(shiftDuration, idleTime)
// shiftDuration: (typeof string) formatted as h:mm:ss
// idleTime: (typeof string) formatted as h:mm:ss
// Returns: string formatted as h:mm:ss
// ============================================================
function getActiveTime(shiftDuration, idleTime) {
    function durationToSeconds(durationStr) {
        durationStr = durationStr.trim();
        let [hours, minutes, seconds] = durationStr.split(":").map(Number);
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    let shiftSeconds  = durationToSeconds(shiftDuration);
    let idleSeconds   = durationToSeconds(idleTime);
    let activeSeconds = shiftSeconds - idleSeconds;

    let h  = Math.floor(activeSeconds / 3600);
    let m  = Math.floor((activeSeconds % 3600) / 60);
    let s  = activeSeconds % 60;
    let mm = m < 10 ? "0" + m : String(m);
    let ss = s < 10 ? "0" + s : String(s);

    return h + ":" + mm + ":" + ss;
}

// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================
function metQuota(date, activeTime) {
    let parts = date.split("-");
    let month = parseInt(parts[1]);
    let day   = parseInt(parts[2]);

    // Eid al-Fitr: April 10–30 inclusive
    let isEid = (month === 4 && day >= 10 && day <= 30);

    let quotaSeconds;
    if (isEid) {
        quotaSeconds = 6 * 3600;               // 6 hours
    } else {
        quotaSeconds = (8 * 3600) + (24 * 60); // 8 hours 24 minutes
    }

    let timeParts     = activeTime.trim().split(":").map(Number);
    let activeSeconds = (timeParts[0] * 3600) + (timeParts[1] * 60) + timeParts[2];

    return activeSeconds >= quotaSeconds;
}


// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(textFile, shiftObj) {
    // TODO: Implement this function
}

// ============================================================
// Function 6: setBonus(textFile, driverID, date, newValue)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// date: (typeof string) formatted as yyyy-mm-dd
// newValue: (typeof boolean)
// Returns: nothing (void)
// ============================================================
function setBonus(textFile, driverID, date, newValue) {
    // TODO: Implement this function
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
function countBonusPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getTotalActiveHoursPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 9: getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month)
// textFile: (typeof string) path to shifts text file
// rateFile: (typeof string) path to driver rates text file
// bonusCount: (typeof number) total bonuses for given driver per month
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 10: getNetPay(driverID, actualHours, requiredHours, rateFile)
// driverID: (typeof string)
// actualHours: (typeof string) formatted as hhh:mm:ss
// requiredHours: (typeof string) formatted as hhh:mm:ss
// rateFile: (typeof string) path to driver rates text file
// Returns: integer (net pay)
// ============================================================
function getNetPay(driverID, actualHours, requiredHours, rateFile) {
    // TODO: Implement this function
}

module.exports = {
    getShiftDuration,
    getIdleTime,
    getActiveTime,
    metQuota,
    addShiftRecord,
    setBonus,
    countBonusPerMonth,
    getTotalActiveHoursPerMonth,
    getRequiredHoursPerMonth,
    getNetPay
};
