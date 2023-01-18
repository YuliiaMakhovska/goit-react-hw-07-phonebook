import React from 'react';
import * as Yup from 'yup';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { FormStyled, FieldStyled, Label, Button } from './ContactForm.styled';
import { Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from 'redux/selectors';
import { addContacts } from 'redux/operations';



const schema = Yup.object().shape({
  name: Yup.string().required(),
  number: Yup.number().required().positive().integer(),
});

const FormError = ({ name }) => {
  return <ErrorMessage name={name} render={massege => <p>{massege}</p>} />;
};

const ContactForm = () => {
  const contacts = useSelector(selectItems)
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    let existName = false;
    if (contacts && contacts.length > 0) {
      contacts.forEach(({ name }) => {
  if (values.name.toLowerCase() === name.toLowerCase()) {
    Report.failure(`${existName} is already in contacts`);
    existName = true;
  }
})
    }
    if (!existName) {
      dispatch(addContacts(values))
      resetForm();
      Report.success('You added new contact')
    }

  };
  const initialValues = {
    name: '',
    number: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormStyled>
        <Label htmlFor="name">
          Name
          <FieldStyled
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <FormError FormError name="name" />
        </Label>

        <Label htmlFor="number">
          Number
          <FieldStyled
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <FormError FormError name="number" />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormStyled>
    </Formik>
  );
};


export default ContactForm;