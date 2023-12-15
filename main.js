/*jslint browser:true */
"use strict";

// Calculate total daily usage based on monthly input
function calculateDailyUsage(elem) {
    var totalMonthlyUsage = 0;
    var months = document.getElementById(elem).getElementsByTagName('input');

    for (var i = 0; i < months.length; i++) {
        var monthlyValue = Number(months[i].value);
        totalMonthlyUsage += monthlyValue;
    }

    return totalMonthlyUsage / 365; // Calculate and return daily usage
}

// Retrieve sun hours based on selected zone
function getSunHours() {
    var zone = document.forms.solarForm.zone.selectedIndex + 1;
    var sunHoursMap = {
        1: 6,
        2: 5.5,
        3: 5,
        4: 4.5,
        5: 4.2,
        6: 3.5,
    };
    return sunHoursMap[zone] || 0; // Return sun hours based on zone
}

// Retrieve selected panel details
function getSelectedPanel() {
    var panelOptions = document.forms.solarForm.panel.options;
    var userChoice = document.forms.solarForm.panel.selectedIndex;
    return {
        power: panelOptions[userChoice].value,
        name: panelOptions[userChoice].text
    };
}

// Calculate solar panel requirements
function calculateSolar() {
    var dailyUseKw = calculateDailyUsage('mpc');
    var sunHoursPerDay = getSunHours();
    var minKwNeeds = dailyUseKw / sunHoursPerDay;
    var realKWNeeds = minKwNeeds * 1.25;
    var realWattNeeds = realKWNeeds * 1000;
    var panelInfo = getSelectedPanel();
    var panelOutput = panelInfo.power;
    var panelName = panelInfo.name;
    var panelsNeeded = Math.ceil(realWattNeeds / panelOutput);

    var feedback = "";
    feedback += "<p>Based on your average daily use of " + Math.round(dailyUseKw) + " kWh, you will need to purchase " + panelsNeeded + " " + panelName + " solar panels to offset 100% of your electricity bill.</p>";
    feedback += "<h2>Additional Details</h2>";
    feedback += "<p>Your average daily electricity consumption: " + Math.round(dailyUseKw) + " kWh per day.</p>";
    feedback += "<p>Average sunshine hours per day: " + sunHoursPerDay + " hours</p>";
    feedback += "<p>Realistic watts needed per hour: " + Math.round(realWattNeeds) + " watts/hour.</p>";
    feedback += "<p>The " + panelName + " panel you selected generates about " + panelOutput + " watts per hour.</p>";

    document.getElementById('feedback').innerHTML = feedback;
}
