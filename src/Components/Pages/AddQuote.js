import Header from '../Header'
import Form from '../Form'
import React from 'react'
import Home from './Home'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import Loading from '../FormComponents/Loading'
import ConfirmPopup from '../ConfirmPopup'
import { useLocation } from 'react-router-dom'
import {quotesCalled,userID, setUserID, quotes, setQuotes, setQuotesCalled, userFavourites, setUserFavourites, loading, setIsAdmin, setIsuserFavouritesArrayEmpty, message} from '../../App.js'


async function getUserFavouriteQuotesAndIsAdmin(userID){
    await firebase.firestore().collection("users").doc(userID).get().then(r => {
        setUserFavourites(r.data().favourite);
        if(r.data().favourite.length === 0)
            setIsuserFavouritesArrayEmpty(true);
        setIsAdmin(r.data().isAdmin);
    }).finally(() => {
        // Updates the quotes to add the favourite quotes of the user
        var temp = [];
        quotes.forEach( q => {
            var obj = q;
            if(userFavourites.includes(q.id)){
                obj.isFavourite = true;
            }
            temp.push(obj);
        });
        setQuotes(temp);
    })
}

async function getQuotes ()  {
    setQuotesCalled(true);
    try{
        var firebaseQuotes = [];
        await firebase.firestore().collection("quotes").get().then((querySnapshot) =>  {
                querySnapshot.forEach(e => {
                    var data = e.data();
                    data.id = e.id;
                    data.isFavourite = false;
                    firebaseQuotes.push(data);
                });
        }).finally(()=> { 
            setQuotes(firebaseQuotes)
        })
    }catch(e){
        console.log(e);   
    }
}   

var setSubmitted;


const AddQuote = () => {
    const [quoteSubmitted, setQuoteSubmitted] = React.useState(false);
    setSubmitted = setQuoteSubmitted;
    const {state} = useLocation();
    if(userID === null){
        if(state === null){
            window.history.pushState({}, null, "/");
        }else{
            setUserID(state.userID);
            if(!quotesCalled){
                if(quotes.length === 0)
                    getQuotes()

                if(userFavourites.length === 0){
                    // BOOKMARK POSSIBLY GLITCHY
                    getUserFavouriteQuotesAndIsAdmin(state.userID || userID);
                }
            }
        }
    }

    return(
        <>
            {
                (state === null && userID === null)
                ?
                <div>
                    <Home></Home>
                </div>
                :
                <div>
                    <Header />
                    {
                        (quotes.length === 0 && loading) ? <Loading /> : <Form/>        
                    }  
                </div>
                
               
                
            }

            { 
                quoteSubmitted 
                ? <ConfirmPopup message={message} setSubmitted={setSubmitted}/>
                : <div></div>
            }
        </>
    )
}
export {getQuotes, getUserFavouriteQuotesAndIsAdmin, setSubmitted};
export default AddQuote;

