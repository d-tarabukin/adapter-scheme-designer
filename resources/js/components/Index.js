import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Formik, Form, Field} from 'formik';
import {SchemeValidationSchema} from './validators/SchemeValidationSchema';
import SettingsPropertyCreationForm from './forms/SettingsPropertyCreationForm';
import RouteCreationForm from './forms/RouteCreationForm';
import ExRouteCreationForm from './forms/ExRouteCreationForm';
import CommandCreationForm from './forms/CommandCreationForm';
import VendorCreationForm from './forms/VendorCreationForm';
import Routes from './Routes';
import Vendors from './Vendors';
import Commands from './Commands';
import ExRoutes from './ExRoutes';
import SettingsProperties from './SettingsProperties';
import {saveAs} from 'file-saver';

// TODO: add more explanations, placeholders, etc...
// TODO: toggle status based on card_method field
// TODO: improve uri and other validation

export function SchemeDesignerForm() {
    const [isSettingsSet, enableSettings] = useState(false);
    const [settingsProperties, setSettingsProperties] = useState([]);
    const [isRoutesSet, enableRoutes] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [isExRoutesSet, enableExRoutes] = useState(false);
    const [exRoutes, setExRoutes] = useState([]);
    const [isCommandsSet, enableCommands] = useState(false);
    const [commands, setCommands] = useState([]);
    const [isVendorsSet, enableVendors] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [initialValues, setInitialValues] = useState({
        method: '',
        version: '',
        sign: '',
        card_method: false,
        handlers: {
            // Common handlers
            callback: false,
            balance: false,
            bank: false,
            payout: false,
            refund: false,
            status: [],
            void: false,
            // Wallet handlers
            payment: false,
            field_md: false,
            field_order_id: false,
            // Card handlers
            authorization: false,
            capture: false,
            pares: false,
            recurring: false,
            recurring_continue: false,
            recurring_threed_redirect: false,
            threed_redirect: false,
        }
    });

    function toggleSettings() {
        enableSettings(!isSettingsSet);
        if (settingsProperties.length > 0) setSettingsProperties([]);
    }

    function toggleRoutes() {
        enableRoutes(!isRoutesSet);
        if (routes.length > 0) setRoutes([]);
    }

    function toggleExRoutes() {
        enableExRoutes(!isExRoutesSet);
        if (exRoutes.length > 0) setExRoutes([]);
    }

    function toggleCommands() {
        enableCommands(!isCommandsSet);
        if (commands.length > 0) setCommands([]);
    }

    function toggleVendors() {
        enableVendors(!isVendorsSet);
        if (vendors.length > 0) setVendors([]);
    }

    function addSettingsProperty({name, types, options, defaultValue}) {
        if (settingsProperties.find(property => property.name === name)) return;

        setSettingsProperties([
                ...settingsProperties,
                {
                    name: name,
                    type: types.join(),
                    options: options,
                    default: defaultValue
                }
            ]);
    }

    function addRoute({uri, method, className, response}) {
        // TODO: use uuid instead of uri
        if (routes.find(route => route.uri === uri)) return;

        setRoutes([
            ...routes,
            {
                uri: uri,
                method: method,
                className: className,
                response: response
            }
        ]);
    }

    function addExRoute({uri, method, className, response}) {
        // TODO: use uuid instead of uri
        if (exRoutes.find(exRoute => exRoute.uri === uri)) return;

        setExRoutes([
            ...exRoutes,
            {
                uri: uri,
                method: method,
                className: className,
                response: response
            }
        ]);
    }

    function addCommand({signature, className, description, scheduleCron}) {
        if (commands.find(command => command.signature === signature)) return;

        setCommands([
            ...commands,
            {
                signature: signature,
                className: className,
                description: description,
                scheduleCron: scheduleCron
            }
        ]);
    }

    function addVendor({name, version}) {
        if (vendors.find(vendor => vendor.name === name)) return;

        setVendors([
                ...vendors,
                {
                    name: name,
                    version: version
                }
            ]);
    }

    function appendSettingsPropertiesToPostData(formValues) {
        formValues.settings = {};
        settingsProperties.forEach(property => {
            let propertyName = property.name;
            formValues.settings[propertyName] = {};
            formValues.settings[propertyName]["type"] = property.type.replace(/,/g, '|');
            formValues.settings[propertyName]["options"] = property.options;
            formValues.settings[propertyName]["default"] = property.default;
        });
        return formValues;
    }

    function appendRoutesToPostData(formValues) {
        formValues.routes = [];
        routes.forEach(route => {
            formValues.routes.push({
                uri: route.uri,
                method: route.method,
                class: route.className,
                response: route.response
            });
        });
        return formValues;
    }

    function appendExRoutesToPostData(formValues) {
        formValues.exRoutes = [];
        exRoutes.forEach(exRoute => {
            formValues.exRoutes.push({
                uri: exRoute.uri,
                method: exRoute.method,
                class: exRoute.className,
                response: exRoute.response
            });
        });
        return formValues;
    }

    function appendCommandsToPostData(formValues) {
        formValues.commands = [];
        commands.forEach(command => {
            formValues.commands.push({
                signature: command.signature,
                class: command.className,
                description: command.description,
                schedule_cron: command.scheduleCron
            });
        });
        return formValues;
    }

    function appendVendorsToPostData(formValues) {
        formValues.vendors = {};
        vendors.forEach(vendor => {
            formValues.vendors[vendor.name] = vendor.version;
        });
        return formValues;
    }

    function removeSettingsProperty(name) {
        setSettingsProperties(settingsProperties.filter(property => property.name !== name));
    }

    function removeRoute(indexToFind) {
        setRoutes(routes.filter((route, index) => index !== indexToFind));
    }

    function removeExRoute(indexToFind) {
        setExRoutes(exRoutes.filter((exRoute, index) => index !== indexToFind));
    }

    function removeCommand(signature) {
        setCommands(commands.filter(command => command.signature !== signature));
    }

    function removeVendor(name) {
        setVendors(vendors.filter(vendor => vendor.name !== name));
    }

    useEffect(() => {
        if (settingsProperties.length === 0) enableSettings(false);
    }, [settingsProperties]);

    useEffect(() => {
        if (routes.length === 0) enableRoutes(false);
    }, [routes]);

    useEffect(() => {
        if (exRoutes.length === 0) enableExRoutes(false);
    }, [exRoutes]);

    useEffect(() => {
        if (commands.length === 0) enableCommands(false);
    }, [commands]);

    useEffect(() => {
        if (vendors.length === 0) enableVendors(false);
    }, [vendors]);

    function handleOnCardMethodChange(isCardMethod, values) {
        if (isCardMethod) {
            values.handlers.payment = false;
            values.handlers.field_md = false;
            values.handlers.field_order_id = false;
        } else {
            values.handlers.authorization = false;
            values.handlers.capture = false;
            values.handlers.pares = false;
            values.handlers.recurring = false;
            values.handlers.recurring_continue = false;
            values.handlers.recurring_threed_redirect = false;
            values.handlers.threed_redirect = false;
        }
    }

    async function handleSubmit(values) {
        // TODO: remove empty fields before submit?
        // TODO: make preloader
        let requestData = Object.assign({}, values);

        if (settingsProperties.length > 0) requestData = appendSettingsPropertiesToPostData(requestData);
        if (routes.length > 0) requestData = appendRoutesToPostData(requestData);
        if (exRoutes.length > 0) requestData = appendExRoutesToPostData(requestData);
        if (commands.length > 0) requestData = appendCommandsToPostData(requestData);
        if (vendors.length > 0) requestData = appendVendorsToPostData(requestData);

        let response = await axios({
            url: '/api/create-config',
            method: 'POST',
            data: JSON.stringify(requestData),
            headers: {'Content-Type': 'application/json'}
        });

        let fileName = response.headers['content-disposition'].match(/(?<=filename=).*/)[0];
        saveAs(new File([response.data], fileName, {type: 'text/vnd.yaml'}));
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={SchemeValidationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {({values, errors, touched, setFieldValue}) => (
                    <>
                        <div className="row">
                            <div className="col-md-8">
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="method">Method*</label>
                                        <Field id="method"
                                               type="text"
                                               className={"form-control " + (errors.method && touched.method ? "form-error" : "")}
                                               name="method"
                                        />
                                        <label className="mt-1" htmlFor="sign">Sign*</label>
                                        <Field id="sign"
                                               type="text"
                                               className={"form-control " + (errors.sign && touched.sign ? "form-error" : "")}
                                               name="sign"
                                        />
                                        <label className="mt-1" htmlFor="version">Version</label>
                                        <Field
                                            id="version"
                                            type="text"
                                            className="form-control"
                                            name="version"
                                        />
                                    </div>
                                    <div className="form-check">
                                        <Field
                                            id="card_method"
                                            type="checkbox"
                                            className="form-check-input"
                                            name="card_method"
                                            onChange={event => {
                                                setFieldValue('card_method', event.target.checked);
                                                handleOnCardMethodChange(event.target.checked, values);
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="card_method">Card Method?</label>
                                    </div>

                                    <hr/>
                                    <h4 className="font-weight-bold">Handlers</h4>
                                    <h5>Common</h5>
                                    <div className="form-check">
                                        <Field
                                            id="handlers.callback"
                                            type="checkbox"
                                            className="form-check-input"
                                            name="handlers.callback"
                                        />
                                        <label className="form-check-label"
                                               htmlFor="handlers.callback">Callback?</label>
                                    </div>
                                    <div className="form-check">
                                        <Field
                                            id="handlers.balance"
                                            type="checkbox"
                                            className="form-check-input"
                                            name="handlers.balance"
                                        />
                                        <label className="form-check-label" htmlFor="handlers.balance">Balance?</label>
                                    </div>
                                    <div className="form-check">
                                        <Field
                                            id="handlers.bank"
                                            type="checkbox"
                                            className="form-check-input"
                                            name="handlers.bank"
                                        />
                                        <label className="form-check-label" htmlFor="handlers.bank">Bank?</label>
                                    </div>
                                    <div className="form-check">
                                        <Field
                                            id="handlers.payout"
                                            type="checkbox"
                                            className="form-check-input"
                                            name="handlers.payout"
                                        />
                                        <label className="form-check-label" htmlFor="handlers.payout">Payout?</label>
                                    </div>
                                    <div className="form-check">
                                        <Field
                                            id="handlers.refund"
                                            type="checkbox"
                                            className="form-check-input"
                                            name="handlers.refund"
                                        />
                                        <label className="form-check-label" htmlFor="handlers.refund">Refund?</label>
                                    </div>
                                    <div className="form-check">
                                        <Field
                                            id="handlers.void"
                                            type="checkbox"
                                            className="form-check-input"
                                            name="handlers.void"
                                        />
                                        <label className="form-check-label" htmlFor="handlers.void">Void?</label>
                                    </div>
                                    <div className="form-group">
                                        <label className="mt-1" htmlFor="handlers.status">Status?</label>
                                        <Field id="handlers.status" name="handlers.status" as="select" multiple
                                               className="form-control">
                                            <option value="payment">payment</option>
                                            <option value="payout">payout</option>
                                            <option value="refund">refund</option>
                                        </Field>
                                    </div>

                                    {!values.card_method &&
                                    <>
                                        <h5>Wallet</h5>
                                        <div className="form-check">
                                            <Field
                                                id="handlers.payment"
                                                type="checkbox"
                                                className="form-check-input"
                                                name="handlers.payment"
                                            />
                                            <label className="form-check-label"
                                                   htmlFor="handlers.payment">Payment?</label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                id="handlers.field_md"
                                                type="checkbox"
                                                className="form-check-input"
                                                name="handlers.field_md"
                                            />
                                            <label className="form-check-label" htmlFor="handlers.field_md">Field
                                                MD?</label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                id="handlers.field_order_id"
                                                type="checkbox"
                                                className="form-check-input"
                                                name="handlers.field_order_id"
                                            />
                                            <label className="form-check-label" htmlFor="handlers.field_order_id">Field
                                                Order ID?</label>
                                        </div>
                                    </>
                                    }

                                    {values.card_method &&
                                    <>
                                        <h5>Card</h5>
                                        <div className="form-check">
                                            <Field
                                                id="handlers.authorization"
                                                type="checkbox"
                                                className="form-check-input"
                                                name="handlers.authorization"
                                            />
                                            <label className="form-check-label"
                                                   htmlFor="handlers.authorization">Authorization?</label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                id="handlers.capture"
                                                type="checkbox"
                                                className="form-check-input"
                                                name="handlers.capture"
                                            />
                                            <label className="form-check-label"
                                                   htmlFor="handlers.capture">Capture?</label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                id="handlers.pares"
                                                type="checkbox"
                                                className="form-check-input"
                                                name="handlers.pares"
                                            />
                                            <label className="form-check-label" htmlFor="handlers.pares">Pares?</label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                id="handlers.recurring"
                                                type="checkbox"
                                                className="form-check-input"
                                                name="handlers.recurring"
                                            />
                                            <label className="form-check-label"
                                                   htmlFor="handlers.recurring">Recurring?</label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                id="handlers.recurring_continue"
                                                type="checkbox"
                                                className="form-check-input"
                                                name="handlers.recurring_continue"
                                            />
                                            <label className="form-check-label" htmlFor="handlers.recurring_continue">Recurring
                                                Continue?</label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                id="handlers.recurring_threed_redirect"
                                                type="checkbox"
                                                className="form-check-input"
                                                name="handlers.recurring_threed_redirect"
                                            />
                                            <label className="form-check-label"
                                                   htmlFor="handlers.recurring_threed_redirect">Recurring Threed
                                                Redirect?</label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                id="handlers.threed_redirect"
                                                type="checkbox"
                                                className="form-check-input"
                                                name="handlers.threed_redirect"
                                            />
                                            <label className="form-check-label" htmlFor="handlers.threed_redirect">Threed
                                                Redirect?</label>
                                        </div>
                                    </>
                                    }

                                    <hr/>

                                    {isSettingsSet && settingsProperties.length > 0 &&
                                    <div id="settingsProperties" className="mt-4">
                                        <h4 className="font-weight-bold">Settings properties</h4>
                                        <SettingsProperties settingsProperties={settingsProperties}
                                                            onRemoveSettingsProperty={removeSettingsProperty}/>
                                        <hr/>
                                    </div>
                                    }
                                    {isRoutesSet && routes.length > 0 &&
                                    <div id="routes" className="mt-4">
                                        <h4 className="font-weight-bold">Routes</h4>
                                        <Routes routes={routes} onRemoveRoute={removeRoute}/>
                                        <hr/>
                                    </div>
                                    }
                                    {isExRoutesSet && exRoutes.length > 0 &&
                                    <div id="exRoutes" className="mt-4">
                                        <h4 className="font-weight-bold">Ex-routes</h4>
                                        <ExRoutes exRoutes={exRoutes} onRemoveExRoute={removeExRoute}/>
                                        <hr/>
                                    </div>
                                    }
                                    {isCommandsSet && commands.length > 0 &&
                                    <div id="commands" className="mt-4">
                                        <h4 className="font-weight-bold">Commands</h4>
                                        <Commands commands={commands} onRemoveCommand={removeCommand}/>
                                        <hr/>
                                    </div>
                                    }
                                    {isVendorsSet && vendors.length > 0 &&
                                    <div id="vendors" className="mt-4">
                                        <h4 className="font-weight-bold">Vendors</h4>
                                        <Vendors vendors={vendors} onRemoveVendor={removeVendor}/>
                                        <hr/>
                                    </div>
                                    }

                                    <button type="submit" className="mt-4 mb-4 btn btn-primary btn-lg">Build</button>
                                </Form>
                            </div>
                            <div className="col-md-4">

                                <button type="button"
                                        className={"mb-4 btn btn-block " + (isSettingsSet ? "btn-danger" : "btn-secondary")}
                                        onClick={toggleSettings}>
                                    {isSettingsSet
                                        ? <span>Remove Settings</span>
                                        : <span>Add Settings</span>
                                    }
                                </button>
                                {isSettingsSet &&
                                <SettingsPropertyCreationForm onAddProperty={addSettingsProperty}/>
                                }

                                <button type="button"
                                        className={"mb-4 btn btn-block " + (isRoutesSet ? "btn-danger" : "btn-secondary")}
                                        onClick={toggleRoutes}>
                                    {isRoutesSet
                                        ? <span>Remove Routes</span>
                                        : <span>Add Routes</span>
                                    }
                                </button>
                                {isRoutesSet &&
                                <RouteCreationForm onAddRoute={addRoute}/>
                                }

                                <button type="button"
                                        className={"mb-4 btn btn-block " + (isExRoutesSet ? "btn-danger" : "btn-secondary")}
                                        onClick={toggleExRoutes}>
                                    {isExRoutesSet
                                        ? <span>Remove Ex-routes</span>
                                        : <span>Add Ex-routes</span>
                                    }
                                </button>
                                {isExRoutesSet &&
                                <ExRouteCreationForm onAddExRoute={addExRoute}/>
                                }

                                <button type="button"
                                        className={"mb-4 btn btn-block " + (isCommandsSet ? "btn-danger" : "btn-secondary")}
                                        onClick={toggleCommands}>
                                    {isCommandsSet
                                        ? <span>Remove Commands</span>
                                        : <span>Add Commands</span>
                                    }
                                </button>
                                {isCommandsSet &&
                                <CommandCreationForm onAddCommand={addCommand}/>
                                }

                                <button type="button"
                                        className={"mb-4 btn btn-block " + (isVendorsSet ? "btn-danger" : "btn-secondary")}
                                        onClick={toggleVendors}>
                                    {isVendorsSet
                                        ? <span>Remove Vendors</span>
                                        : <span>Add Vendors</span>
                                    }
                                </button>
                                {isVendorsSet &&
                                <VendorCreationForm onAddVendor={addVendor}/>
                                }

                            </div>
                        </div>
                    </>
                )}
            </Formik>
        </div>
    );
}

ReactDOM.render(<SchemeDesignerForm/>, document.getElementById('scheme-designer-form'));
