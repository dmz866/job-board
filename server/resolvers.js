export const resolvers = {
    Query: {
        job: () => ({
            id: '123',
            title: 'The Title',
            description: 'The Description'
        }),
        jobs: () => ([
            {
                id: '1',
                title: 'The Title',
                description: 'The Description'
            },
            {
                id: '2',
                title: 'The Title',
                description: 'The Description'
            }
        ])
    }
};