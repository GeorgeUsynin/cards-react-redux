import React from 'react'

type CheckPasswordType = {
    email: string
}

export const CheckPassword: React.FC<CheckPasswordType> = ({email}) => {
    return (
        <div>
            <h2>It-incubator</h2>

            <img src="" alt="picture"/>

            <h3>Check email</h3>

            <p>We've sent an Email with instructions to {email}</p>

        </div>
    )
}