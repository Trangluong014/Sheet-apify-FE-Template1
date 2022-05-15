import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ArrivingNextTab from "./ArrivingNextTab";
import CurrentlyHereTab from "./CurrentlyHereTab";
import NewVisitorTab from "./NewVisitorTab";
import VisitHistoryTab from "./VisitHistoryTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function HomePage() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="New Visitor" {...a11yProps(0)} />
        <Tab label="Arriving Next" {...a11yProps(1)} />
        <Tab label="Currently Here" {...a11yProps(2)} />
        <Tab label="Visit History" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={tab} index={0} style={{ width: "100%" }}>
        <NewVisitorTab />
      </TabPanel>
      <TabPanel value={tab} index={1} style={{ width: "100%" }}>
        <ArrivingNextTab />
      </TabPanel>
      <TabPanel value={tab} index={2} style={{ width: "100%" }}>
        <CurrentlyHereTab />
      </TabPanel>
      <TabPanel value={tab} index={3} style={{ width: "100%" }}>
        <VisitHistoryTab />
      </TabPanel>
    </Box>
  )
}

export default HomePage;