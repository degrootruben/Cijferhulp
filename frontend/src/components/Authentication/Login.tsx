import React, { useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { useToggle } from "../../hooks/useToggle";
import { useHistory } from "react-router-dom";
import { InputGroup, Intent, Button, Alignment, H2, IToastProps } from "@blueprintjs/core";
import { Grid } from "@material-ui/core";
import { PageWrapper } from "../PageWrapper";

interface Props {
    addToast: (toast: IToastProps) => void
}

export const Login: React.FC<Props> = ({ addToast }) => {
    const history = useHistory();
    const auth = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, toggleShowPassword] = useToggle(false);

    const redirectToRegister = () => {
        history.push("/register");
    }

    const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = await auth.login(email, password);

            if (data.success) {
                addToast({ intent: "success", message: "Je bent nu ingelogd" });
                history.push("/");
            } else if (data.error) {
                if (data.client_side === true) {
                    addToast({ intent: "danger", message: "Email of wachtwoord verkeerd" });
                } else if (data.server_side === true) {
                    addToast({ intent: "danger", message: "Er ging iets mis tijdens het inloggen, probeer het later nog een keer" });
                }
            }
        } catch (err) {
            addToast({ intent: "danger", message: "Er ging iets mis tijdens het inloggen, probeer het later nog een keer" });
        }
    }

    const lockButton = (type: any, props: any, key: any): JSX.Element | undefined => {
        return (
            <Button
                icon={showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal={true}
                onClick={toggleShowPassword}
            />
        )
    }

    return (
        <PageWrapper className="Login">
            <form onSubmit={submitLogin}>
                <Grid container spacing={2}>
                    {/* TODO: Email en password validation */}
                    {/* TODO: Email en password requiren met tooltips component */}
                    <Grid item xs={12}><H2>Inloggen</H2></Grid>
                    <Grid item xs={12}><InputGroup placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></Grid>
                    <Grid item xs={12}><InputGroup placeholder="Wachtwoord" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} rightElement={lockButton(null, null, null)} required /></Grid>
                    <Grid item xs={12}><Button className="auth-button" type="submit" text="Inloggen" intent={Intent.PRIMARY} minimal={true} alignText={Alignment.RIGHT} rightIcon="log-in" /></Grid>
                    <Grid item xs={12}><Button className="auth-button" onClick={redirectToRegister} text="Registreren" intent={Intent.PRIMARY} minimal={true} alignText={Alignment.RIGHT} /></Grid>
                </Grid>
            </form>
        </PageWrapper>
    )
}
