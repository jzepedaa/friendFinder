
var friends = require('../data/friends.js');


module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {

        var match = {
            name: "",
            photo: "",
            friendDifference: 1000
        };


        var data = req.body;
        var scores = data.scores;
        var name = data.name;
        var photo = data.photo;


        var differenceAmount = 0;


        for (var i = 0; i < friends.length - 1; i++) {
            console.log(friends[i].name);
            differenceAmount = 0;

            for (var j = 0; j < 10; j++) {
                differenceAmount += Math.abs(parseInt(scores[j]) - parseInt(friends[i].scores[j]));
                if (differenceAmount <= match.friendDifference) {

                    match.name = friends[i].name;
                    match.photo = friends[i].photo;
                    match.friendDifference = differenceAmount;
                }
            }
        }

        friends.push(data);

        res.json(match);
    });
};