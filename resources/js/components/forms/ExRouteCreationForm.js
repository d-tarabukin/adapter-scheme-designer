import React from "react";
import {Field, Form, Formik} from "formik";
import {ExRouteValidationSchema} from '../validators/ExRouteValidationSchema';

export default function ExRouteCreationForm(props) {
    return (
        <div>
            <Formik
                initialValues={{
                    uri: '',
                    method: '',
                    className: '',
                    response: '',
                }}
                validationSchema={ExRouteValidationSchema}
                onSubmit={exRoute => props.onAddExRoute(exRoute)}
            >
                {({errors, touched}) => (
                    <>
                        <div id="exRoutesCreationForm">
                            <h4>Add ex-route</h4>
                            <Form>
                                <div className="form-row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="exRouteUri">Uri*</label>
                                            <Field id="exRouteUri"
                                                   type="text"
                                                   className={"form-control " + (errors.uri && touched.uri ? "form-error" : "")}
                                                   name="uri"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="exRouteMethod">Method</label>
                                        <div className="form-group">
                                            <Field id="exRouteMethod"
                                                   type="text"
                                                   name="method"
                                                   className="form-control"
                                                   value="post"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="exRouteClassName">Class*</label>
                                            <Field id="exRouteClassName"
                                                   type="text"
                                                   className={"form-control " + (errors.className && touched.className ? "form-error" : "")}
                                                   name="className"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="response">Response</label>
                                        <div className="form-group">
                                            <Field id="exRouteResponse"
                                                   name="response"
                                                   as="select"
                                                   className="form-control"
                                            >
                                                <option value="">Select response type</option>
                                                <option value="text">text</option>
                                            </Field>
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
