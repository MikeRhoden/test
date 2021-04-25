import { useState } from 'react';

export default function useUser() {
    const getUserId = () => {
        const user = sessionStorage.getItem('user');
        const userString = JSON.parse(user);
        console.log(userString);
        return userString?.UserId;
    }
    
    const [userId, setUserId] = useState(getUserId);

    const saveUser = (user) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        setUserId(user.UserId);
    }

    return {
        setUserId: saveUser,
        userId
    }
}