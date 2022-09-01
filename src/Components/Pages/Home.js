import Header from '../../Components/Header'
import Form from '../../Components/Form'
import React from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import Loading from '../FormComponents/Loading'

const Home = ({quotes, setQuotes, loading, setLoading}) => {
    
    window.onload = async () => {
        if(quotes.length === 0)
            await getQuotes()
        else
            setLoading(false)
    }

    async function getQuotes ()  {
        try{
            var firebaseQuotes = [];
            await firebase.firestore().collection("quotes").get().then((querySnapshot) =>  {
                    querySnapshot.forEach(e => {
                        var data = e.data();
                        firebaseQuotes.push(data);
                    });
            }).finally(()=> { 
                setQuotes(firebaseQuotes)
            })
        }catch(e){
            console.log(e);   
        }        
    }

    return(
        <>
            <Header />
            {
            (quotes.length === 0 && loading) ? <Loading /> : <Form quotes={quotes} setLoading={setLoading}/>        
            }        
        </>
    )
}

export default Home;


