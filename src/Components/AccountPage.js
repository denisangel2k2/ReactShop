import {useAuth} from "./Login";

export function AccountPage() {
    const {authKey, email} = useAuth();
    return (
        <>
            <p>{authKey}</p>
            <p>{email}</p>
        </>
    );
}