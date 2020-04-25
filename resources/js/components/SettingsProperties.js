import React from 'react';
import uuid from "react-uuid";

export default function SettingsProperties({settingsProperties, onRemoveSettingsProperty}) {
    return (
        <div>
            {settingsProperties.map(property => (
                <div key={uuid()}>
                    <ul className="property-group">
                        <li>
                            <span>Name: {property.name}</span>
                            <button className="btn-remove btn btn-danger"
                                    onClick={() => onRemoveSettingsProperty(property.name)}>X
                            </button>
                        </li>
                        {property.type &&
                        <li>Type: {property.type.replace(/,/g, '|')}</li>
                        }
                        {property.options.length > 0 &&
                        <li>Options: [{property.options.join(', ')}]</li>
                        }
                        {property.default &&
                        <li>Default: {property.default}</li>
                        }
                    </ul>
                </div>
            ))}
        </div>
    );
}
