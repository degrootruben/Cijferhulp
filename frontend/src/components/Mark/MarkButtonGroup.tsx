import React from "react";
import { ButtonGroup, Button, Intent } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { MarkButtonGroupMenu as MarkMenu } from "./MarkMenu";
import { useToggle } from "../../hooks/useToggle";

interface Props {
    setSomLoginIsOpen: any
}

export const MarkButtonGroup: React.FC<Props> = ({ setSomLoginIsOpen }) => {
    return (
        <div className="MarkButtonGroup">
            <ButtonGroup>
                <Button icon="add" intent={Intent.SUCCESS} minimal={true} />
                <Popover2 content={<MarkMenu setSomLoginIsOpen={setSomLoginIsOpen} />} placement="left-start">
                <Button minimal={true} intent={Intent.PRIMARY} icon="more" />
            </Popover2>
            </ButtonGroup>
        </div>
    )
}
