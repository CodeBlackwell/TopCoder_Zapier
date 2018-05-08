const listActiveChallenges = (z, bundle) => {
    const promise = z.request('http://api.topcoder.com/v2/challenges/active');
    return promise.then((response) => {
        return z.JSON.parse(response.content).data
            .forEach(challenge => {
                challenge.id = challenge.challengeId
            })
    })
};

module.exports = {
    key: 'activeChallenge',
    noun: 'ActiveChallenge',
    display: {
        label: 'New Active Challenge',
        description: 'Trigger when a new challenge is available.'
    },
    operation: {
        perform: listActiveChallenges,
    }
};