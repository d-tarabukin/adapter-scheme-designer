import React from 'react';
import uuid from "react-uuid";

export default function SettingsProperties({settingsProperties, onRemoveSettingsProperty}) {
    return (
        <div>
            {settingsProperties.map(property => (
                <div key={uuid()}>
                    <ul className="property-group">
                        <li><h5>{property.name}</h5> <button className="btn btn-danger" onClick={() => onRemoveSettingsProperty(property.name)}>X</button></li>
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
    )
}
