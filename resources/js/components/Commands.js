import React from 'react';
import uuid from "react-uuid";

export default function Commands({commands, onRemoveCommand}) {
    return (
        <div>
            {commands.map((command, index) => (
                <div key={uuid()}>
                    <ul className="property-group">
                        <li><h5>Command {index + 1}</h5>
                            <button className="btn btn-danger" onClick={() => onRemoveCommand(command.signature)}>X
                            </button>
                        </li>
                        <li>Signature: {command.signature}</li>
                        <li>Class: {command.className}</li>
                        {command.description &&
                        <li>Description: {command.description}</li>
                        }
                        {command.scheduleCron &&
                        <li>Schedule cron: {command.scheduleCron}</li>
                        }
                    </ul>
                </div>
            ))}
        </div>
    );
}
