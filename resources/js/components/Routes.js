import React from 'react';
import uuid from "react-uuid";

export default function Routes({routes, onRemoveRoute}) {
    // TODO: remove route based on uuid instead of array index
    return (
        <div>
            {routes.map((route, index) => (
                <div key={uuid()}>
                    <ul className="property-group">
                        <li><span>Uri: {route.uri}</span>
                            <button className="btn-remove btn btn-danger" onClick={() => onRemoveRoute(index)}>X</button>
                        </li>
                        {route.method &&
                        <li>Method: {route.method}</li>
                        }
                        <li>Class: {route.className}</li>
                        {route.response &&
                        <li>Response: {route.response}</li>
                        }
                    </ul>
                </div>
            ))}
        </div>
    );
}
