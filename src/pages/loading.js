import React from 'react';
import { CircularProgress } from '@mui/material';

export function Loading(){
    return(
        <div style={{textAlign:"center",margin:"200px"}}>
            <CircularProgress color="secondary" />
        </div>
    )
}