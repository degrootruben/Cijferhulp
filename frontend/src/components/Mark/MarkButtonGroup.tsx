import React from "react";
import { ButtonGroup, Button, Intent } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { MarkButtonGroupMenu } from "./MarkMenu";

export const MarkButtonGroup = () => {

    return (
        <div className="MarkButtonGroup">
            <ButtonGroup>
                <Button icon="add" intent={Intent.SUCCESS} minimal={true} />
                <Popover2 content={<MarkButtonGroupMenu  />} placement="left-start">
                <Button minimal={true} intent={Intent.PRIMARY} icon="more" />
            </Popover2>
            </ButtonGroup>
        </div>
    )
}
