import React from "react";
import {Field, Form, Formik} from "formik";
import {CommandValidationSchema} from '../validators/CommandValidationSchema';

export default function CommandCreationForm(props) {
    return (
        <div>
            <Formik
                initialValues={{
                    signature: '',
                    className: '',
                    description: '',
                    scheduleCron: '',
                }}
                validationSchema={CommandValidationSchema}
                onSubmit={command => props.onAddCommand(command)}
            >
                {({errors, touched}) => (
                    <>
                        <div id="commandsCreationForm">
                            <h4>Add command</h4>
                            <Form>
                                <div className="form-row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="signature">Signature*</label>
                                            <Field id="signature"
                                                   type="text"
                                                   className={"form-control " + (errors.signature && touched.signature ? "form-error" : "")}
                                                   name="signature"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="commandClassName">Class*</label>
                                            <Field id="commandClassName"
                                                   type="text"
                                                   className={"form-control " + (errors.className && touched.className ? "form-error" : "")}
                                                   name="className"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <Field id="description"
                                                   type="text"
                                                   className="form-control"
                                                   name="description"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="scheduleCron">Schedule Cron</label>
                                            <Field id="scheduleCron"
                                                   type="text"
                                                   className="form-control"
                                                   name="scheduleCron"
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
