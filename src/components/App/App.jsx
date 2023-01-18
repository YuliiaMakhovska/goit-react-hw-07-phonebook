import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter';
import { Container } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import Loader from 'components/Loader/Loader';
import { selectIsLoading, selectError } from 'redux/selectors';


 
export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  
  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

      return (<Container>
      <h1>Phonebook</h1>
      <ContactForm  /> 
      <h2>Contacts</h2>
        <Filter />
      {isLoading && !error && <Loader />}
        <ContactsList />
    </Container>
    )
}
