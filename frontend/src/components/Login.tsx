import React, { useState } from 'react';
import { useAuth } from "../hooks/provide-auth";
import { useHistory } from "react-router-dom";
import { InputGroup, Intent, Button, Alignment, H2, IToastProps } from "@blueprintjs/core";
import { Grid } from "@material-ui/core";

interface Props {
    addToast: (toast: IToastProps) => void
}

export const Login: React.FC<Props> = ({ addToast }) => {
    const history = useHistory();
    const auth = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = await auth.login(email, password);

            if (data.success) {
                addToast({ intent: "success", message: "Je bent nu ingelogd." });
                history.push("/");
            } else if (data.error) {
                addToast({ intent: "danger", message: data.error });
            }
        } catch (err) {
            addToast({ intent: "danger", message: err });
        }
    }

    const lockButton = (type: any, props: any, key: any): JSX.Element | undefined => {
        return (
            <Button
                icon={showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal={true}
                onClick={e => setShowPassword(!showPassword)}
            />
        )
    }

    return (
        <div className="Login">
            <form onSubmit={submitLogin}>
                <Grid container spacing={2}>
                    {/* TODO: Email en password validation */}
                    <Grid item xs={12}><H2>Login</H2></Grid>
                    <Grid item xs={12}><InputGroup placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></Grid>
                    <Grid item xs={12}><InputGroup placeholder="Wachtwoord" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} rightElement={lockButton(null, null, null)} required /></Grid>
                    <Grid item xs={12}><Button className="login-button" type="submit" text="Login" intent={Intent.PRIMARY} minimal={true} alignText={Alignment.RIGHT} rightIcon="log-in" /></Grid>
                </Grid>
            </form>
        </div>
    )
}
