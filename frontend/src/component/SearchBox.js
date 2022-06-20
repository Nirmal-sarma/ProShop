import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Form, Button, FormControl, FormGroup} from 'react-bootstrap';
import searchBox from './searchBox.css';

const SearchBox=({history})=>{
    const [keyword, setKeyword] = useState("");
    
    const submitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/search/${keyword}`);
        }else{
            history.push('/');
        }
    }

    return(
    <Form onSubmit={submitHandler} className="flex">
       
        <FormControl
        type='text'
        name='q'
        onChange={(e)=>setKeyword(e.target.value)}
        placeholder='Search for....'
        
        ></FormControl>
        <Button type='submit' variant='outline-success'  className='p-2'>Search</Button>
        </Form>
    );
}

export default SearchBox;