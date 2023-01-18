import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContact } from './operations';

const extraActions = [fetchContacts, deleteContact, addContacts];
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const id = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(id, 1);
      })
      .addMatcher(
        isAnyOf(...extraActions.map(action => action.pending)),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(...extraActions.map(action => action.rejected)),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(...extraActions.map(action => action.fulfilled)),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      ),
});
// .addCase(fetchContacts.rejected, (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// })
// .addCase(deleteContact.rejected, (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// })
// .addCase(addContacts.rejected, (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// })
// .addCase(fetchContacts.pending, state => {
//   state.isLoading = true;
// })
// .addCase(deleteContact.pending, state => {
//   state.isLoading = true;
// })
// .addCase(addContacts.pending, state => {
//   state.isLoading = true;
// })
// [fetchContacts.pending](state) {
//   state.isLoading = true;
// },
// [fetchContacts.fulfilled](state, action) {
//   state.isLoading = false;
//   state.error = null;
//   state.items = action.payload;
// },
// [fetchContacts.rejected](state, action) {
//   state.isLoading = false;
//   state.error = action.payload;
// },
// [addContacts.pending](state) {
//   state.isLoading = true;
// },
// [addContacts.fulfilled](state, action) {
//   state.isLoading = false;
//   state.error = null;
//   state.items.push(action.payload);
// },
// [addContacts.rejected](state, action) {
//   state.isLoading = false;
//   state.error = action.payload;
// },
// [deleteContact.pending](state) {
//   state.isLoading = true;
// },
// [deleteContact.fulfilled](state, action) {
//   state.isLoading = false;
//   state.error = null;
//   const id = state.items.findIndex(
//     contact => contact.id === action.payload.id
//   );
//   state.items.splice(id, 1);
// },
// [deleteContact.rejected](state, action) {
//   state.isLoading = false;
//   state.error = action.payload;
// },

export const contactsReducer = contactsSlice.reducer;
