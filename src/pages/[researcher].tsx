import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import ResearcherPapers from '../components/ResearcherPapers';

type ResearcherPageProps = {
  address: string;
};

const ResearcherPage: React.FC<ResearcherPageProps> = ({ address }) => {
  return (
    <Box p={8}>
      <Heading as="h1" mb={4}>
        Researcher Page
      </Heading>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>All Papers</Tab>
          <Tab>New Paper</Tab>
          <Tab>Waiting for Approval</Tab>
          <Tab>Approved Papers</Tab>
          <Tab>Rejected Papers</Tab>
          <Tab>Published Papers</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ResearcherPapers address={address} status="all" />
          </TabPanel>
          <TabPanel>
            {/* AddNewPaper component */}
          </TabPanel>
          <TabPanel>
            <ResearcherPapers address={address} status="waiting" />
          </TabPanel>
          <TabPanel>
            <ResearcherPapers address={address} status="approved" />
          </TabPanel>
          <TabPanel>
            <ResearcherPapers address={address} status="rejected" />
          </TabPanel>
          <TabPanel>
            <ResearcherPapers address={address} status="published" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ResearcherPage;
