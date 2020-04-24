import React from 'react';
import uuid from "react-uuid";

export default function Routes({routes, onRemoveRoute}) {
    // TODO: remove route based on uuid instead of array index
    return (
        <div>
            {routes.map((route, index) => (
                <div key={uuid()}>
                    <ul className="property-group">
                        <li><h5>Route {index + 1}</h5>
                            <button className="btn btn-danger" onClick={() => onRemoveRoute(index)}>X</button>
                        </li>
                        <li>Uri: {route.uri}</li>
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
    )
}
