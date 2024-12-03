const leaderboardData = [
    { position: 1, name: "Ivie", enteredOn: "2015/02/20 7:15 AM", points: 22, result: "88%" },
    { position: 2, name: "Jefferson", enteredOn: "2015/02/20 8:16 AM", points: 19, result: "76%" },
    { position: 3, name: "Ines", enteredOn: "2015/02/20 8:45 AM", points: 12, result: "48%" },
    { position: 4, name: "Aza", enteredOn: "2015/02/20 8:57 AM", points: 12, result: "48%" },
    { position: 5, name: "Amour", enteredOn: "2015/02/20 10:42 AM", points: 10, result: "40%" },
    { position: 6, name: "Evangelista", enteredOn: "2015/02/20 1:08 PM", points: 9, result: "36%" },
    { position: 7, name: "Andrea", enteredOn: "2015/02/20 1:14 PM", points: 7, result: "28%" },
    { position: 8, name: "Samantha", enteredOn: "2015/02/20 10:51 AM", points: 6, result: "24%" },
    { position: 9, name: "Ace", enteredOn: "2015/02/20 7:39 AM", points: 5, result: "20%" },
    { position: 10, name: "Shin", enteredOn: "2015/02/20 9:35 AM", points: 5, result: "20%" },
  ];
  
  const leaderboard = document.getElementById("leaderboard");
  
  leaderboardData.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.position}</td>
      <td>${entry.name}</td>
      <td>${entry.enteredOn}</td>
      <td>${entry.points}</td>
      <td>${entry.result}</td>
    `;
    leaderboard.appendChild(row);
  });