import React from 'react';
import uuid from "react-uuid";

export default function Vendors({vendors, onRemoveVendor}) {
    return (
        <div>
            {vendors.map(vendor => (
                <div key={uuid()}>
                    <ul className="property-group">
                        <li><h5>{vendor.name}</h5> <button className="btn btn-danger" onClick={() => onRemoveVendor(vendor.name)}>X</button></li>
                        <li>Version: {vendor.version}</li>
                    </ul>
                </div>
            ))}
        </div>
    )
}
