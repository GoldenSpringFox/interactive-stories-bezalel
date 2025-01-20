import { useEffect, useRef } from "react";
import './resources-styles.css';

export default function ResourcesView({ resources }) {
    return (
        <div className="resources-view">
            {resources.map((resource, index) => (
                <div key={index} className="resource-item">
                    <img
                        src={resource.icon}
                        alt={resource.name}
                        className="resource-icon"
                    />
                    {/* <div>: </div> */}
                    <div className="resource-info">
                        {/* <span className="resource-name">{resource.name}</span> */}
                        <span className="resource-count">{resource.count}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}