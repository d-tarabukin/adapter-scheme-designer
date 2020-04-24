import React from "react";
import {Field, Form, Formik} from "formik";
import {RouteValidationSchema} from '../validators/RouteValidationSchema';

export default function RoutesCreationForm(props) {
    return (
        <div>
            <Formik
                initialValues={{
                    uri: '',
                    method: '',
                    className: '',
                    response: '',
                }}
                validationSchema={RouteValidationSchema}
                onSubmit={route => props.onAddRoute(route)}
            >
                {({errors, touched}) => (
                    <>
                        <div id="routesCreationForm">
                            <h4>Add route</h4>
                            <Form>
                                <div className="form-row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="routeUri">Uri*</label>
                                            <Field id="routeUri"
                                                   type="text"
                                                   className={"form-control " + (errors.uri && touched.uri ? "form-error" : "")}
                                                   name="uri"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="routeMethod">Method</label>
                                        <div className="form-group">
                                            <Field id="routeMethod"
                                                   name="method"
                                                   as="select"
                                                   className="form-control"
                                            >
                                                <option value="">Select method</option>
                                                <option value="get">GET</option>
                                                <option value="post">POST</option>
                                                <option value="put">PUT</option>
                                                <option value="any">any</option>
                                            </Field>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="routeClassName">Class*</label>
                                            <Field id="routeClassName"
                                                   type="text"
                                                   className={"form-control " + (errors.className && touched.className ? "form-error" : "")}
                                                   name="className"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="routeResponse">Response</label>
                                        <div className="form-group">
                                            <Field id="routeResponse"
                                                   name="response"
                                                   as="select"
                                                   className="form-control"
                                            >
                                                <option value="">Select response type</option>
                                                <option value="json">json</option>
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
