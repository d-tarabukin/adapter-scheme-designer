import React from 'react';
import uuid from "react-uuid";

export default function ExRoutes({exRoutes, onRemoveExRoute}) {
    // TODO: remove route based on uuid instead of array index
    return (
        <div>
            {exRoutes.map((exRoute, index) => (
                <div key={uuid()}>
                    <ul className="property-group">
                        <li><h5>Ex-route {index + 1}</h5>
                            <button className="btn btn-danger" onClick={() => onRemoveExRoute(index)}>X</button>
                        </li>
                        <li>Uri: {exRoute.uri}</li>
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
