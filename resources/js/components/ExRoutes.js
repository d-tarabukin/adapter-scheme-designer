import React from 'react';
import uuid from "react-uuid";

export default function ExRoutes({exRoutes, onRemoveExRoute}) {
    // TODO: remove route based on uuid instead of array index
    return (
        <div>
            {exRoutes.map((exRoute, index) => (
                <div key={uuid()}>
                    <ul className="property-group">
                        <li><span>Uri: {exRoute.uri}</span>
                            <button className="btn-remove btn btn-danger" onClick={() => onRemoveExRoute(index)}>X</button>
                        </li>
                        {exRoute.method &&
                        <li>Method: {exRoute.method}</li>
                        }
                        <li>Class: {exRoute.className}</li>
                        {exRoute.response &&
                        <li>Response: {exRoute.response}</li>
                        }
                    </ul>
                </div>
            ))}
        </div>
    );
}
