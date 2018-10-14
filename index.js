var twit = require('twit')
var config = require('./config') 
var Twitter = new twit(config)

var retweet = function() {
    var params = {
        q: 'doggo OR pupper',
        result_type: 'recent'
    }
    Twitter.get('search/tweets', params, function(err, data) {
        // if there no errors
        if (!err) {
            // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;

            // Tell Twitter to retweet
            Twitter.post('statuses/retweet/:id',
                {
                id: retweetId
                },
                function(err, response) {
                    if (response) {
                        console.log('Retweeted!!!');
                    }

                    // if there was an error while tweeting
                    if (err) {
                        console.log('Error tweeting');
                    }
                }
            );
        } else {
            console.log('Error searching', err, data);
        }
    });
}

//retweet();
// retweet every 3 minutes
setInterval(retweet, 180000);

//Respond when someone mentions me, @elonmusk
var stream = Twitter.stream('statuses/filter', {track: ['@jtwitbot1'] });

//Look for my @name
stream.on('tweet', tweetEvent);
function tweetEvent(tweet) {
    // Get Twitter handle of who tweeted me
    var name = tweet.user.screen_name;

    // Now send a reply back to the sender
    var reply='You mentioned jtwitbot1! @' + name + ' ' + 'Bork bork!';
    var params = {
        status: reply, in_reply_to_status_id: nameID
    };

    Twitter.post('statuses/update', params,
    function(err, data,response) {
        if (err !== undefined) {
            //Report error if response tweet fails
            console.log(err);
        } else {
            //Report success
            console.log('Tweeted: ' + params.status);

            var Gpio = require('onoff').Gpio,
            led = new Gpio(4, 'out');
            var iv = setInterval(function () {
                led.writeSync(led.readSync() === 0 ? 1 : 0)
            }, 500);

            // Toggle state of the LED every half second
            setTimeout(function () {
                clearInterval(iv);
                led.writeSync(0);

                // Turn LED off
                led.unexport();
            }, 2000);
            // End blinking after 2 seconds
        }
    })
};