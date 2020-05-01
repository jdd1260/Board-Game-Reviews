import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function Collapse({ children, name }) {
  return (
    <ExpansionPanel>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
    >
      { name }
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
        { children }
    </ExpansionPanelDetails>
  </ExpansionPanel>
  )
}