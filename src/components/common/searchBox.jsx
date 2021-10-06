import React from "react";
import {Grid, Input} from "semantic-ui-react";

const SearchBox = ({handleSearch})=>{
    return(
        <Grid.Row>
            <Grid.Column mobile={16} largeScreen={13} widescreen={13}>
                <Input
                    name={'search'}
                    fluid
                    icon={'search'}
                    placeholder='Search...'
                    onChange={handleSearch}
                />
            </Grid.Column>
        </Grid.Row>
    );
}

export default SearchBox;