import React from "react";
import {Field, Form, Formik} from "formik";
import {SettingsPropertyValidationSchema} from '../validators/SettingsPropertyValidationSchema';

export default function SettingsPropertyCreationForm({onAddProperty}) {
    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    types: [],
                    options: [],
                    defaultValue: '',
                }}
                validationSchema={SettingsPropertyValidationSchema}
                onSubmit={property => onAddProperty(property)}
            >
                {({errors, touched}) => (
                    <>
                        <div id="settingsPropertyCreationForm">
                            <h4>Add settings property</h4>
                            <Form>
                                <div className="form-row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="name">Name*</label>
                                            <Field id="name"
                                                   className={"form-control " + (errors.name && touched.name ? "form-error" : "")}
                                                   name="name"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="types">Type</label>
                                        <div className="form-group">
                                            <Field id="types" name="types" as="select" multiple
                                                   className="form-control">
                                                <option value="string">string</option>
                                                <option value="null">null</option>
                                                <option value="int">int</option>
                                                <option value="float">float</option>
                                            </Field>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="options">Options</label>
                                        <div className="form-group">
                                            <Field id="options" name="options" as="select" multiple
                                                   className="form-control">
                                                <option value="required">required</option>
                                                <option value="deprecated">deprecated</option>
                                            </Field>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="defaultValue">Default Value</label>
                                            <Field id="defaultValue" className="form-control" name="defaultValue"/>
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
