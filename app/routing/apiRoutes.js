var friendsData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {        

        // console.log(req.body);

        newScores = req.body.scores

        var bestMatch;
        var leastDifference; 

        for (var i = 0; i < friendsData.length; i++) {
            
            var totalDifference = 0;

            for (var j = 0; j < newScores.length; j++) {
                totalDifference += Math.abs(friendsData[i].scores[j] - newScores[j])
            }

            if (i === 0 || totalDifference < leastDifference) {
                leastDifference = totalDifference;
                bestMatch = i;
            }
        }

        console.log("The least difference is: " + leastDifference);

        friendsData.push(req.body);

        res.send(friendsData[bestMatch])
        

    })
};