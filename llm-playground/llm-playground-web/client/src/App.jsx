import { useState } from "react";
import { postMessages } from "./story-api";
import StoryBodyView from "./components/content-view/StoryBodyView";
import PlayerInput from "./components/player-input/PlayerInput";
import ResourcesView from "./components/resources-view/ResourcesView";
import './components/bottom-container/bottom-container-styles.css';
import { storyConfig } from './story-config';
// import { storyConfig } from './examples/story-config-01-birdwatching';
// import { storyConfig } from './examples/story-config-02-a-late-divorce';
// import { storyConfig } from './examples/story-config-03-hebrew';

function App() {

    const [messages, setMessages] = useState([
        { role: 'system', content: storyConfig.instructions },
        { role: 'assistant', content: storyConfig.openingLine },
        { role: 'assistant', content: storyConfig.firstCallToAction }
    ]);
    const [apiStatus, setStatus] = useState('idle'); // 'idle' | 'loading' | 'ended' | 'error'
    const [response, setResponse] = useState(null); // see responseSchema @ response-schema
    const [storyShouldEnd, setStoryShouldEnd] = useState(false);
    const [resources, setResources] = useState([
        { name: "Items", count: "", icon: "/icons/inventory-icon.jpg" },
        { name: "Time", count: "8:00", icon: "/icons/time-icon.png" },
    ]);
    const [currentTime, setTime] = useState(8)

    function addMessage(newMsg) {
        setMessages(currentMsgs => [...currentMsgs, newMsg])
    }

    function handleInactivity() {
        if (!response) return;

        if (response.playerEngagement <= 0.6) {
            // Trigger an independent story event:
            addMessage({ role: 'assistant', content: response.storyEvent });
        } else {
            // Apply call to action hint:
            addMessage({ role: 'assistant', content: response.callToAction });
        }
    }

    function handleSend(playerText) {
        const newMessages = [...messages];
        newMessages.push({ role: 'user', content: playerText });
        // newMessages.push({ role: 'system', content: `(important!!!) Insert the number ${currentTime} in your next response`});
        setMessages(newMessages);

        setStatus('loading');
        postMessages(newMessages, handleResponse);
    }

    function handleResponse({ response, error }) {
        if (!response || error) {
            setStatus('error');
            return;
        }

        addMessage({ role: 'assistant', content: response.storyText });

        // storyConfig.events?.forEach(event => {
        //     if (event.time === currentTime + 1) {
        //         addMessage({ role: 'system', content: event.system})
        //     }
        // })

        console.log(messages)
        console.log(response)

        if (storyShouldEnd) {
            setStatus('ended');
            addMessage({ role: 'assistant', content: 'THE END.' });
            return;
        }

        setStatus('idle');
        setResponse(response);

        setTime(time => time + 1);
        
        setResources(currentResources => {
            const updatedResources = currentResources.map(resource => {
                if (resource.name === "Time") {
                    return { ...resource, count: (currentTime+1).toString() + ":00" };
                }
                if (resource.name === "Items") {
                    return { ...resource, count: response.inventory.join(', ')}
                }
                return resource;
            });
            return updatedResources;
        });

        // Example: reacting to player sentiment:
        // if (res.playerSentiment.includes('sadness')) {
        //     addMessage({ role: 'system', content: `The following storyText should make the player laugh.` })
        // }

        // var waterResource = resources.find(resource => resource.name == "Water");
        // if (waterResource) {
        //     console.log(`Current water count: ${waterResource.count}`)
        // }

        // Ending condition:
        if (response.goalProgress >= 0.9 || response.isDead) {
            addMessage({ role: 'system', content: `The following storyText should end the story. Use up to 50 words to write an epilogue.` })
            setStoryShouldEnd(true);
        }
    }

    return (
        <>
            <h1>
                {storyConfig.name || 'Open Story'}
            </h1>
            <StoryBodyView apiStatus={apiStatus} messages={messages} />
            <div id="bottom-container">
                <ResourcesView resources={resources} />
                <PlayerInput
                    apiStatus={apiStatus}
                    onSend={handleSend}
                    onInactivity={handleInactivity}
                />
            </div>
        </>
    )
}

export default App