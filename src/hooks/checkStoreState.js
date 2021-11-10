import { useStore } from 'vuex'
import axios from "axios";

const store = useStore()
const bookslist = []

const checkStoreState = () => {
      if (store.state.booksInState.length !== 0) {
        console.log('Loaded from STORE HOOK')
        bookslist.value = store.state.booksInState
        return bookslist.value
      }
      else {
        console.log('API rqst exec from hook');
        return getBooksByAPI()}
    }


function getBooksByAPI () {
      axios.get('https://gutendex.com/books/').
      then((response) => {bookslist.value = response.data.results}).
      catch(error => console.log(error));
    }

export default checkStoreState
