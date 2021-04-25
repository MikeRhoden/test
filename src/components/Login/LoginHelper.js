export function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const loginUser = async (credentials) => {
    return fetch('http://big12pickem.com/rpc/user/get/user.asp', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(handleErrors).then(data => data.json().catch()
    );
}

export async function createUser(user) {
    return fetch('http://big12pickem.com/rpc/user/post/user.asp', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(handleErrors).then(data => data.json().catch()
    );
}