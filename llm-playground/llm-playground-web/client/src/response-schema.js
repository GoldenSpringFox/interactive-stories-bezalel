/**
 * See OpenAI docs: https://platform.openai.com/docs/guides/structured-outputs#supported-schemas
 * See JSON Schema docs: https://json-schema.org/understanding-json-schema
 */
export const responseSchema = {
    name: 'story_schema',
    strict: true,
    schema: {
        type: 'object',
        properties: {
            storyText: {
                type: 'string',
                description: `
                    The story text to present to the player.
                    Word count limitation is 30. It might change by a system message.
                `,
            },
            callToAction: {
                type: 'string',
                description: `
                    Call-to-action or a hint for the player on what to do next. 
                    Encourage the player to be inventive and creative. 
                    Do not suggest trivial actions.
                    Do not suggest passive actions.
                    Use a suggestive tone (e.g. start with "You can ..." or "You might ..."). 
                    Enclose it with round brackets "(callToAction)".
                    Word count limitation is always 10.
                `,
            },
            storyEvent: {
                type: 'string',
                description: `
                    Additional story event that happens regardless of the player's input in order to push the story forward. 
                    It migh be poetic, it might be surprising, or even very dramatic.
                    Word count limitation is 50.
                `,
            },
            // playerEngagement: {
            //     type: 'number',
            //     description: `a float between 0 and 1, where 0 is bored and 1 is excited, based on the user's latest message.`,
            // },
            // playerSentiment: {
            //     type: 'array',
            //     description: `Array of strings describing the player's emotional state, or null if it is not clear enough.`,
            //     items: {
            //         type: 'string',
            //         enum: ['ambiguous', 'joy', 'irritation', 'sadness', 'fear', 'surprise', 'disgust', 'empathy'],
            //     },
            // },
            resourceWater: {
                type: 'number',
                description: `
                    an integer between -2 and 2, that describes if the action the player took and the story that followed
                    yielded in more access to drinking water (positive), or used up some of his current water (negative).
                    should be 0 if the action is irrelevant to water use, and will be -2 or 2 only in extreme cases`
            },
            resourceEnergy: {
                type: 'number',
                description: `
                    an integer between -2 and 2, that describes if the action the player took and the story that followed
                    exerted him physically to make him weaker (negative), or gave him a boost of energy like resting (positive).
                    should be 0 if the action is irrelevant to stamina use, and will be -2 or 2 only in extreme cases`
            },
            resourceSanity: {
                type: 'number',
                description: `
                    an integer between -2 and 2, that describes if the action the player took and the story that followed
                    yielded in something bad that lowered his morale (negative), or gave him hope (positive).
                    should be 0 if the action is irrelevant to water use, and will be -2 or 2 only in extreme cases`
            },
            goalProgress: {
                type: 'number',
                description:
                    'float between 0 and 1. It represents how close is the player to reach his goal. 0 means not at all, 1 means the goal is achieved.',
            },
            timePassed: {
                type: 'number',
                description: `
                    a non-negative integer, represents how many hours it would take to perform the action the player described.
                    ignore any time-descriptions the player inputs and estimate yourself how much time the action should take given their current situation.`
            }
        },
        required: ['storyText', 'callToAction', 'storyEvent', 'goalProgress', 'resourceWater', 'resourceEnergy', 'resourceSanity', 'timePassed'],
        additionalProperties: false,
    },
};
