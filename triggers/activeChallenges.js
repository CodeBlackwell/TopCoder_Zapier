const listActiveChallenges = (z, bundle) => {
    const challengeType = bundle.inputData.type || 'develop';
    const promise = z.request(`http://api.topcoder.com/v2/challenges/active?type=${challengeType}`);
    return promise.then((response) => {
        return z.JSON.parse(response.content).data
            .map(challenge => {
                challenge.registrationEndDate = new Date(challenge.registrationEndDate).toString();
                challenge.id = challenge.challengeId;
                return challenge;
            })
    })
};

module.exports = {
    key: 'activeChallenge',
    noun: 'Active Challenge',
    display: {
        label: 'New Active Challenge',
        description: 'Trigger when a new challenge is available.'
    },
    operation: {
        inputFields: [
            {
                key: 'type',
                required: true,
                label: 'Challenge Type',
                choices: { design: 'Design', develop: 'Develop' }
            }
        ],
        outputFields: [
            {key: 'id', label: 'ID'},
            {key: 'challengeName', label: 'Challenge Name'},
            {key: 'totalPrize', label: 'Total Prize'},
            {key: 'firstPlacePrize', label: 'First Place Prize'},
            {key: 'challengeCommunity', label: 'Challenge Type'},
            {key: 'technologies', label: 'Listed Technologies'},
            {key: 'submissionEndDate', label: 'Submission Deadline'}
        ],
        perform: listActiveChallenges,
    }
};