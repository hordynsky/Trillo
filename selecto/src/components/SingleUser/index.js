import React from 'react';
import axios from 'axios';
import {DATA_URLS} from '../../config/config';
import * as S from '../../assets/styles/shared-components';
import MapContainer from '../MapContainer';

class SingleUser extends React.Component {

    state = {
        userId: 0,
        user: [],
        error: null
    }

    getUser = async userId => {
        try {
            const results = await axios.get(`${DATA_URLS.USER(userId)}`);
            const user = results.data;

            this.setState({
                user
            })
            
        } catch (error) {
            this.setState({error})
        }
    }

    componentDidMount(){
        const userId = parseInt(this.props.match.params.userId);
        userId && this.setState({userId});

        this.getUser(userId);
    }

    render(){
        const {match,history} = this.props;
        const {address, company, email, name, phone, username, website} = this.state.user;

        return(
            !this.state.error ? <S.User>
                <S.GlobalStyle/>

                <h1>{name}</h1>
                <S.UserDetails>
                    <S.UserImage>
                        <img src="https://cdn0.iconfinder.com/data/icons/finance-icons-rounded/110/Office-Worker-512.png"/>
                    </S.UserImage>
                    <S.UserInformation>
                        <li><span>Email</span>: <a href={`mailto:${email}`}>{email}</a></li>
                        <li><span>Username</span>: {username}</li>
                        <li><span>Website</span>: <a href={`http://${website}`} target="_blank">{website}</a></li>
                        <li><span>Phone</span>: <a href={`tel:+${phone}`}>{phone}</a></li>
                        <li><span>Company</span>: {company && company.name}</li>
                    </S.UserInformation>
                </S.UserDetails>


                <S.UserAddress>
                    <MapContainer address={address}/>
                </S.UserAddress>


                <S.Button onClick={() => history.goBack()} style={{position: 'absolute',  bottom: '2rem', left: '1rem'}}>Return back</S.Button>
            </S.User> : `Sorry, there is no user with id:${match.params.userId}`
        )
    }
}

export default SingleUser;

/*
    https://jsonplaceholder.typicode.com/posts
    https://jsonplaceholder.typicode.com/posts/{postId}
    https://jsonplaceholder.typicode.com/users
    https://jsonplaceholder.typicode.com/users/{userId}
    https://jsonplaceholder.typicode.com/posts/{postId}/comments
    Вивести список постів, Кожен пост має мати посилання на сторінку окремого поста та
    посилання на сторінку користувача. На сторінці користувача вивести інформацію про
    нього. На сторінці окремого поста вивести інформацію про пост і коментарі до поста.
    Для UI можеш вибрати будь яку бібліотеку наприклад bootstrap, materialize :)
    Стек технологій: React + redux
*/ 