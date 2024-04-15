

document.getElementById('fetchSchedule').addEventListener('click', function() {//event listener button
    const year = document.getElementById('yearInput').value;//retrive the data from input field name yearInput
   
    if (!year) {//check if empty 
        //if empty allert the user

        alert('Please enter  year');
        return;
    }
    
    const apiUrl = `https://ergast.com/api/f1/${year}.json`;//url to fetch data
    
    fetch(apiUrl)//make a request
        .then(response => response.json())//converting request to json
        .then(data => {

            displaySchedule(data);

        })
        .catch(error => {//for handling errors
            alert('failed');
        });
});
//function to display
function displaySchedule(data) {
    const results = data.MRData.RaceTable;
    //set details
    document.getElementById('details').textContent = `series: ${results.series}, season: ${results.season}, Total results: ${data.MRData.total}`;
    
    const races = results.Races;//extract the array
    const tableBody = document.getElementById('scheduleTable').querySelector('tbody');
    tableBody.innerHTML = ''; 
    
    races.forEach(race => {//looop to add the details to the tablle
        const row = tableBody.insertRow();
        row.insertCell().textContent = race.season;
        row.insertCell().textContent = race.round;
        row.insertCell().textContent = race.raceName;
        row.insertCell().textContent = race.date;
        row.insertCell().textContent = race.time || 'TBA';
        row.insertCell().textContent = race.Circuit.Location.country;
        row.insertCell().textContent = race.url;
    });
}
