import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';

const myTextField = (field) => {
    let cls = classnames({
        "input-row": true,
        "dirty": field.meta.dirty
    });
    return <div className={cls}>
        <input {...field.input} type={field.type} />
    </div>
};

class ContactForm extends Component {
    render() {
        const { handleSubmit, pristine } = this.props;
        return (
            <form onSubmit={handleSubmit} className="contact-form">
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" component={myTextField} type="text" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" component={myTextField} type="text" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field name="email" component={myTextField} type="email" />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <Field name="address" component={myTextField} type="text" />
                </div>
                <button disabled={pristine} type="submit">Submit</button>
            </form>
        );
    }
}

// Decorate the form component
ContactForm = reduxForm({
    form: 'contact', // a unique name for this form
    initialValues: { address: "New York" }
})(ContactForm);

export default ContactForm;