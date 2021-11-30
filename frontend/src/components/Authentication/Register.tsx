import React, { useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { useToggle } from "../../hooks/useToggle";
import { InputGroup, Intent, Button, Alignment, H2, IToastProps } from "@blueprintjs/core";
import { Grid } from "@material-ui/core";
import { PageWrapper } from "../PageWrapper";

interface Props {
    addToast: (toast: IToastProps) => void
}

export const Register: React.FC<Props> = ({ addToast }) => {
    const auth = useAuth();

    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, toggleShowPassword] = useToggle(false);

    const submitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (confirmEmail !== email) {
            addToast({ intent: "danger", message: "Email addressen zijn niet gelijk aan elkaar!" });
        } else if (confirmPassword !== password) {
            addToast({ intent: "danger", message: "Wachtwoorden moeten gelijk aan elkaar zijn!" });
        } else {
            try {
                const data = await auth.register(email, password);

                if (data.success) {
                    addToast({ intent: "success", message: "Succesvol geregistreerd!" });
                } else if (data.error) {
                    addToast({ intent: "danger", message: "Er ging iets mis tijdens het registreren, probeer het later nog een keer" });
                }
            } catch (err) {
                addToast({ intent: "danger", message: "Er ging iets mis tijdens het registreren, probeer het later nog een keer" });
            }
        }
    }

    const LockButton = () => {
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
            <form onSubmit={submitRegister}>
                <Grid container spacing={1}>
                    {/* TODO: Email en password requiren met tooltips component */}
                    <Grid item xs={12}><H2>Registreren</H2></Grid>
                    <Grid item xs={12}><InputGroup placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></Grid>
                    <Grid item xs={12}><InputGroup placeholder="Email herhalen" type="email" value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} required /></Grid>
                    <Grid item xs={12}><InputGroup placeholder="Wachtwoord" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} rightElement={<LockButton/>} required /></Grid>
                    <Grid item xs={12}><InputGroup placeholder="Wachtwoord herhalen" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} rightElement={<LockButton/>} required /></Grid>

                    <Grid item xs={12}><Button className="auth-button" type="submit" text="Registreren" intent={Intent.PRIMARY} minimal={true} alignText={Alignment.RIGHT} /></Grid>
                </Grid>
            </form>
        </PageWrapper>
    )
}
