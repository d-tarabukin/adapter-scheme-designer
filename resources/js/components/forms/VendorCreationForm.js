import React from "react";
import {Field, Form, Formik} from "formik";
import {VendorValidationSchema} from '../validators/VendorValidationSchema';

export default function VendorCreationForm(props) {
    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    version: '',
                }}
                validationSchema={VendorValidationSchema}
                onSubmit={vendor => props.onAddVendor(vendor)}
            >
                {({errors, touched}) => (
                    <>
                        <div id="vendorCreationForm">
                            <h4>Add vendor</h4>
                            <Form>
                                <div className="form-row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="vendorName">Name*</label>
                                            <Field id="vendorName"
                                                   className={"form-control " + (errors.name && touched.name ? "form-error" : "")}
                                                   name="name"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="vendorVersion">Version*</label>
                                            <Field id="vendorVersion"
                                                   className={"form-control " + (errors.version && touched.version ? "form-error" : "")}
                                                   name="version"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">Add</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <hr/>
                    </>
                )}
            </Formik>
        </div>
    );
}
