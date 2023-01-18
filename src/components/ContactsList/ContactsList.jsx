
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, selectItems } from 'redux/selectors';
import { List } from './ContactsList.styled';
import { deleteContact } from 'redux/operations';

const ContactsList = () => {
  const contacts = useSelector(selectItems);
  const filter = useSelector(selectFilter)
  const dispatch = useDispatch();

    const filteredContacts = !filter
    ? contacts
    : contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );

    return (
    <List>
      {filteredContacts.map(({ id , name, phone }) => (
        <li key={id}>
          {name}: {phone}
          <button type="button" onClick={() => dispatch(deleteContact(id))}>Delete
          </button>
        </li>
      ))}
        </List>
  );
};
export default ContactsList;